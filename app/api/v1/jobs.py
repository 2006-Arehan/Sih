import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import JobPosting
from app.schemas.schemas import JobPostingCreate, JobPostingResponse, ExtractSkillsRequest, ExtractSkillsResponse
from app.services.nlp_extractor import MultilingualNLPExtractor
from app.services.nsqf_mapper import NSQFMapperService

router = APIRouter(prefix="/jobs", tags=["Job Data Engine"])

@router.get("", response_model=List[JobPostingResponse])
def get_job_postings(
    district: Optional[str] = Query(None),
    sector: Optional[str] = Query(None),
    language: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(JobPosting)
    if district:
        query = query.filter(JobPosting.district_name == district)
    if sector:
        query = query.filter(JobPosting.sector == sector)
    if language:
        query = query.filter(JobPosting.language == language)

    jobs = query.order_by(JobPosting.id.desc()).all()
    results = []
    for j in jobs:
        results.append(JobPostingResponse(
            id=j.id,
            title=j.title,
            company=j.company,
            district_name=j.district_name,
            sector=j.sector,
            language=j.language,
            raw_description=j.raw_description,
            extracted_skills=json.loads(j.extracted_skills_json) if j.extracted_skills_json else [],
            nsqf_qp_code=j.nsqf_qp_code,
            posted_date=j.posted_date
        ))
    return results

@router.post("/ingest", response_model=JobPostingResponse)
def ingest_job_posting(job: JobPostingCreate, db: Session = Depends(get_db)):
    # Run NLP skill extraction if skills not provided
    if not job.extracted_skills:
        extracted, lang, _ = MultilingualNLPExtractor.extract_skills(job.raw_description)
    else:
        extracted = job.extracted_skills
        lang = job.language

    # Auto match NSQF QP if not provided
    nsqf_qp = job.nsqf_qp_code
    if not nsqf_qp and extracted:
        mapping = NSQFMapperService.map_skills_to_nsqf(db, extracted)
        nsqf_qp = mapping["best_matching_qp"]

    db_job = JobPosting(
        title=job.title,
        company=job.company,
        district_name=job.district_name,
        sector=job.sector,
        language=lang,
        raw_description=job.raw_description,
        extracted_skills_json=json.dumps(extracted),
        nsqf_qp_code=nsqf_qp
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    return JobPostingResponse(
        id=db_job.id,
        title=db_job.title,
        company=db_job.company,
        district_name=db_job.district_name,
        sector=db_job.sector,
        language=db_job.language,
        raw_description=db_job.raw_description,
        extracted_skills=extracted,
        nsqf_qp_code=db_job.nsqf_qp_code,
        posted_date=db_job.posted_date
    )

@router.post("/extract-skills", response_model=ExtractSkillsResponse)
def extract_skills_from_text(payload: ExtractSkillsRequest, db: Session = Depends(get_db)):
    extracted, lang, confidence = MultilingualNLPExtractor.extract_skills(payload.text)
    mapping = NSQFMapperService.map_skills_to_nsqf(db, extracted)

    return ExtractSkillsResponse(
        detected_language=lang,
        extracted_skills=extracted,
        matched_nsqf_qp=mapping["best_matching_qp"],
        confidence_score=confidence
    )
