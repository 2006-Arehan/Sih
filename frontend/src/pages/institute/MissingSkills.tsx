import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { COURSES_DATA } from '../../data/courses';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, PlusCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MissingSkills: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Curricular Missing Skills & Deficit Directory"
      pageSubtitle="Granular diagnosis of high-demand industry competencies currently absent from polytechnic syllabi."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/institute/recommendations')}
        >
          View Recommendations
        </Button>
      }
    >
      <div className="space-y-6">
        
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Curriculum Board Advisory:</strong> 6 courses show missing modules in generative AI, cloud data warehousing, or 5-axis CNC simulation.
            </span>
          </div>
          <Badge variant="red" size="sm">
            Action Required
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES_DATA.map((course) => (
            <Card key={course.id} className="p-6 bg-white border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{course.code}</span>
                  <Badge variant={course.missingSkills.length > 2 ? 'red' : 'amber'} size="sm">
                    {course.missingSkills.length} Missing Skills
                  </Badge>
                </div>

                <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{course.institute}</p>

                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                    Deficit Competencies:
                  </span>
                  <div className="space-y-1.5">
                    {course.missingSkills.map((sk) => (
                      <div key={sk} className="flex items-center justify-between p-2 rounded-lg bg-rose-50/60 border border-rose-200/80 text-xs text-rose-950 font-semibold">
                        <span>{sk}</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded text-rose-700 border border-rose-200 font-bold">Unmet</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Alignment: {course.industryAlignmentScore}%</span>
                <Button
                  size="sm"
                  variant="outline"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => navigate('/institute/curriculum')}
                >
                  Resolve Deficit
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
