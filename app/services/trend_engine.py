import json
from typing import Dict, List
from sqlalchemy.orm import Session
from rapidfuzz import fuzz
from app.models.models import Skill, JobPosting, Course

FUZZY_THRESHOLD = 80

# Classification thresholds. The raw spec bands (demand>30%) assume a highly
# concentrated feed; on a realistic multi-sector feed no single skill reaches
# 30% of all postings, so we key "is there demand" off an absolute posting
# count (stable across feed size) and "is it taught" off course-coverage %.
MIN_ACTIVE_DEMAND = 2      # skill appears in >= 2 postings => live market demand
LOW_SUPPLY_RATE = 10.0     # taught by < 10% of courses => scarce training supply
SUPPLY_PRESENT_RATE = 8.0  # taught by >= 8% of courses => still in the system


class TrendEngine:
    """Classifies skills as Emerging / Established / Declining by comparing
    market demand rate (share of job postings) against training-supply rate
    (share of courses teaching the skill)."""

    @staticmethod
    def _mentioned(skill: str, skill_list: List[str]) -> bool:
        skill_l = skill.lower()
        for s in skill_list:
            if fuzz.token_set_ratio(skill_l, s.lower()) >= FUZZY_THRESHOLD:
                return True
        return False

    @classmethod
    def detect_emerging_skills(cls, db: Session) -> Dict:
        skills = db.query(Skill).all()
        postings = db.query(JobPosting).all()
        courses = db.query(Course).all()

        total_postings = max(1, len(postings))
        total_courses = max(1, len(courses))

        posting_skill_lists = [
            json.loads(p.extracted_skills_json) if p.extracted_skills_json else []
            for p in postings
        ]
        course_skill_lists = [
            json.loads(c.syllabus_skills_json) if c.syllabus_skills_json else []
            for c in courses
        ]

        emerging: List[Dict] = []
        established: List[Dict] = []
        declining: List[Dict] = []
        all_rated: List[Dict] = []

        for skill in skills:
            name = skill.canonical_name

            demand_hits = sum(
                1 for lst in posting_skill_lists if cls._mentioned(name, lst)
            )
            course_hits = sum(
                1 for lst in course_skill_lists if cls._mentioned(name, lst)
            )

            demand_rate = round(demand_hits / total_postings * 100.0, 1)
            course_rate = round(course_hits / total_courses * 100.0, 1)

            record = {
                "skill": name,
                "category": skill.category,
                "demand_rate": demand_rate,
                "course_coverage_rate": course_rate,
                "demand_count": demand_hits,
                "course_count": course_hits,
            }

            if demand_hits >= MIN_ACTIVE_DEMAND and course_rate < LOW_SUPPLY_RATE:
                # Strong/live demand but little or no local training supply
                record["status"] = "Emerging"
                emerging.append(record)
            elif demand_hits >= MIN_ACTIVE_DEMAND and course_rate >= LOW_SUPPLY_RATE:
                # Healthy demand matched by healthy training supply
                record["status"] = "Established"
                established.append(record)
            elif demand_hits < MIN_ACTIVE_DEMAND and course_rate >= SUPPLY_PRESENT_RATE:
                # Little current demand yet still widely taught
                record["status"] = "Declining"
                declining.append(record)
            else:
                record["status"] = "Watch"
            all_rated.append(record)

        # High demand but scarce training supply → strongest emerging signal
        emerging.sort(key=lambda r: (r["demand_rate"] - r["course_coverage_rate"]), reverse=True)
        established.sort(key=lambda r: r["demand_rate"], reverse=True)
        declining.sort(key=lambda r: r["course_coverage_rate"], reverse=True)

        return {
            "total_postings": len(postings),
            "total_courses": len(courses),
            "emerging": emerging,
            "established": established,
            "declining": declining,
            "all_skills": sorted(all_rated, key=lambda r: r["demand_rate"], reverse=True),
        }
