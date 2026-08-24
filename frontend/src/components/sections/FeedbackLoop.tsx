import React from 'react';
import { RefreshCw, Factory, Briefcase, Award, GraduationCap, UserCheck, CheckCircle, MessageSquare } from 'lucide-react';

export const FeedbackLoop: React.FC = () => {
  const nodes = [
    { title: 'Industry Growth', desc: 'New plants & technology', icon: Factory, color: 'border-blue-500 text-blue-600 bg-blue-50' },
    { title: 'Job Openings', desc: 'Live hiring specifications', icon: Briefcase, color: 'border-indigo-500 text-indigo-600 bg-indigo-50' },
    { title: 'Skill Taxonomies', desc: 'Normalized AI signals', icon: Award, color: 'border-saffron-500 text-saffron-600 bg-saffron-50' },
    { title: 'Training Institutes', desc: 'Dynamic syllabus updates', icon: GraduationCap, color: 'border-emerald-500 text-emerald-600 bg-emerald-50' },
    { title: 'Skilled Students', desc: 'Job-ready micro credentials', icon: UserCheck, color: 'border-purple-500 text-purple-600 bg-purple-50' },
    { title: 'Employment Placement', desc: 'High-match hiring', icon: CheckCircle, color: 'border-teal-500 text-teal-600 bg-teal-50' },
    { title: 'Employer Feedback', desc: 'Graduate shopfloor ratings', icon: MessageSquare, color: 'border-amber-500 text-amber-600 bg-amber-50' },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-govnavy-50 border border-govnavy-200 text-govnavy-900 text-xs font-bold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-saffron-500 animate-spin" />
            <span>Closed-Loop Adaptation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
            A workforce ecosystem that continuously learns.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            By connecting employer performance evaluations directly back to curriculum boards, Maharashtra ensures training programs evolve in lockstep with technological leaps.
          </p>
        </div>

        {/* Circular Ecosystem Flow Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-center flex flex-col items-center justify-between hover:bg-white hover:shadow-gov hover:border-slate-300 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${node.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-govnavy-950 mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {node.desc}
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-mono font-bold text-slate-400">
                  Step 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
