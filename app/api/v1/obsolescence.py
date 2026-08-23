from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import ObsolescenceAssessment, Course
from app.schemas.schemas import ObsolescenceAssessmentResponse
from app.services.obsolescence_engine import ObsolescenceEngine

router = APIRouter(prefix="/obsolescence", tags=["Obsolescence Engine"])

@router.post("/assess/{course_id}", response_model=ObsolescenceAssessmentResponse)
def assess_course_obsolescence(course_id: int, db: Session = Depends(get_db)):
    try:
        assessment = ObsolescenceEngine.assess_course_obsolescence(db, course_id)
        course = db.query(Course).filter(Course.id == course_id).first()
        return ObsolescenceAssessmentResponse(
            id=assessment.id,
            course_id=assessment.course_id,
            course_title=course.title if course else "Unknown",
            risk_score=assessment.risk_score,
            risk_level=assessment.risk_level,
            demand_decline_score=assessment.demand_decline_score,
            skill_gap_score=assessment.skill_gap_score,
            placement_drop_score=assessment.placement_drop_score,
            employer_disapproval_score=assessment.employer_disapproval_score,
            flagged_for_review=assessment.flagged_for_review,
            recommendation_summary=assessment.recommendation_summary,
            created_at=assessment.created_at
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/assessments", response_model=List[ObsolescenceAssessmentResponse])
def get_assessments(db: Session = Depends(get_db)):
    assessments = db.query(ObsolescenceAssessment).order_by(ObsolescenceAssessment.id.desc()).all()
    results = []
    for a in assessments:
        course = db.query(Course).filter(Course.id == a.course_id).first()
        results.append(ObsolescenceAssessmentResponse(
            id=a.id,
            course_id=a.course_id,
            course_title=course.title if course else "Unknown",
            risk_score=a.risk_score,
            risk_level=a.risk_level,
            demand_decline_score=a.demand_decline_score,
            skill_gap_score=a.skill_gap_score,
            placement_drop_score=a.placement_drop_score,
            employer_disapproval_score=a.employer_disapproval_score,
            flagged_for_review=a.flagged_for_review,
            recommendation_summary=a.recommendation_summary,
            created_at=a.created_at
        ))
    return results
