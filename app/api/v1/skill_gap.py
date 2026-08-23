from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import SkillGapAnalysisRequest, SkillGapAnalysisResponse
from app.services.skill_gap_engine import SkillGapEngine

router = APIRouter(prefix="/skill-gap", tags=["Skill Gap Engine"])

@router.post("/analyze", response_model=SkillGapAnalysisResponse)
def analyze_skill_gap(payload: SkillGapAnalysisRequest, db: Session = Depends(get_db)):
    try:
        res = SkillGapEngine.analyze_skill_gap(db, payload.course_id, payload.target_district)
        return SkillGapAnalysisResponse(**res)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
