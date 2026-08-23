from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.trend_engine import TrendEngine

router = APIRouter(prefix="/trends", tags=["Emerging Skills Trends"])


@router.get("/emerging-skills")
def get_emerging_skills(db: Session = Depends(get_db)):
    return TrendEngine.detect_emerging_skills(db)
