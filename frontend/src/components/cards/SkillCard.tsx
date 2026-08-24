import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { SkillItem } from '../../types/skill';
import { TrendingUp, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export interface SkillCardProps {
  skill: SkillItem;
  onClick?: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  return (
    <Card 
      hoverEffect 
      className="p-5 flex flex-col justify-between cursor-pointer border-slate-200"
      onClick={onClick}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant={skill.type === 'emerging' ? 'saffron' : 'navy'} size="sm">
            {skill.category}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />
            +{skill.growthPercent}% YoY
          </span>
        </div>

        <h3 className="font-display text-base font-bold text-govnavy-950 mb-1.5 line-clamp-1">
          {skill.name}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-slate-500 font-medium">Supply vs Demand Gap</span>
            <span className={`font-bold ${skill.gapIndex > 60 ? 'text-rose-600' : 'text-amber-600'}`}>
              Gap Index: {skill.gapIndex}/100
            </span>
          </div>
          <Progress 
            value={skill.gapIndex} 
            variant={skill.gapIndex > 60 ? 'saffron' : 'amber'} 
            size="sm" 
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[140px]">
              {skill.topDistricts.slice(0, 2).join(', ')}
            </span>
          </div>
          <span className="font-bold text-govnavy-900">
            {skill.demandVolume.toLocaleString()} jobs
          </span>
        </div>
      </div>
    </Card>
  );
};
