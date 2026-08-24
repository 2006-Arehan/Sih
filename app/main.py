import os
from fastapi import FastAPI, Request, Depends, status
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, Base, get_db
from app.services.seed_service import seed_database
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.middleware.rate_limiter import RateLimiterMiddleware

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
    description="Secure Backend API platform for SIH Problem Statement 134: Skill Development & LMI Platform (Government of Maharashtra)"
)

# 1. Register HTTP Security Response Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# 2. Register Rate Limiting Middleware (120 req/min per IP)
app.add_middleware(RateLimiterMiddleware, max_requests_per_minute=120)

# 3. Environment-Configurable CORS Middleware
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# 4. Global Exception Handler to Mask Raw Tracebacks in Production Responses
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"[SECURITY ALERT] Unhandled Server Error on {request.url.path}: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Transaction logged for security audit."}
    )

# Mount Static Files and Templates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    app.mount("/frontend", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

# 15-Day Automated Market Scanner Scheduler
def auto_scan_scheduler():
    """Background thread that automatically runs job market collection every 15 days."""
    import time
    FIFTEEN_DAYS = 15 * 24 * 3600
    while True:
        time.sleep(FIFTEEN_DAYS)
        try:
            from app.database import SessionLocal
            from app.services.job_collector import JobCollectorService
            db = SessionLocal()
            try:
                JobCollectorService.collect_job_postings(db)
            finally:
                db.close()
        except Exception as e:
            print(f"[Auto-Scan] Scheduled scan log: {e}")

# Startup event to seed database and start 15-day scheduler
@app.on_event("startup")
def startup_db_seed():
    import threading
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

    # Start 15-day automated market collector in background thread
    t = threading.Thread(target=auto_scan_scheduler, daemon=True)
    t.start()

# Serves Regenerated Web UI at GET /
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
