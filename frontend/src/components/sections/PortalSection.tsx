import React from 'react';
import { PortalCard } from '../cards/PortalCard';
import { IMAGES } from '../../config/images';
import { useAuth } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const PortalSection: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handlePortalLaunch = (role: 'government' | 'institute' | 'employer' | 'student', path: string) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200 inline-block mb-3">
            Ecosystem Portals
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
            Tailored Gateways for Every Stakeholder
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Whether framing state policy, updating engineering syllabi, hiring skilled engineers, or navigating your first career milestone.
          </p>
        </div>

        {/* 4 Large Stakeholder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Government Portal */}
          <PortalCard
            title="Government Directorate"
            tagline="Plan a future-ready workforce."
            badge="Policy & Governance"
            imageUrl={IMAGES.portals.government.url}
            imageAlt={IMAGES.portals.government.alt}
            accentColor="blue"
            features={[
              '36-District Skill Gap Matrix',
              'Macro Industry Demand Feeds',
              'State Course Health Scorecard',
              'Training Seat Capacity Allocator'
            ]}
            linkPath="/government/dashboard"
            onEnter={() => handlePortalLaunch('government', '/government/dashboard')}
          />

          {/* 2. Training Institute Portal */}
          <PortalCard
            title="Training Institute"
            tagline="Build industry-aligned courses."
            badge="Polytechnics & ITIs"
            imageUrl={IMAGES.portals.institute.url}
            imageAlt={IMAGES.portals.institute.alt}
            accentColor="emerald"
            features={[
              'Interactive Curriculum Analyzer',
              'Industry Requirement Diff Tool',
              'Missing Technical Skills Alert',
              'Batch Placement Tracking'
            ]}
            linkPath="/institute/dashboard"
            onEnter={() => handlePortalLaunch('institute', '/institute/dashboard')}
          />

          {/* 3. Employer Portal */}
          <PortalCard
            title="Industry Employer"
            tagline="Shape the future workforce."
            badge="Recruiters & Corporates"
            imageUrl={IMAGES.portals.employer.url}
            imageAlt={IMAGES.portals.employer.alt}
            accentColor="amber"
            features={[
              'Multi-Step Skill Job Posting Wizard',
              'Granular Skill Requirements Feed',
              'Quarterly Hiring Forecast Logger',
              'Graduate Shopfloor Feedback Tool'
            ]}
            linkPath="/employer/dashboard"
            onEnter={() => handlePortalLaunch('employer', '/employer/dashboard')}
          />

          {/* 4. Student Portal */}
          <PortalCard
            title="Student & Youth"
            tagline="Build your career around real demand."
            badge="Future Workforce"
            imageUrl={IMAGES.portals.student.url}
            imageAlt={IMAGES.portals.student.alt}
            accentColor="purple"
            features={[
              'Verified Skill Profile & Badges',
              'Personalized Role Gap Assessment',
              'Step-by-Step Learning Roadmaps',
              'High-Match Job Recommendations'
            ]}
            linkPath="/student/dashboard"
            onEnter={() => handlePortalLaunch('student', '/student/dashboard')}
          />

        </div>

      </div>
    </section>
  );
};
