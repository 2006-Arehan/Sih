from typing import Dict
from sqlalchemy.orm import Session
from app.models.models import Course
from app.services.skill_gap_engine import SkillGapEngine
from app.services.nsqf_mapper import NSQFMapperService

class RecommendationEngine:
    @staticmethod
    def generate_recommendations(db: Session, course_id: int) -> Dict:
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise ValueError(f"Course with ID {course_id} not found")

        gap_analysis = SkillGapEngine.analyze_skill_gap(db, course_id)
        skills_to_add = gap_analysis["missing_critical_skills"]

        # Determine skills that may be deprecated (e.g. outdated tools)
        outdated_keywords = ["legacy", "manual", "basic drawing", "cobol", "pascal"]
        skills_to_deprecate = []
        for s in gap_analysis["syllabus_skills"]:
            if any(k in s.lower() for k in outdated_keywords):
                skills_to_deprecate.append(s)

        # Match updated skill requirements to NSQF Qualification Pack
        updated_skill_pool = gap_analysis["syllabus_skills"] + skills_to_add
        nsqf_mapping = NSQFMapperService.map_skills_to_nsqf(db, updated_skill_pool)

        if gap_analysis["gap_percentage"] >= 60.0:
            priority = "Urgent Revision Required"
        elif gap_analysis["gap_percentage"] >= 30.0:
            priority = "Moderate Update Recommended"
        else:
            priority = "Up to Date"

        district_note = f"Industry in {course.district_name} district exhibits high growth demand for: {', '.join(skills_to_add[:3]) if skills_to_add else 'Current Syllabus Skills'}."

        return {
            "course_id": course.id,
            "course_title": course.title,
            "sector": course.sector,
            "district_name": course.district_name,
            "action_priority": priority,
            "skills_to_add": skills_to_add,
            "skills_to_deprecate": skills_to_deprecate if skills_to_deprecate else ["None flagged"],
            "recommended_nsqf_qp": f"{nsqf_mapping['best_matching_qp']} - {nsqf_mapping['qp_title']}" if nsqf_mapping["best_matching_qp"] else "NSQF Alignment Pending",
            "district_industry_demand_note": district_note
        }
