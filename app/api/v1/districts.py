import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import District, JobPosting
from app.schemas.schemas import DistrictResponse
from app.services.midc_heatmap_engine import MIDCHeatmapEngine

router = APIRouter(prefix="/districts", tags=["District Intelligence"])

@router.get("", response_model=List[DistrictResponse])
def get_districts(db: Session = Depends(get_db)):
    districts = db.query(District).all()
    results = []
    for d in districts:
        postings = db.query(JobPosting).filter(JobPosting.district_name == d.name).all()
        skills = []
        for p in postings:
            if p.extracted_skills_json:
                skills.extend(json.loads(p.extracted_skills_json))

        top_skills = list(dict.fromkeys(skills))[:5]

        results.append(DistrictResponse(
            id=d.id,
            name=d.name,
            region=d.region,
            major_industries=json.loads(d.major_industries) if d.major_industries else [],
            active_postings_count=d.active_postings_count,
            top_demanded_skills=top_skills
        ))
    return results

@router.get("/midc-heatmap")
def get_midc_industrial_heatmap(db: Session = Depends(get_db)):
    """Computes geospatial MIDC industrial cluster heatmap analytics for Maharashtra."""
    return MIDCHeatmapEngine.get_midc_cluster_heatmap(db)
