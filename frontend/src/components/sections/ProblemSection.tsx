import React from 'react';
import { Building, TrendingDown, BookX, HelpCircle, AlertOctagon, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

export const ProblemSection: React.FC = () => {
  const steps = [
    {
      title: 'INDUSTRY',
      quote: '"We need new skills."',
      detail: 'Fast emergence of GenAI, EV, and smart robotics creates unfulfilled vacancies.',
      icon: Building,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'JOB MARKET',
      quote: '"Demand is shifting rapidly."',
      detail: 'Traditional roles decline while cross-functional technical proficiencies surge.',
      icon: TrendingDown,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      title: 'TRAINING',
      quote: '"Our curriculum is lagging."',
      detail: 'Syllabus revision cycles take 3-5 years, missing rapid industry technological leaps.',
      icon: BookX,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      title: 'STUDENT',
      quote: '"What should I learn?"',
      detail: 'Youth lack clear real-time roadmaps on which skills lead to high-paying jobs.',
      icon: HelpCircle,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'THE OUTCOME',
      quote: 'Critical Skill Gap & Unemployment',
      detail: 'Unmet corporate demand coexists with underemployed graduates.',
      icon: AlertOctagon,
      badgeColor: 'bg-red-100 text-red-800'
    }
  ];

  return (
    <section className="py-20 bg-govbg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>The Core Challenge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
            Industry is changing faster than training.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Maharashtra’s industrial growth creates thousands of high-tech jobs, yet educational institutions 
            often lack real-time market data to adapt their curricula in time.
          </p>
        </div>

        {/* Visual Flow Pipeline (5 Stages) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="relative flex flex-col items-center">
                <Card className={`w-full p-5 text-center flex flex-col justify-between h-full border-slate-200 ${isLast ? 'bg-rose-50/50 border-rose-200' : 'bg-white'}`}>
                  <div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${step.badgeColor} inline-block mb-3`}>
                      {step.title}
                    </span>

                    <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-govnavy-950 mb-3 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-bold text-sm text-govnavy-950 mb-2">
                      {step.quote}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                    {step.detail}
                  </p>
                </Card>

                {/* Arrow connector between steps (for desktop) */}
                {!isLast && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-200 text-slate-600 items-center justify-center shadow-xs">
                    <span className="text-xs font-bold">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Solution Bridge Banner */}
        <div className="mt-14 bg-gradient-to-r from-govnavy-950 via-govnavy-900 to-govnavy-950 rounded-2xl p-8 text-white shadow-gov-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-saffron-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>The SkillPulse Solution</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                SkillPulse converts these fragmented signals into actionable intelligence.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Aggregating real-time employer postings, MSBTE course curricula, and district demographics to dynamically guide course modernization and student roadmaps.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Data-Driven Policy</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-saffron-400" />
                <span>Predictive Forecasting</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
