import React from 'react';
import { Card } from '../ui/Card';
import { Briefcase, Award, Sparkles, Building2, MapPin, CheckCircle } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const stats = [
    {
      value: '12,450+',
      label: 'Jobs Analyzed',
      description: 'Live vacancies scraped & surveyed across Maharashtra',
      icon: Briefcase,
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      value: '3,240+',
      label: 'Skills Identified',
      description: 'Standardized skill taxonomy mapped to industries',
      icon: Award,
      color: 'text-saffron-600 bg-saffron-50 border-saffron-200'
    },
    {
      value: '187+',
      label: 'Emerging Skills',
      description: 'Fast-growth technologies like GenAI, EV & CleanTech',
      icon: Sparkles,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      value: '2,146+',
      label: 'Employers Connected',
      description: 'Active recruiters providing regular skill demand feeds',
      icon: Building2,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      value: '36',
      label: 'Districts Covered',
      description: '100% administrative districts mapped with local telemetry',
      icon: MapPin,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    {
      value: '78%',
      label: 'Course Alignment',
      description: 'State average polytechnic syllabus industry readiness',
      icon: CheckCircle,
      color: 'text-govgreen-800 bg-govgreen-50 border-govgreen-200'
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200 relative -mt-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 text-center hover:bg-white hover:shadow-gov hover:border-slate-300 transition-all duration-200 group"
              >
                <div className={`w-9 h-9 mx-auto rounded-lg flex items-center justify-center mb-2.5 border ${stat.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-govnavy-950 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  {stat.label}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight hidden sm:block">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
