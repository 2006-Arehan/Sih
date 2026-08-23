from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import CourseRecommendationResponse
from app.services.recommendation_engine import RecommendationEngine

router = APIRouter(prefix="/recommendations", tags=["Recommendation Engine"])

@router.get("/course/{course_id}", response_model=CourseRecommendationResponse)
def get_course_recommendation(course_id: int, db: Session = Depends(get_db)):
    try:
        res = RecommendationEngine.generate_recommendations(db, course_id)
        return CourseRecommendationResponse(**res)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
