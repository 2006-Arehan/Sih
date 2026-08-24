import React, { useState } from 'react';
import { Course } from '../../types/course';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Search, AlertTriangle, Building, MapPin } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface CourseTableProps {
  courses: Course[];
  onSelectCourse?: (course: Course) => void;
}

export const CourseTable: React.FC<CourseTableProps> = ({ courses, onSelectCourse }) => {
  const [search, setSearch] = useState('');
  const [healthFilter, setHealthFilter] = useState('All');

  const filtered = courses.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.institute.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchHealth = healthFilter === 'All' || c.healthStatus === healthFilter;
    return matchSearch && matchHealth;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
      {/* Search and Filters */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search courses, colleges, or course codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Health Status:</span>
          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Excellent">Excellent (90%+)</option>
            <option value="Good">Good (80-89%)</option>
            <option value="Needs Improvement">Needs Improvement</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-govnavy-950 font-bold border-b border-slate-200">
              <th className="p-3.5 pl-5">Course Title & Code</th>
              <th className="p-3.5">Institute & District</th>
              <th className="p-3.5">Alignment Score</th>
              <th className="p-3.5">Placement</th>
              <th className="p-3.5">Missing High-Demand Skills</th>
              <th className="p-3.5">Health Status</th>
              <th className="p-3.5 pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((course) => {
              const statusVariant = 
                course.healthStatus === 'Excellent' ? 'green' :
                course.healthStatus === 'Good' ? 'navy' :
                course.healthStatus === 'Needs Improvement' ? 'amber' : 'red';

              return (
                <tr
                  key={course.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3.5 pl-5">
                    <div className="font-bold text-govnavy-950">{course.name}</div>
                    <span className="text-[10px] font-mono font-semibold text-slate-400">
                      {course.code} • {course.level}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-800 font-medium truncate max-w-[200px]">
                      {course.institute}
                    </div>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {course.district}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="w-24 space-y-1">
                      <span className="font-extrabold text-govnavy-900 font-mono">
                        {course.industryAlignmentScore}%
                      </span>
                      <Progress
                        value={course.industryAlignmentScore}
                        variant={course.industryAlignmentScore >= 85 ? 'green' : 'saffron'}
                        size="sm"
                      />
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-emerald-700 font-mono">
                    {course.placementRate}%
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {course.missingSkills.slice(0, 2).map((sk) => (
                        <span key={sk} className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
                          {sk}
                        </span>
                      ))}
                      {course.missingSkills.length > 2 && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          +{course.missingSkills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={statusVariant} size="sm" dot>
                      {course.healthStatus}
                    </Badge>
                  </td>
                  <td className="p-3.5 pr-5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs py-1 px-2.5"
                      onClick={() => onSelectCourse && onSelectCourse(course)}
                    >
                      Audit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
