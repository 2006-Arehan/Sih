import datetime
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # e.g., "Pune", "Mumbai", "Nagpur"
    region = Column(String)  # e.g., "Western Maharashtra", "Vidarbha", "Marathwada"
    major_industries = Column(Text)  # JSON string array of top industries
    active_postings_count = Column(Integer, default=0)

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    canonical_name = Column(String, unique=True, index=True)  # e.g., "Python Programming", "CNC Machine Operation"
    category = Column(String, index=True)  # e.g., "Software", "Manufacturing", "Electronics"
    aliases_json = Column(Text)  # JSON array of synonyms in English, Marathi, Hindi
    demand_trend = Column(String, default="Growing")  # "Growing", "Stable", "Declining"

class NSQFQualificationPack(Base):
    __tablename__ = "nsqf_qualification_packs"

    id = Column(Integer, primary_key=True, index=True)
    qp_code = Column(String, unique=True, index=True)  # e.g., "SSC/Q0501"
    title = Column(String)
    sector = Column(String, index=True)
    nsqf_level = Column(Integer)
    covered_skills_json = Column(Text)  # JSON list of skills in this standard
    nos_units_json = Column(Text)  # JSON list of NOS unit codes

class JobPosting(Base):
    __tablename__ = "job_postings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String)
    district_name = Column(String, index=True)
    sector = Column(String, index=True)
    language = Column(String, default="EN")  # "EN", "MR", "HI"
    raw_description = Column(Text)
    extracted_skills_json = Column(Text)  # JSON list of extracted skill names
    nsqf_qp_code = Column(String, nullable=True)
    posted_date = Column(DateTime, default=datetime.datetime.utcnow)

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_code = Column(String, unique=True, index=True)
    title = Column(String)
    institution_type = Column(String)  # "ITI", "Polytechnic", "Vocational", "University"
    district_name = Column(String, index=True)
    sector = Column(String, index=True)
    syllabus_skills_json = Column(Text)  # JSON list of skills covered in syllabus
    enrolment_count = Column(Integer, default=100)
    placement_rate = Column(Float, default=70.0)  # Percentage (e.g. 45.0 = 45%)

    obsolescence_assessments = relationship("ObsolescenceAssessment", back_populates="course", cascade="all, delete-orphan")

class ObsolescenceAssessment(Base):
    __tablename__ = "obsolescence_assessments"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    risk_score = Column(Float)  # 0.0 to 100.0
    risk_level = Column(String)  # "High Risk", "Medium Risk", "Low Risk"
    demand_decline_score = Column(Float)
    skill_gap_score = Column(Float)
    placement_drop_score = Column(Float)
    employer_disapproval_score = Column(Float)
    flagged_for_review = Column(Boolean, default=False)
    recommendation_summary = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    course = relationship("Course", back_populates="obsolescence_assessments")

class EmployerFeedback(Base):
    __tablename__ = "employer_feedback"

    id = Column(Integer, primary_key=True, index=True)
    employer_name = Column(String)
    company = Column(String)
    sector = Column(String)
    district_name = Column(String)
    course_id = Column(Integer, nullable=True)
    validated_skills_json = Column(Text)  # JSON list of skills validated as still relevant
    missing_skills_json = Column(Text)    # JSON list of missing emerging skills
    satisfaction_rating = Column(Integer) # 1 to 5
    comments = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
