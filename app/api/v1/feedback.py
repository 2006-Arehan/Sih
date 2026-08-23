import json
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import EmployerFeedback
from app.schemas.schemas import EmployerFeedbackCreate, EmployerFeedbackResponse

router = APIRouter(prefix="/feedback", tags=["Employer Feedback Loop"])

@router.get("", response_model=List[EmployerFeedbackResponse])
def get_employer_feedbacks(course_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    query = db.query(EmployerFeedback)
    if course_id:
        query = query.filter(EmployerFeedback.course_id == course_id)
    feedbacks = query.order_by(EmployerFeedback.id.desc()).all()
    results = []
    for f in feedbacks:
        results.append(EmployerFeedbackResponse(
            id=f.id,
            employer_name=f.employer_name,
            company=f.company,
            sector=f.sector,
            district_name=f.district_name,
            course_id=f.course_id,
            validated_skills=json.loads(f.validated_skills_json) if f.validated_skills_json else [],
            missing_skills=json.loads(f.missing_skills_json) if f.missing_skills_json else [],
            satisfaction_rating=f.satisfaction_rating,
            comments=f.comments,
            created_at=f.created_at
        ))
    return results

@router.post("", response_model=EmployerFeedbackResponse)
def submit_employer_feedback(feedback: EmployerFeedbackCreate, db: Session = Depends(get_db)):
    db_feedback = EmployerFeedback(
        employer_name=feedback.employer_name,
        company=feedback.company,
        sector=feedback.sector,
        district_name=feedback.district_name,
        course_id=feedback.course_id,
        validated_skills_json=json.dumps(feedback.validated_skills),
        missing_skills_json=json.dumps(feedback.missing_skills),
        satisfaction_rating=feedback.satisfaction_rating,
        comments=feedback.comments
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)

    return EmployerFeedbackResponse(
        id=db_feedback.id,
        employer_name=db_feedback.employer_name,
        company=db_feedback.company,
        sector=db_feedback.sector,
        district_name=db_feedback.district_name,
        course_id=db_feedback.course_id,
        validated_skills=feedback.validated_skills,
        missing_skills=feedback.missing_skills,
        satisfaction_rating=db_feedback.satisfaction_rating,
        comments=db_feedback.comments,
        created_at=db_feedback.created_at
    )
