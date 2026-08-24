import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { COURSES_DATA } from '../../data/courses';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { BookOpen, CheckCircle, AlertTriangle, Sparkles, Download, Check } from 'lucide-react';

export const CurriculumRecommendations: React.FC = () => {
  return (
    <DashboardLayout
      pageTitle="State Curriculum Modernization Recommendations"
      pageSubtitle="Actionable guidance for MSBTE Polytechnic Boards, DTE, and State Skill Universities to align syllabi with corporate requirements."
      actions={
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Downloading State Syllabus Recommendations Dossier')}
        >
          Export DTE Directive
        </Button>
      }
    >
      <div className="space-y-6">
        {COURSES_DATA.map((course) => (
          <Card key={course.id} className="bg-white border-slate-200 p-6 space-y-6">
            
            {/* Course Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-slate-400">{course.code}</span>
                  <Badge 
                    variant={course.healthStatus === 'Excellent' ? 'green' : course.healthStatus === 'Good' ? 'navy' : 'amber'} 
                    size="sm"
                  >
                    {course.healthStatus}
                  </Badge>
                </div>
                <h3 className="font-display text-xl font-bold text-govnavy-950">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {course.institute} • {course.district} • Last Syllabus Revision: {course.lastSyllabusRevisionYear}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-right shrink-0">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Industry Alignment</span>
                <span className="text-2xl font-extrabold font-mono text-govnavy-950">{course.industryAlignmentScore}%</span>
                <div className="w-24 mt-1 ml-auto">
                  <Progress value={course.industryAlignmentScore} variant={course.industryAlignmentScore >= 85 ? 'green' : 'saffron'} size="sm" />
                </div>
              </div>
            </div>

            {/* 3-Column Skills Breakout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Covered Skills */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Covered in Syllabus ({course.coveredSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {course.coveredSkills.map((sk) => (
                    <span key={sk} className="text-[11px] bg-white text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/70">
                <span className="text-xs font-bold text-rose-950 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Missing High-Demand Skills ({course.missingSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {course.missingSkills.map((sk) => (
                    <span key={sk} className="text-[11px] bg-white text-rose-900 border border-rose-200 px-2 py-0.5 rounded-md font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Emerging to Integrate */}
              <div className="p-4 rounded-xl bg-saffron-50/50 border border-saffron-200/70">
                <span className="text-xs font-bold text-saffron-950 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Emerging Future Skills ({course.emergingSkillsToIntegrate.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {course.emergingSkillsToIntegrate.map((sk) => (
                    <span key={sk} className="text-[11px] bg-white text-saffron-900 border border-saffron-200 px-2 py-0.5 rounded-md font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Recommended Action Bullet Points */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Recommended Board Action Plan
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {course.recommendedCurriculumUpdates.map((update, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-govnavy-900 font-bold">✓</span>
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>

          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};
