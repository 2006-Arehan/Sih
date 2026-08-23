import json
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Course
from app.schemas.schemas import CourseCreate, CourseResponse

router = APIRouter(prefix="/courses", tags=["Course Catalog"])

@router.get("", response_model=List[CourseResponse])
def get_courses(
    district: Optional[str] = Query(None),
    sector: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Course)
    if district:
        query = query.filter(Course.district_name == district)
    if sector:
        query = query.filter(Course.sector == sector)

    courses = query.all()
    results = []
    for c in courses:
        results.append(CourseResponse(
            id=c.id,
            course_code=c.course_code,
            title=c.title,
            institution_type=c.institution_type,
            district_name=c.district_name,
            sector=c.sector,
            syllabus_skills=json.loads(c.syllabus_skills_json) if c.syllabus_skills_json else [],
            enrolment_count=c.enrolment_count,
            placement_rate=c.placement_rate
        ))
    return results

@router.post("", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(
        course_code=course.course_code,
        title=course.title,
        institution_type=course.institution_type,
        district_name=course.district_name,
        sector=course.sector,
        syllabus_skills_json=json.dumps(course.syllabus_skills),
        enrolment_count=course.enrolment_count,
        placement_rate=course.placement_rate
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)

    return CourseResponse(
        id=db_course.id,
        course_code=db_course.course_code,
        title=db_course.title,
        institution_type=db_course.institution_type,
        district_name=db_course.district_name,
        sector=db_course.sector,
        syllabus_skills=course.syllabus_skills,
        enrolment_count=db_course.enrolment_count,
        placement_rate=db_course.placement_rate
    )
