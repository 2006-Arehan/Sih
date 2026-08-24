import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app
from app.services.seed_service import seed_database

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_new_features.db"
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

def test_api_ai_syllabus_generator():
    response = client.post("/api/v1/recommendations/generate-syllabus/1")
    assert response.status_code == 200
    data = response.json()
    assert data["course_id"] == 1
    assert len(data["weekly_syllabus_plan"]) == 12
    assert "aligned_qp_code" in data
    assert len(data["recommended_lab_upgrades"]) > 0

def test_api_student_upskill_simulator():
    payload = {
        "district_name": "Pune",
        "candidate_skills": ["CNC Machine Operation"],
        "current_course_id": 1
    }
    response = client.post("/api/v1/student/upskill-simulator", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["district_name"] == "Pune"
    assert "employability_index" in data
    assert "recommended_micro_credential" in data

def test_api_district_cabinet_note_pdf():
    response = client.get("/api/v1/district-plan/Pune/pdf")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert len(response.content) > 500

def test_api_midc_industrial_heatmap():
    response = client.get("/api/v1/districts/midc-heatmap")
    assert response.status_code == 200
    data = response.json()
    assert data["state"] == "Maharashtra"
    assert len(data["clusters"]) >= 5
    assert any(c["district"] == "Pune" for c in data["clusters"])
