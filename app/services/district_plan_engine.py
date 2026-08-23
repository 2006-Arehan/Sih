import json
from typing import Dict, List
from collections import Counter
from sqlalchemy.orm import Session
from rapidfuzz import fuzz
from app.models.models import District, JobPosting, Course

FUZZY_THRESHOLD = 80


class DistrictPlanEngine:
    """Generates an actionable district-level training plan by comparing live
    labour-market demand (job postings) against local training supply (courses)."""

    @staticmethod
    def _is_taught(skill: str, taught_skills: List[str]) -> bool:
        skill_l = skill.lower()
        for t in taught_skills:
            if fuzz.token_set_ratio(skill_l, t.lower()) >= FUZZY_THRESHOLD:
                return True
        return False

    @classmethod
    def generate_district_plan(cls, db: Session, district_name: str) -> Dict:
        district = db.query(District).filter(District.name == district_name).first()
        if not district:
            raise ValueError(f"District '{district_name}' not found")

        # 1. Demand: skill frequency across the district's job postings
        postings = db.query(JobPosting).filter(
            JobPosting.district_name == district_name
        ).all()

        skill_counts: Counter = Counter()
        for jp in postings:
            skills = json.loads(jp.extracted_skills_json) if jp.extracted_skills_json else []
            for s in skills:
                skill_counts[s] += 1

        # 2. Supply: courses offered in the district and skills they teach
        courses = db.query(Course).filter(
            Course.district_name == district_name
        ).all()

        taught_skills: List[str] = []
        for c in courses:
            taught_skills.extend(
                json.loads(c.syllabus_skills_json) if c.syllabus_skills_json else []
            )

        # 3. Classify each demanded skill as Available or Gap
        skills_available: List[Dict] = []
        skills_gap: List[Dict] = []
        for skill, freq in skill_counts.most_common():
            entry = {"skill": skill, "demand_count": freq}
            if cls._is_taught(skill, taught_skills):
                skills_available.append(entry)
            else:
                skills_gap.append(entry)

        # 4. Courses at risk (low enrolment AND low placement)
        courses_at_risk: List[Dict] = []
        for c in courses:
            if c.enrolment_count < 30 and c.placement_rate < 40.0:
                courses_at_risk.append({
                    "course_id": c.id,
                    "course_code": c.course_code,
                    "title": c.title,
                    "enrolment_count": c.enrolment_count,
                    "placement_rate": c.placement_rate,
                    "status": "Consider Discontinuing",
                })

        # 5. Recommendations
        recommendations: List[str] = []
        for g in skills_gap[:5]:
            recommendations.append(
                f"Run new training batches for '{g['skill']}' "
                f"({g['demand_count']} active postings, no local course covers it)."
            )
        for c in courses_at_risk:
            recommendations.append(
                f"Discontinue or restructure '{c['title']}' "
                f"(enrolment {c['enrolment_count']}, placement {c['placement_rate']}%)."
            )
        # Suggest adding top gap skills to the strongest existing course
        if skills_gap and courses:
            strongest = max(courses, key=lambda c: c.placement_rate)
            top_gap = skills_gap[0]["skill"]
            recommendations.append(
                f"Add '{top_gap}' module to '{strongest.title}' to close the demand gap."
            )
        if not recommendations:
            recommendations.append(
                "District training supply is well aligned with current market demand."
            )

        return {
            "district": district.name,
            "region": district.region,
            "active_postings_count": district.active_postings_count,
            "total_demand": len(postings),
            "courses_offered": len(courses),
            "demanded_skills": [
                {"skill": s, "demand_count": c} for s, c in skill_counts.most_common()
            ],
            "skills_available": skills_available,
            "skills_gap": skills_gap,
            "courses_at_risk": courses_at_risk,
            "recommendations": recommendations,
        }
