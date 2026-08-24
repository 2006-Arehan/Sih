import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DemandChart } from '../../components/charts/DemandChart';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react';

export const HiringDemand: React.FC = () => {
  return (
    <DashboardLayout
      pageTitle="State & Sector Hiring Demand Velocity"
      pageSubtitle="Track macro corporate demand cycles to plan seasonal campus recruitment and apprentice cohorts."
    >
      <div className="space-y-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Projected Sector Demand"
            value="31,000 Jobs"
            subtitle="Automotive & EV (2026)"
            icon={<Briefcase className="w-5 h-5 text-blue-700" />}
            accentColor="blue"
          />
          <StatCard
            title="Average Time to Hire"
            value="18 Days"
            subtitle="Via SkillPulse Platform"
            icon={<TrendingUp className="w-5 h-5 text-emerald-700" />}
            accentColor="green"
          />
          <StatCard
            title="Candidate Match Accuracy"
            value="89%"
            subtitle="Skill Alignment Score"
            icon={<Users className="w-5 h-5 text-purple-700" />}
            accentColor="purple"
          />
        </div>

        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-govnavy-950">
                Maharashtra State Hiring Trend (Historical & Forecast)
              </h3>
              <p className="text-xs text-slate-500">Live vacancies across top industrial zones</p>
            </div>
            <span className="text-xs font-bold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded">
              High Recruitment Activity
            </span>
          </div>
          <DemandChart height={300} />
        </Card>

      </div>
    </DashboardLayout>
  );
};
