from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.district_plan_engine import DistrictPlanEngine
from app.services.cabinet_note_generator import CabinetNoteGenerator

router = APIRouter(prefix="/district-plan", tags=["District Training Plan"])

@router.get("/{district_name}")
def get_district_plan(district_name: str, db: Session = Depends(get_db)):
    try:
        return DistrictPlanEngine.generate_district_plan(db, district_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{district_name}/pdf")
def download_district_cabinet_note_pdf(district_name: str, db: Session = Depends(get_db)):
    """Generates and downloads an official Government of Maharashtra DSDC Cabinet Note PDF report."""
    try:
        pdf_bytes = CabinetNoteGenerator.generate_cabinet_note_pdf(db, district_name)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=DSDC_Cabinet_Note_{district_name}.pdf"
            }
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
