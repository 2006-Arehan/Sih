from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

# --- Skill Schemas ---
class SkillBase(BaseModel):
    canonical_name: str
    category: str
    aliases: List[str] = []
    demand_trend: str = "Growing"

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class ExtractSkillsRequest(BaseModel):
    text: str
    language: Optional[str] = "EN"

class ExtractSkillsResponse(BaseModel):
    detected_language: str
    extracted_skills: List[str]
    matched_nsqf_qp: Optional[str] = None
    confidence_score: float

# --- NSQF Schemas ---
class NSQFQualificationPackBase(BaseModel):
    qp_code: str
    title: str
    sector: str
    nsqf_level: int
    covered_skills: List[str]
    nos_units: List[str] = []

class NSQFQualificationPackResponse(NSQFQualificationPackBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class NSQFMapRequest(BaseModel):
    skills: List[str]

class NSQFMapResponse(BaseModel):
    best_matching_qp: Optional[str]
    qp_title: Optional[str]
    sector: Optional[str]
    nsqf_level: Optional[int]
    match_percentage: float
    matching_skills: List[str]
    missing_skills: List[str]
    top_matches: List[dict] = []

# --- Job Posting Schemas ---
class JobPostingCreate(BaseModel):
    title: str
    company: str
    district_name: str
    sector: str
    language: str = "EN"
    raw_description: str
    extracted_skills: Optional[List[str]] = None
    nsqf_qp_code: Optional[str] = None

class JobPostingResponse(BaseModel):
    id: int
    title: str
    company: str
    district_name: str
    sector: str
    language: str
    raw_description: str
    extracted_skills: List[str]
    nsqf_qp_code: Optional[str]
    posted_date: datetime
    model_config = ConfigDict(from_attributes=True)

# --- Course Schemas ---
class CourseBase(BaseModel):
    course_code: str
    title: str
    institution_type: str
    district_name: str
    sector: str
    syllabus_skills: List[str]
    enrolment_count: int = 100
    placement_rate: float = 75.0

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# --- Auth & User Schemas ---
class UserBase(BaseModel):
    email: str
    full_name: Optional[str] = None
    role: str = "student"  # "government", "institute", "employer", "student"
    organization: Optional[str] = None
    district_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- Skill Gap Schemas ---
class SkillGapAnalysisRequest(BaseModel):
    course_id: int
    target_district: Optional[str] = None

class SkillGapAnalysisResponse(BaseModel):
    course_id: int
    course_title: str
    district_name: str
    sector: str
    syllabus_skills: List[str]
    top_industry_demanded_skills: List[str]
    covered_skills: List[str]
    missing_critical_skills: List[str]
    gap_percentage: float

# --- Obsolescence Risk Schemas ---
class ObsolescenceAssessmentResponse(BaseModel):
    id: int
    course_id: int
    course_title: str
    risk_score: float
    risk_level: str
    demand_decline_score: float
    skill_gap_score: float
    placement_drop_score: float
    employer_disapproval_score: float
    flagged_for_review: bool
    recommendation_summary: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# --- Recommendation Schemas ---
class CourseRecommendationResponse(BaseModel):
    course_id: int
    course_title: str
    sector: str
    district_name: str
    action_priority: str  # "Urgent Revision Required", "Moderate Update Recommended", "Up to Date"
    skills_to_add: List[str]
    skills_to_deprecate: List[str]
    recommended_nsqf_qp: Optional[str]
    district_industry_demand_note: str

# --- District Schemas ---
class DistrictResponse(BaseModel):
    id: int
    name: str
    region: str
    major_industries: List[str]
    active_postings_count: int
    top_demanded_skills: List[str] = []
    model_config = ConfigDict(from_attributes=True)

# --- Employer Feedback Schemas ---
class EmployerFeedbackCreate(BaseModel):
    employer_name: str
    company: str
    sector: str
    district_name: str
    course_id: Optional[int] = None
    validated_skills: List[str]
    missing_skills: List[str]
    satisfaction_rating: int = Field(..., ge=1, le=5)
    comments: str

class EmployerFeedbackResponse(BaseModel):
    id: int
    employer_name: str
    company: str
    sector: str
    district_name: str
    course_id: Optional[int]
    validated_skills: List[str]
    missing_skills: List[str]
    satisfaction_rating: int
    comments: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
