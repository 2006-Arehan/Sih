import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { PlacementChart } from '../../components/charts/PlacementChart';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Award, DollarSign, Building, TrendingUp } from 'lucide-react';

export const PlacementAnalytics: React.FC = () => {
  return (
    <DashboardLayout
      pageTitle="Placement Outcomes & Recruiter Analytics"
      pageSubtitle="Comprehensive graduate placement rates, starting salary benchmarks, and recruiter sector distribution for Government Polytechnic, Pune."
    >
      <div className="space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Batch Placement Rate"
            value="84.2%"
            change="+4.5% vs 2025"
            isPositive={true}
            icon={<Award className="w-5 h-5 text-emerald-700" />}
            accentColor="green"
          />
          <StatCard
            title="Average Salary Package"
            value="₹5.4 LPA"
            change="+12% YoY"
            isPositive={true}
            icon={<DollarSign className="w-5 h-5 text-saffron-600" />}
            accentColor="saffron"
          />
          <StatCard
            title="Highest Offer"
            value="₹12.0 LPA"
            subtitle="Tata Motors R&D"
            icon={<TrendingUp className="w-5 h-5 text-blue-700" />}
            accentColor="blue"
          />
          <StatCard
            title="Partner Recruiters"
            value="48 Companies"
            subtitle="Hiring on campus"
            icon={<Building className="w-5 h-5 text-purple-700" />}
            accentColor="purple"
          />
        </div>

        {/* Placement Chart */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-govnavy-950">
                Placement Rate & Starting Compensation by Sector
              </h3>
              <p className="text-xs text-slate-500">Benchmark across engineering disciplines</p>
            </div>
            <span className="text-xs font-bold text-govnavy-900 bg-slate-100 px-2.5 py-1 rounded">
              Academic Year 2025-26
            </span>
          </div>
          <PlacementChart height={300} />
        </Card>

      </div>
    </DashboardLayout>
  );
};
