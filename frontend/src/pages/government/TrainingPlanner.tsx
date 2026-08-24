import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { TRAINING_PLANNER_DATA } from '../../data/dashboard';
import { TrainingPlannerRecord } from '../../types/dashboard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Plus, Save, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

export const TrainingPlanner: React.FC = () => {
  const [plans, setPlans] = useState<TrainingPlannerRecord[]>(TRAINING_PLANNER_DATA);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filtered = plans.filter(p => {
    const matchSearch = p.district.toLowerCase().includes(search.toLowerCase()) || p.skill.toLowerCase().includes(search.toLowerCase()) || p.sector.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'All' || p.priority === priorityFilter;
    return matchSearch && matchPriority;
  });

  const handleSeatChange = (id: string, newSeats: number) => {
    setPlans(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          recommendedSeats: newSeats,
          seatGap: p.currentSeats - p.industryDemand
        };
      }
      return p;
    }));
  };

  const handleSaveAllocations = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout
      pageTitle="District Training Capacity & Seat Allocator"
      pageSubtitle="Model district-level seat sanctions, laboratory funding, and cohort scaling to eliminate critical industrial skill deficits."
      actions={
        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Allocations Saved
            </span>
          )}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSaveAllocations}
          >
            Save State Plan
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        
        {/* Policy Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-white border-l-4 border-l-rose-500">
            <span className="text-[10px] font-bold uppercase text-slate-400">Critical Gaps</span>
            <div className="text-2xl font-extrabold text-rose-600 font-mono mt-1">
              {plans.filter(p => p.priority === 'Critical').length} Allocations
            </div>
            <span className="text-[11px] text-slate-500">Requires urgent lab sanctions</span>
          </Card>

          <Card className="p-4 bg-white border-l-4 border-l-amber-500">
            <span className="text-[10px] font-bold text-slate-400">Total Unmet Demand</span>
            <div className="text-2xl font-extrabold text-amber-700 font-mono mt-1">
              3,240 Seats
            </div>
            <span className="text-[11px] text-slate-500">Across surveyed districts</span>
          </Card>

          <Card className="p-4 bg-white border-l-4 border-l-govgreen-700">
            <span className="text-[10px] font-bold text-slate-400">Recommended New Seats</span>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
              +4,550 Seats
            </div>
            <span className="text-[11px] text-slate-500">Budgeted for 2026-27</span>
          </Card>

          <Card className="p-4 bg-white border-l-4 border-l-blue-600">
            <span className="text-[10px] font-bold text-slate-400">Participating ITIs</span>
            <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">
              184 Institutes
            </div>
            <span className="text-[11px] text-slate-500">Ready for cohort expansion</span>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="bg-white border-slate-200 overflow-hidden shadow-gov">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="w-full sm:w-80">
              <Input
                placeholder="Search district, skill or sector..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-govnavy-950 font-bold border-b border-slate-200">
                  <th className="p-3.5 pl-4">District & Division</th>
                  <th className="p-3.5">Sector & Skill Area</th>
                  <th className="p-3.5 text-center">Current Seats</th>
                  <th className="p-3.5 text-center">Industry Demand</th>
                  <th className="p-3.5 text-center">Seat Deficit</th>
                  <th className="p-3.5 text-center">Recommended Target</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5 pr-4">Proposed State Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((plan) => {
                  const priorityVariant = 
                    plan.priority === 'Critical' ? 'red' :
                    plan.priority === 'High' ? 'amber' :
                    plan.priority === 'Medium' ? 'navy' : 'gray';

                  return (
                    <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-4">
                        <div className="font-bold text-govnavy-950">{plan.district}</div>
                        <span className="text-[10px] text-slate-500">{plan.division} Division</span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{plan.skill}</div>
                        <span className="text-[10px] text-slate-500">{plan.sector}</span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-semibold text-slate-700">
                        {plan.currentSeats}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-blue-700">
                        {plan.industryDemand}
                      </td>
                      <td className="p-3.5 text-center font-mono font-extrabold text-rose-600">
                        {plan.seatGap}
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          value={plan.recommendedSeats}
                          onChange={(e) => handleSeatChange(plan.id, parseInt(e.target.value, 10) || 0)}
                          className="w-20 text-center font-mono font-bold text-xs bg-slate-50 border border-slate-300 rounded px-2 py-1 focus:bg-white focus:outline-none focus:border-govnavy-800"
                        />
                      </td>
                      <td className="p-3.5">
                        <Badge variant={priorityVariant} size="sm" dot>
                          {plan.priority}
                        </Badge>
                      </td>
                      <td className="p-3.5 pr-4 text-slate-600 max-w-xs text-[11px] leading-relaxed">
                        {plan.actionProposed}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
