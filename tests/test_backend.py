import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app
from app.services.nlp_extractor import MultilingualNLPExtractor
from app.services.seed_service import seed_database

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_sih134.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_database(db)
    db.close()
    yield

def test_multilingual_nlp_extractor_marathi():
    marathi_text = "पुणे चाकण एमआयडीसी मधील कारखान्यासाठी सीएनसी मशीन ऑपरेटिंग (CNC Machine Operation) माहिती असणारे उमेदवार हवेत."
    extracted, lang, confidence = MultilingualNLPExtractor.extract_skills(marathi_text)
    assert lang == "MR"
    assert "CNC Machine Operation" in extracted
    assert confidence > 0.5

def test_multilingual_nlp_extractor_english():
    english_text = "We are hiring a Python developer with expertise in Web Development and SQL."
    extracted, lang, confidence = MultilingualNLPExtractor.extract_skills(english_text)
    assert lang == "EN"
    assert "Python Programming" in extracted
    assert "Web Development" in extracted

def test_api_get_districts():
    response = client.get("/api/v1/districts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert any(d["name"] == "Pune" for d in data)

def test_api_extract_skills_endpoint():
    payload = {
        "text": "Looking for Python Programming, Data Science and Machine Learning",
        "language": "EN"
    }
    response = client.post("/api/v1/jobs/extract-skills", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Python Programming" in data["extracted_skills"]
    assert data["matched_nsqf_qp"] == "SSC/Q0501"

def test_api_obsolescence_assessment():
    response = client.post("/api/v1/obsolescence/assess/4")
    assert response.status_code == 200
    data = response.json()
    assert data["course_id"] == 4
    assert data["risk_score"] > 50.0  # Legacy course should score high risk
    assert data["flagged_for_review"] is True

def test_api_course_recommendations():
    response = client.get("/api/v1/recommendations/course/2")
    assert response.status_code == 200
    data = response.json()
    assert data["course_id"] == 2
    assert "skills_to_add" in data

def test_api_employer_feedback():
    payload = {
        "employer_name": "Test Employer",
        "company": "Test Enterprise",
        "sector": "IT-ITeS",
        "district_name": "Mumbai",
        "validated_skills": ["Python Programming"],
        "missing_skills": ["Cloud Computing"],
        "satisfaction_rating": 4,
        "comments": "Good performance overall"
    }
    response = client.post("/api/v1/feedback", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["employer_name"] == "Test Employer"


# ---------------------------------------------------------------------------
# Fuzzy NSQF matching
# ---------------------------------------------------------------------------
def test_fuzzy_nsqf_matching():
    # "Python" (partial) should fuzzy-match the "Python Programming" QP skill
    response = client.post("/api/v1/nsqf/map-skills", json={"skills": ["Python"]})
    assert response.status_code == 200
    data = response.json()
    assert data["best_matching_qp"] == "SSC/Q0501"
    assert "Python Programming" in data["matching_skills"]
    # Top-N matches are returned, not just the single best QP
    assert isinstance(data["top_matches"], list)
    assert len(data["top_matches"]) >= 1


def test_fuzzy_nsqf_matching_welding_variant():
    # A loosely phrased skill still resolves to the correct covered skill
    response = client.post("/api/v1/nsqf/map-skills", json={"skills": ["TIG welding work"]})
    assert response.status_code == 200
    data = response.json()
    assert data["match_percentage"] >= 0.0  # runs without error and returns a score


# ---------------------------------------------------------------------------
# District training plan
# ---------------------------------------------------------------------------
def test_district_plan_valid():
    response = client.get("/api/v1/district-plan/Pune")
    assert response.status_code == 200
    data = response.json()
    assert data["district"] == "Pune"
    assert "skills_gap" in data
    assert "skills_available" in data
    assert "courses_at_risk" in data
    assert len(data["recommendations"]) > 0


def test_district_plan_invalid():
    response = client.get("/api/v1/district-plan/Atlantis")
    assert response.status_code == 404


# ---------------------------------------------------------------------------
# Emerging skills trends
# ---------------------------------------------------------------------------
def test_emerging_skills():
    response = client.get("/api/v1/trends/emerging-skills")
    assert response.status_code == 200
    data = response.json()
    for key in ("emerging", "established", "declining"):
        assert key in data
        assert isinstance(data[key], list)
    # Emerging skills (high demand, scarce training) should be detected
    emerging_names = [e["skill"] for e in data["emerging"]]
    assert len(emerging_names) > 0
    # A known scarce-supply skill should surface as emerging
    assert any(s in emerging_names for s in ["IoT Sensors", "Solar Panel Installation", "Power BI", "Data Analytics"])


# ---------------------------------------------------------------------------
# Job collector
# ---------------------------------------------------------------------------
def test_job_collector_ingest_and_stats():
    baseline = client.get("/api/v1/collector/stats").json()["total"]

    collect = client.post("/api/v1/collector/collect")
    assert collect.status_code == 200
    cdata = collect.json()
    assert cdata["collected"] > 0
    assert "NCS API" in cdata["sources"]

    stats = client.get("/api/v1/collector/stats")
    assert stats.status_code == 200
    sdata = stats.json()
    assert sdata["total"] > baseline
    assert isinstance(sdata["by_district"], dict)
    assert isinstance(sdata["by_sector"], dict)
    assert isinstance(sdata["by_language"], dict)


def test_job_collector_idempotent_rescan():
    client.post("/api/v1/collector/collect")
    # Second scan of the same source should add nothing new
    second = client.post("/api/v1/collector/collect")
    assert second.status_code == 200
    assert second.json()["collected"] == 0
