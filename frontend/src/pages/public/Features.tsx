import React from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { SkillTable } from '../../components/tables/SkillTable';
import { SKILLS_DATA } from '../../data/skills';
import { Card } from '../../components/ui/Card';
import { Sparkles, Map, BookOpen, Compass, Briefcase, Award } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <section className="bg-govnavy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
            Platform Capabilities
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Skill Intelligence & Analytics Suite
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Standardized taxonomies, spatial heatmaps, curriculum analyzers, and predictive AI modeling tailored for Maharashtra.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border-l-4 border-l-blue-600">
            <Map className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-display font-bold text-base text-govnavy-950 mb-2">
              36-District Spatial Telemetry
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              District-by-district demand scores, top required skills, training capacity, and seat deficit allocations across 6 administrative divisions.
            </p>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-l-saffron-500">
            <BookOpen className="w-8 h-8 text-saffron-600 mb-3" />
            <h3 className="font-display font-bold text-base text-govnavy-950 mb-2">
              Curriculum Health Diagnostics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated syllabus diff comparing current MSBTE polytechnic topics against live employer skill requirements with actionable update recommendations.
            </p>
          </Card>

          <Card className="p-6 bg-white border-l-4 border-l-govgreen-700">
            <Compass className="w-8 h-8 text-emerald-700 mb-3" />
            <h3 className="font-display font-bold text-base text-govnavy-950 mb-2">
              Predictive 12-Month Forecasting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leading indicators for emerging domains like GenAI, EV powertrain calibration, solar microgrids, and automated multi-modal logistics.
            </p>
          </Card>
        </div>

        {/* Interactive Skills Taxonomy Table */}
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-bold text-govnavy-950">
              Statewide Skill Taxonomy & Market Volumes
            </h3>
            <p className="text-xs text-slate-500">
              Search, filter, and analyze real-time market supply-demand metrics across technical disciplines.
            </p>
          </div>

          <SkillTable skills={SKILLS_DATA} />
        </div>

      </main>

      <Footer />
    </div>
  );
};
