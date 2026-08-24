import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { COURSES_DATA } from '../../data/courses';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { AlignmentChart } from '../../components/charts/AlignmentChart';
import { Target, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IndustryAlignment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Institute Course vs Industry Alignment Matrix"
      pageSubtitle="Benchmarking polytechnic syllabi against the latest National Occupational Standards (NOS) and Maharashtra industrial hubs."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/institute/curriculum')}
        >
          Curriculum Analyzer
        </Button>
      }
    >
      <div className="space-y-8">
        
        {/* Top Summary Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-5 p-5 bg-white border-slate-200">
            <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
              Alignment Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-3">MSBTE Polytechnic curriculum compliance share</p>
            <AlignmentChart height={220} />
          </Card>

          <Card className="lg:col-span-7 p-6 bg-white border-slate-200 space-y-4">
            <h3 className="font-display font-bold text-base text-govnavy-950">
              Department Readiness Index
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Computer Engineering & Data Science</span>
                  <span className="font-mono text-emerald-700 font-bold">88% Aligned</span>
                </div>
                <Progress value={88} variant="green" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Electric Vehicle & Mechanical Systems</span>
                  <span className="font-mono text-blue-700 font-bold">82% Aligned</span>
                </div>
                <Progress value={82} variant="navy" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Industrial Automation & Robotics</span>
                  <span className="font-mono text-blue-700 font-bold">84% Aligned</span>
                </div>
                <Progress value={84} variant="navy" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Textile & Polymer Manufacturing</span>
                  <span className="font-mono text-amber-700 font-bold">68% Aligned</span>
                </div>
                <Progress value={68} variant="amber" size="sm" />
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Alignment List */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="font-display text-lg font-bold text-govnavy-950 mb-4">
            Course Alignment Scorecard
          </h3>

          <div className="space-y-4">
            {COURSES_DATA.map((course) => (
              <div key={course.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-govnavy-950">{course.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">({course.code})</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{course.level} • {course.institute}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-28 text-right">
                    <span className="text-sm font-extrabold font-mono text-govnavy-950">{course.industryAlignmentScore}%</span>
                    <Progress value={course.industryAlignmentScore} variant={course.industryAlignmentScore >= 85 ? 'green' : 'saffron'} size="sm" />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs py-1 px-3 bg-white"
                    onClick={() => navigate('/institute/curriculum')}
                  >
                    Diff Audit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
