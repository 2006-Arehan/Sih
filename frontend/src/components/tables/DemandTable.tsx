import React, { useState } from 'react';
import { DistrictData } from '../../types/district';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Search, ArrowUpDown, MapPin, Eye } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface DemandTableProps {
  districts: DistrictData[];
  onSelectDistrict?: (district: DistrictData) => void;
}

export const DemandTable: React.FC<DemandTableProps> = ({ districts, onSelectDistrict }) => {
  const [search, setSearch] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('All');

  const filtered = districts.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.marathiName.includes(search) || d.topSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchDiv = divisionFilter === 'All' || d.division === divisionFilter;
    return matchSearch && matchDiv;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
      {/* Filters */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search district, skill or Marathi name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Division:</span>
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Divisions</option>
            <option value="Konkan">Konkan</option>
            <option value="Pune">Pune</option>
            <option value="Nashik">Nashik</option>
            <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
            <option value="Amravati">Amravati</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-govnavy-950 font-bold border-b border-slate-200">
              <th className="p-3.5 pl-5">District</th>
              <th className="p-3.5">Division</th>
              <th className="p-3.5">Demand Score</th>
              <th className="p-3.5">Active Jobs</th>
              <th className="p-3.5">Top Required Skill</th>
              <th className="p-3.5">Skill Gap</th>
              <th className="p-3.5">Training Seats</th>
              <th className="p-3.5">Placement</th>
              <th className="p-3.5 pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((dist) => (
              <tr
                key={dist.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="p-3.5 pl-5 font-bold text-govnavy-950">
                  <div>{dist.name}</div>
                  <span className="text-[11px] text-saffron-600 font-medium">{dist.marathiName}</span>
                </td>
                <td className="p-3.5 text-slate-600 font-medium">{dist.division}</td>
                <td className="p-3.5">
                  <span className="font-extrabold text-govnavy-900 font-mono text-sm">
                    {dist.demandScore}
                  </span>
                  <span className="text-[10px] text-slate-400">/100</span>
                </td>
                <td className="p-3.5 font-bold text-slate-800 font-mono">
                  {dist.totalJobs.toLocaleString()}
                </td>
                <td className="p-3.5 font-semibold text-slate-700">
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                    {dist.topSkills[0]}
                  </span>
                </td>
                <td className="p-3.5">
                  <Badge 
                    variant={dist.skillGap === 'Critical' ? 'red' : dist.skillGap === 'High' ? 'amber' : 'green'} 
                    size="sm"
                  >
                    {dist.skillGap}
                  </Badge>
                </td>
                <td className="p-3.5 text-slate-700 font-mono">
                  {dist.trainingCapacity.toLocaleString()}
                </td>
                <td className="p-3.5 font-bold text-emerald-700 font-mono">
                  {dist.placementRate}%
                </td>
                <td className="p-3.5 pr-5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs py-1 px-2.5"
                    leftIcon={<Eye className="w-3 h-3" />}
                    onClick={() => onSelectDistrict && onSelectDistrict(dist)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
