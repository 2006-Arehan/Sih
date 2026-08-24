import React, { useState } from 'react';
import { SkillItem } from '../../types/skill';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Search, ArrowUpDown, TrendingUp } from 'lucide-react';
import { Input } from '../ui/Input';

interface SkillTableProps {
  skills: SkillItem[];
  onSelectSkill?: (skill: SkillItem) => void;
}

export const SkillTable: React.FC<SkillTableProps> = ({ skills, onSelectSkill }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = skills.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || s.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
      {/* Search and Filters */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search skills, tools, or domains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-govnavy-800"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-govnavy-950 font-bold border-b border-slate-200">
              <th className="p-3.5 pl-5">Skill Domain</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Growth (YoY)</th>
              <th className="p-3.5">Industry Demand</th>
              <th className="p-3.5">Trained Supply</th>
              <th className="p-3.5">Gap Index</th>
              <th className="p-3.5 pr-5">Primary Hubs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((skill) => (
              <tr
                key={skill.id}
                onClick={() => onSelectSkill && onSelectSkill(skill)}
                className="hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="p-3.5 pl-5 font-bold text-govnavy-950">
                  <div className="flex items-center gap-2">
                    <span>{skill.name}</span>
                    {skill.type === 'emerging' && (
                      <Badge variant="saffron" size="sm">
                        Emerging
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-3.5 text-slate-600 font-medium">{skill.category}</td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" />
                    +{skill.growthPercent}%
                  </span>
                </td>
                <td className="p-3.5 font-bold text-slate-800 font-mono">
                  {skill.demandVolume.toLocaleString()}
                </td>
                <td className="p-3.5 font-semibold text-slate-600 font-mono">
                  {skill.currentSupply.toLocaleString()}
                </td>
                <td className="p-3.5">
                  <div className="w-28 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className={skill.gapIndex > 60 ? 'text-rose-600' : 'text-amber-600'}>
                        {skill.gapIndex}/100
                      </span>
                    </div>
                    <Progress
                      value={skill.gapIndex}
                      variant={skill.gapIndex > 60 ? 'saffron' : 'amber'}
                      size="sm"
                    />
                  </div>
                </td>
                <td className="p-3.5 pr-5 text-slate-500">
                  {skill.topDistricts.slice(0, 2).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
