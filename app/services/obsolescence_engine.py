import json
from sqlalchemy.orm import Session
from app.models.models import Course, ObsolescenceAssessment, EmployerFeedback
from app.services.skill_gap_engine import SkillGapEngine

class ObsolescenceEngine:
    @staticmethod
    def assess_course_obsolescence(db: Session, course_id: int) -> ObsolescenceAssessment:
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise ValueError(f"Course with ID {course_id} not found")

        # 1. Calculate Skill Gap Score (Weight 35%)
        gap_analysis = SkillGapEngine.analyze_skill_gap(db, course_id)
        skill_gap_score = gap_analysis["gap_percentage"]

        # 2. Calculate Placement Drop Score (Weight 20%)
        # Benchmark target placement rate is 80%. If placement rate is lower, score increases up to 100.
        placement = course.placement_rate
        placement_drop_score = max(0.0, min(100.0, (80.0 - placement) * 2.5))

        # 3. Calculate Demand Decline Score (Weight 30%)
        # Simulated based on industry demand or low job posting ratio
        demand_decline_score = 75.0 if "Legacy" in course.title or placement < 50.0 else 25.0

        # 4. Calculate Employer Disapproval Score (Weight 15%)
        feedbacks = db.query(EmployerFeedback).filter(EmployerFeedback.course_id == course_id).all()
        if feedbacks:
            avg_rating = sum(f.satisfaction_rating for f in feedbacks) / len(feedbacks)
            employer_disapproval_score = max(0.0, min(100.0, (5 - avg_rating) * 25.0))
        else:
            employer_disapproval_score = 40.0

        # Calculate weighted composite risk score
        risk_score = round(
            (0.35 * skill_gap_score) +
            (0.30 * demand_decline_score) +
            (0.20 * placement_drop_score) +
            (0.15 * employer_disapproval_score),
            1
        )

        if risk_score >= 65.0:
            risk_level = "High Risk"
            flagged = True
            recommendation = "HIGH OBSOLESCENCE RISK: Course curriculum is significantly outdated compared to live Maharashtra market demand. Urgent restructuring required."
        elif risk_score >= 40.0:
            risk_level = "Medium Risk"
            flagged = False
            recommendation = "MODERATE RISK: Key emerging industry skills are missing. Module updates recommended."
        else:
            risk_level = "Low Risk"
            flagged = False
            recommendation = "LOW RISK: Course maintains strong alignment with industry demand."

        # Save assessment record in DB
        assessment = ObsolescenceAssessment(
            course_id=course.id,
            risk_score=risk_score,
            risk_level=risk_level,
            demand_decline_score=demand_decline_score,
            skill_gap_score=skill_gap_score,
            placement_drop_score=placement_drop_score,
            employer_disapproval_score=employer_disapproval_score,
            flagged_for_review=flagged,
            recommendation_summary=recommendation
        )

        db.add(assessment)
        db.commit()
        db.refresh(assessment)

        return assessment
