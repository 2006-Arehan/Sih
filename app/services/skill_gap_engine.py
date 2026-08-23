import json
from typing import Dict, List, Optional
from collections import Counter
from sqlalchemy.orm import Session
from app.models.models import Course, JobPosting

class SkillGapEngine:
    @staticmethod
    def analyze_skill_gap(db: Session, course_id: int, target_district: Optional[str] = None) -> Dict:
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise ValueError(f"Course with ID {course_id} not found")

        syllabus_skills = json.loads(course.syllabus_skills_json) if course.syllabus_skills_json else []
        syllabus_set = set(s.lower() for s in syllabus_skills)

        # Query job postings in the same sector and optionally same district
        query = db.query(JobPosting).filter(JobPosting.sector == course.sector)
        if target_district:
            query = query.filter(JobPosting.district_name == target_district)
        elif course.district_name:
            query = query.filter(JobPosting.district_name == course.district_name)

        job_postings = query.all()

        # Count frequencies of industry demanded skills
        skill_counts = Counter()
        for jp in job_postings:
            skills = json.loads(jp.extracted_skills_json) if jp.extracted_skills_json else []
            for s in skills:
                skill_counts[s] += 1

        top_demanded = [s for s, count in skill_counts.most_common(8)]
        
        # If no district job postings found, fallback to default sector skills
        if not top_demanded:
            top_demanded = syllabus_skills + ["Cloud Computing", "EV Maintenance & Battery Tech", "Cyber Security"]

        covered_skills = [s for s in top_demanded if s.lower() in syllabus_set]
        missing_critical_skills = [s for s in top_demanded if s.lower() not in syllabus_set]

        gap_pct = round((len(missing_critical_skills) / max(1, len(top_demanded))) * 100.0, 1)

        return {
            "course_id": course.id,
            "course_title": course.title,
            "district_name": target_district or course.district_name,
            "sector": course.sector,
            "syllabus_skills": syllabus_skills,
            "top_industry_demanded_skills": top_demanded,
            "covered_skills": covered_skills,
            "missing_critical_skills": missing_critical_skills,
            "gap_percentage": gap_pct
        }
