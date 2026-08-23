import sys
import os

# Add project root directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import Base, engine, SessionLocal
from app.models.models import Course, ObsolescenceAssessment, EmployerFeedback, District
from app.services.seed_service import seed_database
from app.services.nlp_extractor import MultilingualNLPExtractor
from app.services.nsqf_mapper import NSQFMapperService
from app.services.skill_gap_engine import SkillGapEngine
from app.services.obsolescence_engine import ObsolescenceEngine
from app.services.recommendation_engine import RecommendationEngine

def run_all_tests():
    print("=" * 60)
    print("RUNNING SIH 134 BACKEND VERIFICATION TESTS")
    print("=" * 60)

    # 1. Initialize & Seed DB
    print("\n1. Initializing DB Schema & Seeding Data...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    seed_database(db)

    district_count = db.query(District).count()
    course_count = db.query(Course).count()
    print(f"   [SUCCESS] Seeded {district_count} districts and {course_count} courses in Maharashtra.")

    # 2. Test Multilingual NLP Skill Extraction (Marathi, Hindi, English)
    print("\n2. Testing Multilingual NLP Skill Extractor...")
    marathi_job = "पुणे चाकण मधील कारखान्यासाठी सीएनसी मशीन ऑपरेटिंग (CNC Machine Operation) आणि ऑटोकॅड (AutoCAD) चे ज्ञान आवश्यक आहे."
    skills, lang, conf = MultilingualNLPExtractor.extract_skills(marathi_job)
    print(f"   Marathi Text -> Detected Lang: {lang}, Confidence: {conf * 100}%")
    print(f"   Extracted Skills: {skills}")
    assert lang == "MR", f"Expected MR language but got {lang}"
    assert "CNC Machine Operation" in skills, "CNC Machine Operation not found in Marathi extraction"
    assert "AutoCAD & CAD/CAM Design" in skills, "AutoCAD not found in Marathi extraction"
    print("   [SUCCESS] Marathi NLP skill extraction verified.")

    hindi_job = "मुंबई ऑफिस के लिए पायथन (Python Programming) और डेटा विज्ञान (Data Science) डेवलपर की आवश्यकता है।"
    h_skills, h_lang, _ = MultilingualNLPExtractor.extract_skills(hindi_job)
    print(f"   Hindi Text -> Detected Lang: {h_lang}, Skills: {h_skills}")
    assert "Python Programming" in h_skills, "Python Programming not found in Hindi extraction"
    print("   [SUCCESS] Hindi NLP skill extraction verified.")

    # 3. Test NSQF Qualification Pack Mapper
    print("\n3. Testing NSQF / NOS Taxonomy Mapper...")
    mapped = NSQFMapperService.map_skills_to_nsqf(db, ["Python Programming", "Web Development", "SQL & Database Management"])
    print(f"   Skills -> Matched QP: {mapped['best_matching_qp']} ({mapped['qp_title']}) - {mapped['match_percentage']}% match")
    assert mapped["best_matching_qp"] == "SSC/Q0501", f"Expected SSC/Q0501 but got {mapped['best_matching_qp']}"
    print("   [SUCCESS] NSQF mapper verified.")

    # 4. Test Skill Gap Engine
    print("\n4. Testing Skill Gap Engine...")
    gap_result = SkillGapEngine.analyze_skill_gap(db, course_id=2)  # Advanced CNC course
    print(f"   Course: {gap_result['course_title']} ({gap_result['district_name']})")
    print(f"   Gap Percentage: {gap_result['gap_percentage']}%")
    print(f"   Missing Critical Skills: {gap_result['missing_critical_skills']}")
    assert "gap_percentage" in gap_result
    print("   [SUCCESS] Skill gap engine verified.")

    # 5. Test 4-Signal Obsolescence Risk Engine
    print("\n5. Testing 4-Signal Obsolescence Engine...")
    # Course 4 is Legacy Manual Drafting course
    assessment = ObsolescenceEngine.assess_course_obsolescence(db, course_id=4)
    print(f"   Course ID 4 Risk Score: {assessment.risk_score} / 100 ({assessment.risk_level})")
    print(f"   Flagged for Review: {assessment.flagged_for_review}")
    print(f"   Summary: {assessment.recommendation_summary}")
    assert assessment.risk_score >= 60.0, "Legacy course should have High Obsolescence Risk Score"
    assert assessment.flagged_for_review is True, "Legacy course should be flagged for review"
    print("   [SUCCESS] Course Obsolescence Risk Engine verified.")

    # 6. Test Recommendation Engine
    print("\n6. Testing Curriculum Recommendation Engine...")
    rec = RecommendationEngine.generate_recommendations(db, course_id=4)
    print(f"   Priority: {rec['action_priority']}")
    print(f"   Skills to Add: {rec['skills_to_add']}")
    print(f"   Skills to Deprecate: {rec['skills_to_deprecate']}")
    print(f"   Recommended NSQF: {rec['recommended_nsqf_qp']}")
    assert len(rec["skills_to_add"]) > 0
    print("   [SUCCESS] Curriculum Recommendation Engine verified.")

    db.close()
    print("\n" + "=" * 60)
    print("ALL SIH 134 BACKEND VERIFICATION TESTS PASSED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    run_all_tests()
