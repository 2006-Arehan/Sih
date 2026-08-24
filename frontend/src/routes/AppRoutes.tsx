import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { HowItWorks } from '../pages/public/HowItWorks';
import { Features } from '../pages/public/Features';
import { Insights } from '../pages/public/Insights';
import { Resources } from '../pages/public/Resources';
import { Contact } from '../pages/public/Contact';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';

// Government Pages
import { GovernmentDashboard } from '../pages/government/Dashboard';
import { GovernmentMapPage } from '../pages/government/MaharashtraMap';
import { DistrictAnalysis } from '../pages/government/DistrictAnalysis';
import { IndustryDemand } from '../pages/government/IndustryDemand';
import { SkillGap } from '../pages/government/SkillGap';
import { EmergingSkills } from '../pages/government/EmergingSkills';
import { Forecasting } from '../pages/government/Forecasting';
import { CourseHealth } from '../pages/government/CourseHealth';
import { CurriculumRecommendations } from '../pages/government/CurriculumRecommendations';
import { TrainingPlanner } from '../pages/government/TrainingPlanner';
import { GovernmentReports } from '../pages/government/Reports';

// Institute Pages
import { InstituteDashboard } from '../pages/institute/Dashboard';
import { InstituteCourses } from '../pages/institute/Courses';
import { CurriculumAnalyzer } from '../pages/institute/CurriculumAnalyzer';
import { IndustryAlignment } from '../pages/institute/IndustryAlignment';
import { MissingSkills } from '../pages/institute/MissingSkills';
import { InstituteRecommendations } from '../pages/institute/Recommendations';
import { PlacementAnalytics } from '../pages/institute/PlacementAnalytics';
import { EmployerFeedback } from '../pages/institute/EmployerFeedback';

// Employer Pages
import { EmployerDashboard } from '../pages/employer/Dashboard';
import { PostJob } from '../pages/employer/PostJob';
import { EmployerJobs } from '../pages/employer/Jobs';
import { RequiredSkills } from '../pages/employer/RequiredSkills';
import { HiringDemand } from '../pages/employer/HiringDemand';
import { CandidateFeedback } from '../pages/employer/CandidateFeedback';
import { TrainingSurvey } from '../pages/employer/TrainingSurvey';

// Student Pages
import { StudentDashboard } from '../pages/student/Dashboard';
import { SkillProfile } from '../pages/student/SkillProfile';
import { SkillAssessment } from '../pages/student/SkillAssessment';
import { StudentSkills } from '../pages/student/Skills';
import { StudentSkillGap } from '../pages/student/SkillGap';
import { CareerPath } from '../pages/student/CareerPath';
import { StudentRecommendations } from '../pages/student/Recommendations';
import { StudentJobs } from '../pages/student/Jobs';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/features" element={<Features />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Government Portal Routes */}
      <Route path="/government" element={<Navigate to="/government/dashboard" replace />} />
      <Route path="/government/dashboard" element={<GovernmentDashboard />} />
      <Route path="/government/map" element={<GovernmentMapPage />} />
      <Route path="/government/districts" element={<DistrictAnalysis />} />
      <Route path="/government/industry-demand" element={<IndustryDemand />} />
      <Route path="/government/skill-gap" element={<SkillGap />} />
      <Route path="/government/emerging-skills" element={<EmergingSkills />} />
      <Route path="/government/forecast" element={<Forecasting />} />
      <Route path="/government/course-health" element={<CourseHealth />} />
      <Route path="/government/curriculum" element={<CurriculumRecommendations />} />
      <Route path="/government/training-planner" element={<TrainingPlanner />} />
      <Route path="/government/reports" element={<GovernmentReports />} />

      {/* Institute Portal Routes */}
      <Route path="/institute" element={<Navigate to="/institute/dashboard" replace />} />
      <Route path="/institute/dashboard" element={<InstituteDashboard />} />
      <Route path="/institute/courses" element={<InstituteCourses />} />
      <Route path="/institute/curriculum" element={<CurriculumAnalyzer />} />
      <Route path="/institute/alignment" element={<IndustryAlignment />} />
      <Route path="/institute/missing-skills" element={<MissingSkills />} />
      <Route path="/institute/recommendations" element={<InstituteRecommendations />} />
      <Route path="/institute/placement" element={<PlacementAnalytics />} />
      <Route path="/institute/feedback" element={<EmployerFeedback />} />

      {/* Employer Portal Routes */}
      <Route path="/employer" element={<Navigate to="/employer/dashboard" replace />} />
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      <Route path="/employer/post-job" element={<PostJob />} />
      <Route path="/employer/jobs" element={<EmployerJobs />} />
      <Route path="/employer/skills" element={<RequiredSkills />} />
      <Route path="/employer/hiring-demand" element={<HiringDemand />} />
      <Route path="/employer/feedback" element={<CandidateFeedback />} />
      <Route path="/employer/training-survey" element={<TrainingSurvey />} />

      {/* Student Portal Routes */}
      <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<SkillProfile />} />
      <Route path="/student/assessment" element={<SkillAssessment />} />
      <Route path="/student/skills" element={<StudentSkills />} />
      <Route path="/student/skill-gap" element={<StudentSkillGap />} />
      <Route path="/student/career-path" element={<CareerPath />} />
      <Route path="/student/recommendations" element={<StudentRecommendations />} />
      <Route path="/student/jobs" element={<StudentJobs />} />

      {/* Fallback Catch-All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
