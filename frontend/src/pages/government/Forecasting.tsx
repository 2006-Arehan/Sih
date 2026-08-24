import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ForecastChart } from '../../components/charts/ForecastChart';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { FORECAST_DATASETS } from '../../data/dashboard';
import { LineChart, Sparkles, TrendingUp, AlertCircle, Clock } from 'lucide-react';

export const Forecasting: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState('12-Month');

  const horizonTabs = [
    { id: '3-Month', label: '3-Month Outlook (Q1 2026)' },
    { id: '6-Month', label: '6-Month Outlook (H1 2026)' },
    { id: '12-Month', label: '12-Month Projections (2026-27)' },
  ];

  const currentDataset = FORECAST_DATASETS.find(d => d.period === selectedHorizon) || FORECAST_DATASETS[2];

  return (
    <DashboardLayout
      pageTitle="Predictive Demand Forecasting Model"
      pageSubtitle="Machine-learning driven labor requirement projections across 3-month, 6-month, and 12-month policy horizons."
    >
      <div className="space-y-8">
        
        {/* Prototype Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-saffron-50 border border-saffron-300 flex items-center justify-between gap-4 text-xs text-saffron-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron-600 shrink-0" />
            <span>
              <strong>Prototype Forecast Notice:</strong> All projected percentage trajectories are mathematical model estimates based on current hiring announcements and state industrial investments.
            </span>
          </div>
          <Badge variant="saffron" size="sm">
            Prototype Data
          </Badge>
        </div>

        {/* Main Forecast Trajectory Chart */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="font-display text-base font-bold text-govnavy-950">
                12-Month Growth Projections by Emerging Domain
              </h3>
              <p className="text-xs text-slate-500">
                Estimated quarterly percentage growth over baseline 2025 hiring demand
              </p>
            </div>

            <Tabs
              tabs={horizonTabs}
              activeTab={selectedHorizon}
              onChange={setSelectedHorizon}
            />
          </div>

          <ForecastChart height={340} />
        </Card>

        {/* Horizon Metric Cards Grid */}
        <div>
          <h3 className="font-display text-lg font-bold text-govnavy-950 mb-4">
            Projected Surge for {selectedHorizon} Policy Cycle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="p-4 bg-white border-l-4 border-l-saffron-500">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Technology & GenAI</span>
              <div className="text-2xl font-extrabold text-govnavy-950 mt-1 font-mono">
                +{currentDataset.techAIGrowth}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">High corporate demand</p>
            </Card>

            <Card className="p-4 bg-white border-l-4 border-l-blue-600">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Automotive & EV</span>
              <div className="text-2xl font-extrabold text-blue-700 mt-1 font-mono">
                +{currentDataset.manufacturingEVGrowth}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Chakan & AURIC belts</p>
            </Card>

            <Card className="p-4 bg-white border-l-4 border-l-govgreen-700">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Renewables & CleanTech</span>
              <div className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">
                +{currentDataset.renewableEnergyGrowth}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Solar farm installations</p>
            </Card>

            <Card className="p-4 bg-white border-l-4 border-l-purple-600">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Healthcare & Pharma</span>
              <div className="text-2xl font-extrabold text-purple-700 mt-1 font-mono">
                +{currentDataset.healthcarePharmaGrowth}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Biotech & QA/QC</p>
            </Card>

            <Card className="p-4 bg-white border-l-4 border-l-amber-600">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Smart Logistics</span>
              <div className="text-2xl font-extrabold text-amber-700 mt-1 font-mono">
                +{currentDataset.logisticsGrowth}%
              </div>
              <p className="text-[11px] text-slate-500 mt-1">MIHAN & JNPT corridors</p>
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
