from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.job_collector import JobCollector

router = APIRouter(prefix="/collector", tags=["Job Market Collector"])


@router.post("/collect")
def collect_jobs(db: Session = Depends(get_db)):
    return JobCollector.collect_from_sources(db)


@router.get("/stats")
def collection_stats(db: Session = Depends(get_db)):
    return JobCollector.get_collection_stats(db)
