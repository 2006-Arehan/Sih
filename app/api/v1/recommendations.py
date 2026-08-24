from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import CourseRecommendationResponse
from app.services.recommendation_engine import RecommendationEngine
from app.services.syllabus_generator import SyllabusGeneratorEngine

router = APIRouter(prefix="/recommendations", tags=["Recommendation Engine"])

@router.get("/course/{course_id}", response_model=CourseRecommendationResponse)
def get_course_recommendation(course_id: int, db: Session = Depends(get_db)):
    try:
        res = RecommendationEngine.generate_recommendations(db, course_id)
        return CourseRecommendationResponse(**res)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/generate-syllabus/{course_id}")
def generate_ai_updated_syllabus(course_id: int, db: Session = Depends(get_db)):
    """Generates an AI-driven 12-week updated course syllabus module aligned with NSQF standards."""
    try:
        return SyllabusGeneratorEngine.generate_updated_syllabus(db, course_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
