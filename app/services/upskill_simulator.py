import json
from typing import Dict, List, Optional
from collections import Counter
from sqlalchemy.orm import Session
from rapidfuzz import fuzz
from app.models.models import JobPosting, Course

FUZZY_THRESHOLD = 75

DISTRICT_COMPANY_MAP = {
    "Pune": ["Tata Motors", "Bajaj Auto", "Mahindra Electric", "Bharat Forge", "Foxconn Auto"],
    "Mumbai": ["Tech Mahindra", "TCS", "L&T Defense", "Godrej & Boyce", "HDFC Tech Hub"],
    "Nagpur": ["Boeing MRO", "TCS MIHAN", "Solar Industries", "Mahindra Logistics", "Amul Processing"],
    "Chhatrapati Sambhajinagar": ["Siemens India", "Endress+Hauser", "Skoda Auto Volkswagen", "NRB Bearings"],
    "Nashik": ["HAL Aerospace", "Bosch India", "Crompton Greaves", "Mahindra & Mahindra"]
}

class UpskillSimulatorEngine:
    """Advanced Multi-Dimensional Youth Upskill & Career Intelligence Simulator.
    Computes Employability Index, 3-tier Salary Progression, Technical Breakdown Scores,
    Local MIDC Employer Matches, and Fast-Track Micro-Credential Roadmaps."""

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
            postings = db.query(JobPosting).all()

        total_postings = len(postings)
        demanded_skills_counter = Counter()
        matching_job_titles = []
        matching_postings_count = 0

        for jp in postings:
            jp_skills = json.loads(jp.extracted_skills_json) if jp.extracted_skills_json else []
            for s in jp_skills:
                demanded_skills_counter[s] += 1

            matched_for_jp = 0
            for req_skill in jp_skills:
                for cand_skill in candidate_skills:
                    if fuzz.token_set_ratio(req_skill.lower(), cand_skill.lower()) >= FUZZY_THRESHOLD:
                        matched_for_jp += 1
                        break
            
            if len(jp_skills) > 0 and (matched_for_jp / len(jp_skills)) >= 0.3:
                matching_postings_count += 1
                if len(matching_job_titles) < 4:
                    matching_job_titles.append({
                        "title": jp.title,
                        "company": jp.company,
                        "sector": jp.sector,
                        "district": jp.district_name,
                        "match_percentage": round(min(100.0, (matched_for_jp / max(1, len(jp_skills))) * 100.0), 1)
                    })

        # Calculate Base Employability Score (0-100%)
        match_ratio = matching_postings_count / max(1, total_postings)
        employability_score = round(min(96.0, max(35.0, match_ratio * 280.0 + len(candidate_skills) * 8.0)), 1)

        # Multi-Dimensional Sub-Score Breakdown
        technical_alignment = round(min(98.0, len(candidate_skills) * 22.5 + employability_score * 0.4), 1)
        district_demand_density = round(min(95.0, (total_postings / 10.0) * 85.0), 1)
        nsqf_readiness = round(min(92.0, technical_alignment * 0.85 + 10.0), 1)

        # Identify missing top demanded skills that candidate lacks
        cand_lower = set(s.lower() for s in candidate_skills)
        missing_skills = []
        for skill, count in demanded_skills_counter.most_common():
            if not any(fuzz.token_set_ratio(skill.lower(), c) >= FUZZY_THRESHOLD for c in cand_lower):
                missing_skills.append({"skill": skill, "job_demand_count": count})
            if len(missing_skills) >= 4:
                break

        # Salary & Career Growth Projections
        base_salary_val = 18500 + int(employability_score * 120)
        hike_pct = 32.0 if employability_score < 70 else 22.0
        post_upskill_salary_val = int(base_salary_val * (1.0 + hike_pct / 100.0))
        three_year_salary_val = int(post_upskill_salary_val * 1.65)

        salary_projection = {
            "current_estimated_entry_salary": f"₹{base_salary_val:,} / month",
            "post_micro_credential_salary": f"₹{post_upskill_salary_val:,} / month (+{int(hike_pct)}% Hike)",
            "three_year_career_potential": f"₹{three_year_salary_val:,} / month",
            "salary_growth_tier": "Rapid Growth (High MIDC Demand Zone)"
        }

        # Generate Upgraded Micro-credential Recommendation
        top_missing = missing_skills[0]["skill"] if missing_skills else "Digital Quality & Automation"
        second_missing = missing_skills[1]["skill"] if len(missing_skills) > 1 else "EV Battery Maintenance"

        micro_credentials = [
            {
                "title": f"2-Week Fast-Track Certification: {top_missing}",
                "duration": "2 Weeks (40 Hours)",
                "delivery_mode": "Hybrid (Local ITI Practical + Online Theory)",
                "expected_employability_boost": f"+{round(min(98.0, employability_score + 28.0) - employability_score, 1)}%",
                "potential_salary_hike": f"{int(hike_pct)}% - 40% Increase",
                "recommended_provider": f"Government ITI {district_name} Skill Hub",
                "nsqf_level": "Level 4.5 / Qualification Pack Aligned"
            },
            {
                "title": f"Advanced Micro-Module: {second_missing}",
                "duration": "10 Days (25 Hours)",
                "delivery_mode": "Hands-On MIDC Industry Workshop",
                "expected_employability_boost": "+15.0%",
                "potential_salary_hike": "15% - 25% Increase",
                "recommended_provider": f"DSDC {district_name} Industrial Training Centre",
                "nsqf_level": "Level 5.0 Specialist"
            }
        ]

        top_employers = DISTRICT_COMPANY_MAP.get(district_name, ["MIDC Enterprise Hub", "Local Industrial Suppliers"])

        return {
            "district_name": district_name,
            "candidate_skills": candidate_skills,
            "employability_index": employability_score,
            "employability_tier": "High Employability" if employability_score >= 70 else ("Moderate Employability" if employability_score >= 45 else "Needs Upskilling"),
            "sub_score_breakdown": {
                "technical_alignment": technical_alignment,
                "district_demand_density": district_demand_density,
                "nsqf_readiness": nsqf_readiness
            },
            "active_district_jobs_matching": matching_postings_count,
            "matching_job_samples": matching_job_titles,
            "top_hiring_companies": top_employers,
            "top_missing_market_skills": missing_skills,
            "salary_projections": salary_projection,
            "recommended_micro_credentials": micro_credentials,
            "recommended_micro_credential": micro_credentials[0]  # Backwards compatibility
        }
