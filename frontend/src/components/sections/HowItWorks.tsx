import React from 'react';
import { Card } from '../ui/Card';
import { Radio, Cpu, Scale, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Industry Signals',
      icon: Radio,
      items: ['Job Postings', 'Employer Surveys', 'Sector Growth Trends', 'Historical Placements'],
      color: 'border-l-blue-600',
      tag: 'Data Ingestion'
    },
    {
      num: '02',
      title: 'Skill Intelligence',
      icon: Cpu,
      items: ['NLP Taxonomy Extraction', 'Skill Normalization', 'Proficiency Clustering', 'Market Weightage'],
      color: 'border-l-indigo-600',
      tag: 'AI Processing'
    },
    {
      num: '03',
      title: 'Skill Gap Matrix',
      icon: Scale,
      items: ['Demand vs Supply Analysis', '36 District Telemetry', 'Polytechnic Course Coverage', 'Deficit Scoring'],
      color: 'border-l-saffron-500',
      tag: 'Gap Mapping'
    },
    {
      num: '04',
      title: 'Predictive Forecast',
      icon: TrendingUp,
      items: ['Emerging Skills Velocity', '3/6/12 Month Projections', 'Industrial Shift Modeling', 'Disruption Radar'],
      color: 'border-l-amber-600',
      tag: 'Future Outlook'
    },
    {
      num: '05',
      title: 'Decisive Action',
      icon: CheckCircle,
      items: ['Curriculum Modernization', 'District Seat Allocations', 'Personalized Career Paths', 'Direct Job Matching'],
      color: 'border-l-govgreen-700',
      tag: 'Outcomes'
    },
  ];

  return (
    <section id="how-it-works-section" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200 inline-block mb-3">
            5-Stage Intelligence Engine
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
            How SkillPulse Maharashtra Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            From raw employment market signals to decisive curriculum upgrades and student placements across 36 districts.
          </p>
        </div>

        {/* 5 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.num} 
                hoverEffect
                className={`p-5 flex flex-col justify-between border-l-4 ${step.color} border-slate-200`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-black text-slate-300">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {step.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 rounded-lg bg-govnavy-50 text-govnavy-900 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-govnavy-950">
                      {step.title}
                    </h3>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
