import React from 'react';
import { Card } from '../ui/Card';
import { IndustrySector } from '../../types/sector';
import { IMAGES } from '../../config/images';
import { TrendingUp, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface SectorCardProps {
  sector: IndustrySector;
  onExplore?: () => void;
}

export const SectorCard: React.FC<SectorCardProps> = ({ sector, onExplore }) => {
  // Safe image lookup from centralized images registry
  const imageObj = (IMAGES.sectors as Record<string, { url: string; alt: string }>)[sector.imageKey] || {
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    alt: sector.name,
  };

  return (
    <Card hoverEffect className="group flex flex-col justify-between overflow-hidden border-slate-200">
      {/* Real Photography Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={imageObj.url}
          alt={imageObj.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-govnavy-950 via-govnavy-950/40 to-transparent" />
        
        {/* Growth Badge */}
        <div className="absolute top-3 right-3 bg-emerald-600/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black shadow flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          +{sector.growthRate}% Growth
        </div>

        {/* Sector Title over image */}
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-400 block mb-0.5">
            {sector.marathiName}
          </span>
          <h3 className="font-display text-lg font-bold text-white leading-snug">
            {sector.name}
          </h3>
        </div>
      </div>

      {/* Sector Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {sector.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 mb-3 bg-slate-50/70 rounded-lg px-3">
            <div>
              <span className="text-[10px] text-slate-500 block">Open Openings</span>
              <span className="font-extrabold text-govnavy-950">{sector.openJobsCount.toLocaleString()}+</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Avg Package</span>
              <span className="font-extrabold text-emerald-700">{sector.avgStartingSalary}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Top Skills in Demand
            </span>
            <div className="flex flex-wrap gap-1">
              {sector.topSkills.slice(0, 3).map((sk) => (
                <span key={sk} className="text-[11px] bg-govnavy-50 text-govnavy-900 border border-govnavy-100 font-medium px-2 py-0.5 rounded-md">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between group-hover:bg-govnavy-900 group-hover:text-white group-hover:border-govnavy-900 transition-colors mt-2"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={onExplore}
        >
          <span>Explore Sector Hub</span>
        </Button>
      </div>
    </Card>
  );
};
