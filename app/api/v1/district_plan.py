from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.district_plan_engine import DistrictPlanEngine

router = APIRouter(prefix="/district-plan", tags=["District Training Plan"])


@router.get("/{district_name}")
def get_district_plan(district_name: str, db: Session = Depends(get_db)):
    try:
        return DistrictPlanEngine.generate_district_plan(db, district_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
