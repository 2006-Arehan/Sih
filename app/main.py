import os
from fastapi import FastAPI, Request, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, Base, get_db
from app.services.seed_service import seed_database

from app.api.v1.jobs import router as jobs_router
from app.api.v1.skills import router as skills_router
from app.api.v1.nsqf import router as nsqf_router
from app.api.v1.courses import router as courses_router
from app.api.v1.skill_gap import router as skill_gap_router
from app.api.v1.obsolescence import router as obsolescence_router
from app.api.v1.recommendations import router as recommendations_router
from app.api.v1.districts import router as districts_router
from app.api.v1.feedback import router as feedback_router
from app.api.v1.district_plan import router as district_plan_router
from app.api.v1.trends import router as trends_router
from app.api.v1.collector import router as collector_router
from app.api.v1.student import router as student_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API platform for SIH Problem Statement 134: Skill Development & LMI Platform (Government of Maharashtra)"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Files and Templates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

# Startup event to seed database
@app.on_event("startup")
def startup_db_seed():
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

# Serves Dashboard UI
@app.get("/", include_in_schema=False)
def serve_dashboard(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")

# Register API v1 Routers
app.include_router(jobs_router, prefix=settings.API_V1_STR)
app.include_router(skills_router, prefix=settings.API_V1_STR)
app.include_router(nsqf_router, prefix=settings.API_V1_STR)
app.include_router(courses_router, prefix=settings.API_V1_STR)
app.include_router(skill_gap_router, prefix=settings.API_V1_STR)
app.include_router(obsolescence_router, prefix=settings.API_V1_STR)
app.include_router(recommendations_router, prefix=settings.API_V1_STR)
app.include_router(districts_router, prefix=settings.API_V1_STR)
app.include_router(feedback_router, prefix=settings.API_V1_STR)
app.include_router(district_plan_router, prefix=settings.API_V1_STR)
app.include_router(trends_router, prefix=settings.API_V1_STR)
app.include_router(collector_router, prefix=settings.API_V1_STR)
app.include_router(student_router, prefix=settings.API_V1_STR)
