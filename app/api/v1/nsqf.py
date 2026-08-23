import json
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import NSQFQualificationPack
from app.schemas.schemas import NSQFQualificationPackResponse, NSQFMapRequest, NSQFMapResponse
from app.services.nsqf_mapper import NSQFMapperService

router = APIRouter(prefix="/nsqf", tags=["NSQF NOS Mapper"])

@router.get("/qualification-packs", response_model=List[NSQFQualificationPackResponse])
def get_qualification_packs(sector: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(NSQFQualificationPack)
    if sector:
        query = query.filter(NSQFQualificationPack.sector == sector)
    qps = query.all()
    results = []
    for q in qps:
        results.append(NSQFQualificationPackResponse(
            id=q.id,
            qp_code=q.qp_code,
            title=q.title,
            sector=q.sector,
            nsqf_level=q.nsqf_level,
            covered_skills=json.loads(q.covered_skills_json) if q.covered_skills_json else [],
            nos_units=json.loads(q.nos_units_json) if q.nos_units_json else []
        ))
    return results

@router.post("/map-skills", response_model=NSQFMapResponse)
def map_skills_to_nsqf(payload: NSQFMapRequest, db: Session = Depends(get_db)):
    res = NSQFMapperService.map_skills_to_nsqf(db, payload.skills)
    return NSQFMapResponse(**res)
