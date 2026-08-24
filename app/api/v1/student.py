from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.upskill_simulator import UpskillSimulatorEngine

router = APIRouter(prefix="/student", tags=["Student Upskill Simulator"])

class UpskillSimulationRequest(BaseModel):
    district_name: str
    candidate_skills: List[str]
    current_course_id: Optional[int] = None

@router.post("/upskill-simulator")
def simulate_student_upskilling(payload: UpskillSimulationRequest, db: Session = Depends(get_db)):
    """Evaluates candidate skills against local MIDC job demand, calculates Employability Index, and suggests micro-credentials."""
    try:
        return UpskillSimulatorEngine.simulate_upskilling(
            db=db,
            district_name=payload.district_name,
            candidate_skills=payload.candidate_skills,
            current_course_id=payload.current_course_id
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
