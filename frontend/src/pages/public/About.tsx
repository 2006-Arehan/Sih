import React from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { IMAGES } from '../../config/images';
import { ShieldCheck, Target, Users, Building2, Award, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      {/* Page Hero */}
      <section className="bg-govnavy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
            About SkillPulse Maharashtra
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Building India's Most Dynamic <br />
            <span className="text-saffron-400">Labour Market Intelligence Engine</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            An initiative by the Department of Skill, Employment, Entrepreneurship & Innovation, Government of Maharashtra to eliminate the mismatch between vocational training and industrial demand.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 border-l-4 border-l-saffron-500 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-saffron-50 text-saffron-600">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-display text-xl font-bold text-govnavy-950">Our Mission</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To empower every district in Maharashtra with real-time labor demand visibility, enabling Directorate of Technical Education (DTE), MSBTE Polytechnics, ITIs, and industrial partners to collaboratively align curriculum, training capacities, and student career pathways with emerging economic opportunities.
            </p>
          </Card>

          <Card className="p-8 border-l-4 border-l-govgreen-700 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-display text-xl font-bold text-govnavy-950">Our Vision</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Position Maharashtra as the premier global talent and manufacturing powerhouse by maintaining a zero-latency feedback loop between industry job specifications and institutional skill development by 2030.
            </p>
          </Card>
        </div>

        {/* Real Photography & State Commitment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-gov-xl border border-slate-200 aspect-16/10">
            <img
              src={IMAGES.government.policyMeeting.url}
              alt={IMAGES.government.policyMeeting.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              State Governance Framework
            </span>
            <h3 className="font-display text-2xl font-bold text-govnavy-950">
              Transforming State Skill Policy from Static to Real-Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Historically, government curriculum revisions occurred once every 5 years. SkillPulse bridges this void by processing millions of live telemetry signals every month—from MIDC industrial expansions to campus recruitment drives—delivering weekly recommendations directly to syllabus committees.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standardized on National Skills Qualifications Framework (NSQF)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interoperable with Skill India Digital (SIDH) and Mahaswayam</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Granular district-level capacity allocation for all 36 District Collectors</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
