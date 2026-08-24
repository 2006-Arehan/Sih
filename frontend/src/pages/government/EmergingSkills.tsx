import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { SKILLS_DATA, EMERGING_SKILLS_SHOWCASE } from '../../data/skills';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Sparkles, TrendingUp, Zap, MapPin, Building, ArrowUpRight } from 'lucide-react';

export const EmergingSkills: React.FC = () => {
  const emergingList = SKILLS_DATA.filter(s => s.type === 'emerging');

  return (
    <DashboardLayout
      pageTitle="Emerging Technologies & Fast-Growth Skills Radar"
      pageSubtitle="Monitoring rapid velocity shifts in generative AI, electric powertrain calibration, renewable clean energy, and cyber defense."
    >
      <div className="space-y-8">
        
        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMERGING_SKILLS_SHOWCASE.slice(0, 4).map((item, idx) => (
            <Card key={idx} className="p-5 bg-white border-l-4 border-l-saffron-500 border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.category}</span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {item.growth}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-govnavy-950 mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500">
                Current Postings: <strong className="text-govnavy-900">{item.demand.toLocaleString()}+</strong>
              </p>
            </Card>
          ))}
        </div>

        {/* Detailed Emerging Skills Table & Momentum Metrics */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="font-display text-lg font-bold text-govnavy-950 mb-4">
            Emerging Skills Momentum Matrix
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-govnavy-950 font-bold border-b border-slate-200">
                  <th className="p-3.5 pl-4">Skill Domain</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Growth Velocity</th>
                  <th className="p-3.5">12-Month Forecast</th>
                  <th className="p-3.5">Avg Salary Boost</th>
                  <th className="p-3.5">Top Districts</th>
                  <th className="p-3.5 pr-4">Momentum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {emergingList.map((skill) => (
                  <tr key={skill.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-4 font-bold text-govnavy-950">
                      <div>{skill.name}</div>
                      <p className="text-[10px] text-slate-500 max-w-xs truncate">{skill.description}</p>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">{skill.category}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3" />
                        +{skill.growthPercent}%
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-saffron-600 font-mono">
                      +{skill.forecast12m}% YoY
                    </td>
                    <td className="p-3.5 font-bold text-govnavy-900 font-mono">
                      +{skill.avgSalaryGrowth}%
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {skill.topDistricts.slice(0, 2).join(', ')}
                    </td>
                    <td className="p-3.5 pr-4">
                      <Badge 
                        variant={skill.momentum === 'Very High' ? 'saffron' : 'navy'} 
                        size="sm"
                        dot
                      >
                        {skill.momentum}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
