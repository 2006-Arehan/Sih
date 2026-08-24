import json
from typing import Dict, List, Optional
from collections import Counter
from sqlalchemy.orm import Session
from rapidfuzz import fuzz
from app.models.models import JobPosting, Course

FUZZY_THRESHOLD = 75

class UpskillSimulatorEngine:
    """Evaluates a candidate's personal skills against live local district job market
    postings, calculates an Employability Index, and suggests high-impact micro-credentials."""

    @staticmethod
    def simulate_upskilling(
        db: Session,
        district_name: str,
        candidate_skills: List[str],
        current_course_id: Optional[int] = None
    ) -> Dict:
        if current_course_id:
            course = db.query(Course).filter(Course.id == current_course_id).first()
            if course and course.syllabus_skills_json:
                syllabus = json.loads(course.syllabus_skills_json)
                candidate_skills = list(set(candidate_skills + syllabus))

        # Query local district job postings
        postings = db.query(JobPosting).filter(JobPosting.district_name == district_name).all()
        if not postings:
            # Fallback to all postings if district postings are empty
            postings = db.query(JobPosting).all()

        total_postings = len(postings)
        demanded_skills_counter = Counter()
        
        # Track matching postings for candidate
        matching_job_titles = []
        matching_postings_count = 0

        for jp in postings:
            jp_skills = json.loads(jp.extracted_skills_json) if jp.extracted_skills_json else []
            for s in jp_skills:
                demanded_skills_counter[s] += 1

            # Match candidate skills against job requirements
            matched_for_jp = 0
            for req_skill in jp_skills:
                for cand_skill in candidate_skills:
                    if fuzz.token_set_ratio(req_skill.lower(), cand_skill.lower()) >= FUZZY_THRESHOLD:
                        matched_for_jp += 1
                        break
            
            if len(jp_skills) > 0 and (matched_for_jp / len(jp_skills)) >= 0.5:
                matching_postings_count += 1
                if len(matching_job_titles) < 4:
                    matching_job_titles.append({
                        "title": jp.title,
                        "company": jp.company,
                        "sector": jp.sector,
                        "district": jp.district_name
                    })

        # Calculate Employability Score (0-100%)
        employability_score = round(min(100.0, (matching_postings_count / max(1, total_postings)) * 250.0), 1)

        # Identify missing top demanded skills that candidate lacks
        cand_lower = set(s.lower() for s in candidate_skills)
        missing_skills = []
        for skill, count in demanded_skills_counter.most_common():
            if not any(fuzz.token_set_ratio(skill.lower(), c) >= FUZZY_THRESHOLD for c in cand_lower):
                missing_skills.append({"skill": skill, "job_demand_count": count})
            if len(missing_skills) >= 3:
                break

        # Generate Micro-credential Recommendation
        top_missing = missing_skills[0]["skill"] if missing_skills else "Digital Quality Inspection"
        potential_score = min(95.0, employability_score + 35.0)

        micro_credential = {
            "title": f"2-Week Fast-Track Certification: {top_missing}",
            "duration": "2 Weeks (40 Hours)",
            "delivery_mode": "Hybrid (Local ITI Practical + Online Theory)",
            "expected_employability_boost": f"+{round(potential_score - employability_score, 1)}%",
            "potential_salary_hike": "25% - 40% Increase",
            "recommended_provider": f"Government ITI {district_name} Skill Hub"
        }

        return {
            "district_name": district_name,
            "candidate_skills": candidate_skills,
            "employability_index": employability_score,
            "employability_tier": "High Employability" if employability_score >= 70 else ("Moderate Employability" if employability_score >= 40 else "Needs Upskilling"),
            "active_district_jobs_matching": matching_postings_count,
            "matching_job_samples": matching_job_titles,
            "top_missing_market_skills": missing_skills,
            "recommended_micro_credential": micro_credential
        }
