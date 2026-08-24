import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/cards/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { DemandChart } from '../../components/charts/DemandChart';
import { SkillGapChart } from '../../components/charts/SkillGapChart';
import { MaharashtraMap } from '../../components/maps/MaharashtraMap';
import { STATE_IMPACT_STATS, SECTOR_DEMAND_DISTRIBUTION } from '../../data/dashboard';
import { SKILLS_DATA } from '../../data/skills';
import { Briefcase, Award, AlertOctagon, Sparkles, Activity, Building2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export const GovernmentDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="State Labour Market Intelligence Overview"
      pageSubtitle="Comprehensive workforce demand telemetry and training capacity analytics across 36 districts of Maharashtra."
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/government/reports')}
          >
            Export State Briefing
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => navigate('/government/training-planner')}
          >
            Open Training Planner
          </Button>
        </div>
      }
    >
      {/* 6 High-Level State KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Jobs Analyzed"
          value={STATE_IMPACT_STATS.jobsAnalyzed.toLocaleString() + '+'}
          change="+18% MoM"
          isPositive={true}
          icon={<Briefcase className="w-5 h-5 text-blue-700" />}
          accentColor="blue"
          onClick={() => navigate('/government/skill-gap')}
        />
        <StatCard
          title="Skills Identified"
          value={STATE_IMPACT_STATS.skillsIdentified.toLocaleString()}
          subtitle="Normalized Taxonomies"
          icon={<Award className="w-5 h-5 text-govnavy-900" />}
          accentColor="navy"
          onClick={() => navigate('/government/emerging-skills')}
        />
        <StatCard
          title="Critical Skill Gaps"
          value="23 Gaps"
          change="+4 New"
          isPositive={false}
          icon={<AlertOctagon className="w-5 h-5 text-rose-600" />}
          accentColor="saffron"
          onClick={() => navigate('/government/skill-gap')}
        />
        <StatCard
          title="Emerging Skills"
          value="187"
          change="+72% Max"
          isPositive={true}
          icon={<Sparkles className="w-5 h-5 text-saffron-600" />}
          accentColor="saffron"
          onClick={() => navigate('/government/emerging-skills')}
        />
        <StatCard
          title="Course Health"
          value="78%"
          change="+3% Revamp"
          isPositive={true}
          icon={<Activity className="w-5 h-5 text-emerald-700" />}
          accentColor="green"
          onClick={() => navigate('/government/course-health')}
        />
        <StatCard
          title="Active Employers"
          value={STATE_IMPACT_STATS.employersConnected.toLocaleString()}
          subtitle="Contributing Feeds"
          icon={<Building2 className="w-5 h-5 text-purple-700" />}
          accentColor="purple"
          onClick={() => navigate('/government/districts')}
        />
      </div>

      {/* Main Grid: Demand Trend Chart (8 cols) + Sector Shares (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Demand Trend Chart */}
        <Card className="lg:col-span-8 p-5 bg-white border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <CardTitle className="text-base">Monthly Industry Demand vs Trained Supply</CardTitle>
              <p className="text-xs text-slate-500">6-Month historical tracking of job vacancies vs graduating cohort seats</p>
            </div>
            <Badge variant="navy" size="sm">
              Statewide Aggregation
            </Badge>
          </div>
          <DemandChart height={280} />
        </Card>

        {/* Top Sector Demand Distribution */}
        <Card className="lg:col-span-4 p-5 bg-white border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <CardTitle className="text-base">Demand by Key Sector</CardTitle>
              <span className="text-[10px] font-bold text-slate-400">Share %</span>
            </div>

            <div className="space-y-3 pt-1">
              {SECTOR_DEMAND_DISTRIBUTION.slice(0, 5).map((sec) => (
                <div key={sec.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-govnavy-950">
                    <span>{sec.name}</span>
                    <span className="font-mono text-slate-600">{sec.jobs.toLocaleString()} jobs ({sec.value}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${sec.value * 2.5}%`, backgroundColor: sec.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/government/districts')}
            >
              Analyze All Sectors
            </Button>
          </div>
        </Card>

      </div>

      {/* Skill Gap Analysis Bar Chart */}
      <Card className="p-5 bg-white border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
          <div>
            <CardTitle className="text-base">Top 6 High-Deficit Technical Skills</CardTitle>
            <p className="text-xs text-slate-500">Market demand vs available trained student supply</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/government/skill-gap')}
          >
            Full Gap Matrix
          </Button>
        </div>
        <SkillGapChart height={280} />
      </Card>

      {/* Spatial Telemetry Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-govnavy-950">
              36-District Spatial Telemetry
            </h3>
            <p className="text-xs text-slate-500">
              Click any district to inspect local industrial clusters and seat deficit priorities.
            </p>
          </div>
        </div>
        <MaharashtraMap />
      </div>

    </DashboardLayout>
  );
};
