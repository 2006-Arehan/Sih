import json
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Skill
from app.schemas.schemas import SkillResponse

router = APIRouter(prefix="/skills", tags=["Skill Taxonomy"])

@router.get("", response_model=List[SkillResponse])
def get_skills(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Skill)
    if category:
        query = query.filter(Skill.category == category)
    skills = query.all()
    results = []
    for s in skills:
        results.append(SkillResponse(
            id=s.id,
            canonical_name=s.canonical_name,
            category=s.category,
            aliases=json.loads(s.aliases_json) if s.aliases_json else [],
            demand_trend=s.demand_trend
        ))
    return results
