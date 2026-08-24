import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { COURSES_DATA } from '../../data/courses';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sparkles, Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InstituteRecommendations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Institute Syllabus & Lab Recommendations"
      pageSubtitle="AI-synthesized revision guidelines designed for MSBTE academic review committees."
      actions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Downloading Proposal Package')}
        >
          Download All Recommendations (PDF)
        </Button>
      }
    >
      <div className="space-y-6">
        {COURSES_DATA.map((course) => (
          <Card key={course.id} className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs text-slate-400 font-bold">{course.code}</span>
                <h3 className="font-display font-bold text-lg text-govnavy-950">
                  {course.name}
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Target Alignment: 95%
              </span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Recommended Actionable Revisions
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {course.recommendedCurriculumUpdates.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Proposed for Academic Year 2026-27</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/institute/curriculum')}
              >
                Launch Analyzer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};
