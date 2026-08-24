import React from 'react';
import { EMERGING_SKILLS_SHOWCASE } from '../../data/skills';
import { IMAGES } from '../../config/images';
import { Button } from '../ui/Button';
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmergingSkills: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
              Emerging Skills in Maharashtra
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              High-growth technical competencies showing accelerated hiring surges across Pune, Mumbai, Nagpur, and AURIC corridors.
            </p>
          </div>

          <Button
            variant="navy"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/government/emerging-skills')}
            className="self-start md:self-auto shadow-md"
          >
            Explore Emerging Skills Radar
          </Button>
        </div>

        {/* Emerging Skills Grid with Rich Background Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EMERGING_SKILLS_SHOWCASE.map((skill, idx) => {
            const growthNumber = parseInt(skill.growth.replace('+', '').replace('%', ''), 10);
            const imageAsset = IMAGES.emergingSkills[skill.imageKey as keyof typeof IMAGES.emergingSkills];
            const imageUrl = imageAsset?.url || IMAGES.hero.studentsLab.url;

            return (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-2xl bg-[#081B3E] border border-slate-700/60 shadow-gov-lg transition-all duration-300 hover:shadow-2xl hover:border-slate-500 hover:-translate-y-1"
              >
                {/* Skill Background Image */}
                <img
                  src={imageUrl}
                  alt={skill.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for Maximum Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-[#051329]/80 to-[#071A3D]/50" />

                {/* Content Container */}
                <div className="relative z-10 p-5 flex flex-col justify-between h-full min-h-[220px]">
                  <div>
                    {/* Top Row: Category Pill & Growth Pill */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-white text-govnavy-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        {skill.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded backdrop-blur-sm">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {skill.growth}
                      </span>
                    </div>

                    {/* Skill Title */}
                    <h3 className="font-display text-lg font-bold text-white mb-1 leading-snug group-hover:text-saffron-300 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Active Postings */}
                    <p className="text-xs text-slate-300">
                      Active Postings: <strong className="text-white font-bold">{skill.demand.toLocaleString()}+</strong>
                    </p>
                  </div>

                  {/* Market Velocity & Progress Bar */}
                  <div className="space-y-1.5 pt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Market Velocity</span>
                      <span className="font-bold text-white">{growthNumber}% Surge</span>
                    </div>
                    <div className="w-full bg-slate-800/90 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          skill.isHot
                            ? 'bg-gradient-to-r from-saffron-500 to-amber-400' 
                            : 'bg-gradient-to-r from-blue-500 to-sky-400'
                        }`}
                        style={{ width: `${growthNumber}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
