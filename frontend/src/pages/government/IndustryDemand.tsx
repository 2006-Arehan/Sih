import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { SectorCard } from '../../components/cards/SectorCard';
import { SECTORS_DATA } from '../../data/sectors';
import { Card } from '../../components/ui/Card';
import { DemandChart } from '../../components/charts/DemandChart';
import { Factory, TrendingUp, Users, DollarSign } from 'lucide-react';

export const IndustryDemand: React.FC = () => {
  return (
    <DashboardLayout
      pageTitle="Statewide Industry Demand Intelligence"
      pageSubtitle="Aggregated recruitment pipelines, salary benchmarks, and growth rates across 10 key industrial pillars."
    >
      <div className="space-y-8">
        
        {/* Top Demand Area Chart */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-govnavy-950">
                Quarterly Hiring Velocity Trend
              </h3>
              <p className="text-xs text-slate-500">Live demand vs state polytechnic / ITI seat capacity</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              +28% Annual Surge
            </span>
          </div>
          <DemandChart height={260} />
        </Card>

        {/* 10 Sector Cards */}
        <div>
          <h3 className="font-display text-lg font-bold text-govnavy-950 mb-4">
            Industry Growth Sectors & Skill Demands
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SECTORS_DATA.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={sector}
              />
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
