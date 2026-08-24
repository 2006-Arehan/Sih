import React from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Hero } from '../../components/sections/Hero';
import { ImpactStats } from '../../components/sections/ImpactStats';
import { ProblemSection } from '../../components/sections/ProblemSection';
import { HowItWorks } from '../../components/sections/HowItWorks';
import { SkillIntelligence } from '../../components/sections/SkillIntelligence';
import { EmergingSkills } from '../../components/sections/EmergingSkills';
import { IntelligenceCards } from '../../components/sections/IntelligenceCards';
import { PortalSection } from '../../components/sections/PortalSection';
import { SectorSection } from '../../components/sections/SectorSection';
import { CareerSection } from '../../components/sections/CareerSection';
import { CurriculumSection } from '../../components/sections/CurriculumSection';
import { FeedbackLoop } from '../../components/sections/FeedbackLoop';
import { InsightsSection } from '../../components/sections/InsightsSection';
import { FinalCTA } from '../../components/sections/FinalCTA';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      {/* 1. Government Top Bar */}
      <TopGovernmentBar />

      {/* 2. Main Navbar */}
      <Navbar />

      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Impact Statistics */}
      <ImpactStats />

      {/* 5. Problem Section */}
      <ProblemSection />

      {/* 6. How SkillPulse Works */}
      <HowItWorks />

      {/* 7. Maharashtra Skill Intelligence Map */}
      <SkillIntelligence />

      {/* 8. Emerging Skills */}
      <EmergingSkills />

      {/* 9. Tri-Pillar Intelligence Cards */}
      <IntelligenceCards />

      {/* 10. Four Stakeholder Portals */}
      <PortalSection />

      {/* 11. 10 Key Industry Sectors */}
      <SectorSection />

      {/* 12. Student Career Section */}
      <CareerSection />

      {/* 13. Curriculum Alignment Diff */}
      <CurriculumSection />

      {/* 14. Workforce Feedback Loop */}
      <FeedbackLoop />

      {/* 15. Insights & State Reports */}
      <InsightsSection />

      {/* 16. Final Call to Action */}
      <FinalCTA />

      {/* 17. Footer */}
      <Footer />
    </div>
  );
};
