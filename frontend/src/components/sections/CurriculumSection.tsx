import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { Check, X, ArrowRight, BookOpen, AlertTriangle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';

export const CurriculumSection: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  return (
    <section className="py-20 bg-govbg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
            Institutional Alignment Tool
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
            Curriculum vs Industry Demand Diff
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            See how government polytechnics and engineering institutes diagnose syllabus gaps using automated AI alignment comparisons.
          </p>
        </div>

        {/* Interactive Curriculum Diff Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-gov-xl p-6 sm:p-8 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold font-mono text-slate-400">MSBTE-DA-401</span>
                <Badge variant="amber" size="sm" dot>
                  Needs Update
                </Badge>
              </div>
              <h3 className="font-display text-2xl font-bold text-govnavy-950">
                Diploma in Data Analytics & Applied AI
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Government Polytechnic, Pune • 3-Year Polytechnic Program
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 sm:text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Industry Alignment Index
              </span>
              <span className="text-3xl font-extrabold font-mono text-govnavy-950">
                78<span className="text-sm text-slate-400">/100</span>
              </span>
              <div className="w-28 mt-1.5 sm:ml-auto">
                <Progress value={78} variant="amber" size="sm" />
              </div>
            </div>
          </div>

          {/* Grid comparison: Current vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Current Covered Skills */}
            <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-display font-bold text-sm text-emerald-950">
                  Currently Taught in Syllabus (4 Skills)
                </h4>
              </div>

              <div className="space-y-2">
                {['Python Basics & Scripting', 'SQL Databases & Queries', 'Applied Statistics', 'Power BI Dashboard Creation'].map((item) => (
                  <div key={item} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-100 text-xs font-semibold text-slate-800">
                    <span>{item}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Covered</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Industry Requirements */}
            <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-200/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                  <X className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-display font-bold text-sm text-rose-950">
                  Missing High-Demand Skills (3 Skills)
                </h4>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Machine Learning Models (Scikit-Learn)', gap: 'High Demand' },
                  { name: 'Generative AI & LLM Integrations', gap: '+72% Surge' },
                  { name: 'Cloud Warehousing (Snowflake/BigQuery)', gap: 'Enterprise Need' }
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-rose-100 text-xs font-semibold text-slate-800">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">{item.gap}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Banner & Action */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-saffron-500/10 to-amber-500/10 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-amber-950 font-medium">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Curriculum Board Recommendation:</strong> Update Semester 5 syllabus with 30 lab hours on Generative AI & Snowflake to lift alignment to 94%.
              </span>
            </div>

            <Button
              variant="navy"
              size="sm"
              className="whitespace-nowrap"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => {
                switchRole('institute');
                navigate('/institute/curriculum');
              }}
            >
              Open Curriculum Analyzer
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
};
