import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { SkillGapChart } from '../../components/charts/SkillGapChart';
import { SkillCard } from '../../components/cards/SkillCard';
import { SkillTable } from '../../components/tables/SkillTable';
import { SKILLS_DATA } from '../../data/skills';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { Scale, AlertTriangle, CheckCircle, TrendingUp, Filter } from 'lucide-react';

export const SkillGap: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Skill Taxonomies', count: SKILLS_DATA.length },
    { id: 'emerging', label: 'Emerging Skills', count: SKILLS_DATA.filter(s => s.type === 'emerging').length },
    { id: 'critical', label: 'Critical Gap (>60)', count: SKILLS_DATA.filter(s => s.gapIndex > 60).length },
  ];

  const filteredSkills = SKILLS_DATA.filter(s => {
    if (activeTab === 'emerging') return s.type === 'emerging';
    if (activeTab === 'critical') return s.gapIndex > 60;
    return true;
  });

  return (
    <DashboardLayout
      pageTitle="Statewide Skill Gap Analysis"
      pageSubtitle="Deficit quantification: Comparing employer job openings against trained polytechnic & engineering student supply."
    >
      <div className="space-y-8">
        
        {/* Top Summary Comparison Chart */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-govnavy-950">
                Supply vs Demand Gap Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Blue bars denote open industry positions; orange bars denote graduating student supply.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="red" size="sm" dot>
                State Deficit: 23 Gaps
              </Badge>
            </div>
          </div>
          <SkillGapChart height={300} />
        </Card>

        {/* Tabbed Skill Cards Matrix */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-govnavy-950">
                Skill Deficit Scorecards
              </h3>
              <p className="text-xs text-slate-500">
                Granular gap index calculated as unmet employer positions relative to cohort capacity.
              </p>
            </div>

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
              />
            ))}
          </div>
        </div>

        {/* Detailed Searchable Skill Table */}
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-govnavy-950">
            Comprehensive Skill Gap Inventory
          </h3>
          <SkillTable skills={SKILLS_DATA} />
        </div>

      </div>
    </DashboardLayout>
  );
};
