import os
import json
from typing import Dict
from collections import Counter
from sqlalchemy.orm import Session
from app.models.models import JobPosting
from app.services.nlp_extractor import MultilingualNLPExtractor
from app.services.nsqf_mapper import NSQFMapperService

# Simulated multi-source feed. In production these would be live pulls from
# NCS API / Indeed RSS / employer submissions; here they are bundled as JSON.
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "simulated_job_postings.json")
SOURCES = ["NCS API", "Indeed RSS", "Employer Direct"]


class JobCollector:
    """Ingests job postings from simulated market sources, runs multilingual
    skill extraction and NSQF mapping, and persists them as JobPosting rows."""

    @staticmethod
    def collect_from_sources(db: Session) -> Dict:
        path = os.path.abspath(DATA_FILE)
        try:
            with open(path, "r", encoding="utf-8") as f:
                raw_postings = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            return {"collected": 0, "skipped": 0, "sources": SOURCES, "error": str(e)}

        collected = 0
        skipped = 0
        for item in raw_postings:
            title = item.get("title", "Untitled")
            company = item.get("company", "Unknown")
            district = item.get("district", "Unknown")

            # Skip if an identical posting was already ingested (idempotent scans)
            exists = db.query(JobPosting).filter(
                JobPosting.title == title,
                JobPosting.company == company,
                JobPosting.district_name == district,
            ).first()
            if exists:
                skipped += 1
                continue

            description = item.get("raw_description", "")
            extracted, detected_lang, _ = MultilingualNLPExtractor.extract_skills(description)
            language = item.get("language") or detected_lang

            mapping = NSQFMapperService.map_skills_to_nsqf(db, extracted)
            nsqf_qp = mapping["best_matching_qp"]

            db.add(JobPosting(
                title=title,
                company=company,
                district_name=district,
                sector=item.get("sector", "General"),
                language=language,
                raw_description=description,
                extracted_skills_json=json.dumps(extracted),
                nsqf_qp_code=nsqf_qp,
            ))
            collected += 1

        db.commit()

        return {
            "collected": collected,
            "skipped": skipped,
            "sources": SOURCES,
            "total_in_db": db.query(JobPosting).count(),
        }

    @staticmethod
    def get_collection_stats(db: Session) -> Dict:
        postings = db.query(JobPosting).all()

        by_district: Counter = Counter()
        by_sector: Counter = Counter()
        by_language: Counter = Counter()
        for p in postings:
            by_district[p.district_name] += 1
            by_sector[p.sector] += 1
            by_language[p.language] += 1

        return {
            "total": len(postings),
            "by_district": dict(by_district.most_common()),
            "by_sector": dict(by_sector.most_common()),
            "by_language": dict(by_language.most_common()),
        }
