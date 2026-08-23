import json
from typing import List, Optional, Dict
from sqlalchemy.orm import Session
from rapidfuzz import fuzz
from app.models.models import NSQFQualificationPack

# Minimum fuzzy similarity (token_set_ratio) for two skill strings to be
# considered the "same" skill. 80 tolerates word-order and phrasing
# differences (e.g. "Python" vs "Python Programming") without false matches.
FUZZY_MATCH_THRESHOLD = 80


class NSQFMapperService:
    @staticmethod
    def _fuzzy_covered(skill: str, qp_skills: List[str]) -> Optional[str]:
        """Return the QP skill that fuzzily matches `skill` (>= threshold), else None."""
        best_qp_skill = None
        best_ratio = 0.0
        for qp_skill in qp_skills:
            ratio = fuzz.token_set_ratio(skill.lower(), qp_skill.lower())
            if ratio >= FUZZY_MATCH_THRESHOLD and ratio > best_ratio:
                best_ratio = ratio
                best_qp_skill = qp_skill
        return best_qp_skill

    @classmethod
    def _score_qp(cls, skills: List[str], qp: NSQFQualificationPack) -> Dict:
        """Fuzzy-match candidate skills against a single QP's covered skills."""
        qp_skills = json.loads(qp.covered_skills_json) if qp.covered_skills_json else []
        matched_qp_skills = []
        for qp_skill in qp_skills:
            hit = cls._fuzzy_covered(qp_skill, skills)
            if hit is not None:
                matched_qp_skills.append(qp_skill)

        missing = [s for s in qp_skills if s not in matched_qp_skills]
        total = max(1, len(qp_skills))
        pct = round((len(matched_qp_skills) / total) * 100.0, 1)

        return {
            "qp_code": qp.qp_code,
            "qp_title": qp.title,
            "sector": qp.sector,
            "nsqf_level": qp.nsqf_level,
            "match_percentage": pct,
            "matching_skills": matched_qp_skills,
            "missing_skills": missing,
        }

    @classmethod
    def map_skills_to_nsqf(cls, db: Session, skills: List[str]) -> Dict:
        if not skills:
            return {
                "best_matching_qp": None,
                "qp_title": None,
                "sector": None,
                "nsqf_level": None,
                "match_percentage": 0.0,
                "matching_skills": [],
                "missing_skills": [],
                "top_matches": [],
            }

        qps = db.query(NSQFQualificationPack).all()
        scored = [cls._score_qp(skills, qp) for qp in qps]

        # Rank by match percentage, then by absolute number of matched skills.
        scored.sort(
            key=lambda r: (r["match_percentage"], len(r["matching_skills"])),
            reverse=True,
        )

        top_matches = [r for r in scored if r["match_percentage"] > 0.0][:3]
        best = top_matches[0] if top_matches else None

        return {
            "best_matching_qp": best["qp_code"] if best else None,
            "qp_title": best["qp_title"] if best else None,
            "sector": best["sector"] if best else None,
            "nsqf_level": best["nsqf_level"] if best else None,
            "match_percentage": best["match_percentage"] if best else 0.0,
            "matching_skills": best["matching_skills"] if best else [],
            "missing_skills": best["missing_skills"] if best else [],
            "top_matches": top_matches,
        }
