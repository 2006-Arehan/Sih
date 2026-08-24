import json
from typing import Dict, List
from sqlalchemy.orm import Session
from app.models.models import Course
from app.services.skill_gap_engine import SkillGapEngine
from app.services.nsqf_mapper import NSQFMapperService

class SyllabusGeneratorEngine:
    """Generates an AI-driven 12-week updated course curriculum module
    customized to cover missing industry-demanded skills and aligned with NSQF standards."""

    @staticmethod
    def generate_updated_syllabus(db: Session, course_id: int) -> Dict:
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise ValueError(f"Course with ID {course_id} not found")

        gap_analysis = SkillGapEngine.analyze_skill_gap(db, course_id)
        missing_skills = gap_analysis["missing_critical_skills"]
        current_skills = gap_analysis["syllabus_skills"]
        
        all_target_skills = current_skills + missing_skills
        nsqf_mapping = NSQFMapperService.map_skills_to_nsqf(db, all_target_skills)
        best_qp = nsqf_mapping.get("best_matching_qp") or "NSQF-L4-GENERIC"

        # Generate 12-week structured curriculum breakdown
        weekly_breakdown = []
        weeks_for_new_skills = min(6, len(missing_skills))
        
        for week in range(1, 13):
            if week <= 4:
                topic = f"Foundational Theory & Core Practices: {current_skills[(week-1) % max(1, len(current_skills))]}"
                practical = f"Standard Lab Practical #{week} - Hand Tool & Machine Safety"
            elif week <= 4 + weeks_for_new_skills:
                idx = week - 5
                new_skill = missing_skills[idx % len(missing_skills)] if missing_skills else "Advanced Industrial Automation"
                topic = f"Emerging Industry Module: {new_skill} (Industry 4.0 Standard)"
                practical = f"Hands-on Project & Simulators: {new_skill} Integration"
            else:
                topic = f"Applied Capstone Project & Quality Testing (Focus: {missing_skills[0] if missing_skills else 'Quality Inspection'})"
                practical = f"Real-world Industry Shopfloor Simulation & NSQF Assessment Prep"

            weekly_breakdown.append({
                "week": week,
                "module_title": topic,
                "practical_lab_work": practical,
                "assessment_type": "Continuous Evaluation" if week % 4 != 0 else "Milestone Assessment"
            })

        # Equipment & lab upgrade recommendations
        lab_upgrades = [f"Install simulator & testing rig for '{s}'" for s in missing_skills[:3]]
        if not lab_upgrades:
            lab_upgrades.append("Upgrade existing diagnostic tools to digital standards.")

        return {
            "course_id": course.id,
            "course_title": course.title,
            "sector": course.sector,
            "district_name": course.district_name,
            "nsqf_level": nsqf_mapping.get("nsqf_level") or 4,
            "aligned_qp_code": best_qp,
            "qp_title": nsqf_mapping.get("qp_title") or "Qualification Pack Standard",
            "skills_integrated": missing_skills,
            "total_duration_weeks": 12,
            "weekly_syllabus_plan": weekly_breakdown,
            "recommended_lab_upgrades": lab_upgrades,
            "certification_status": "Ready for MSBVET & DSDC Approval"
        }
