import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { EMPLOYER_FEEDBACK_DATA } from '../../data/employers';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MessageSquare, Star, Building, CheckCircle2, AlertTriangle } from 'lucide-react';

export const EmployerFeedback: React.FC = () => {
  return (
    <DashboardLayout
      pageTitle="Employer & Recruiter Feedback Hub"
      pageSubtitle="Direct feedback from manufacturing plants, IT parks, and corporate recruiters on polytechnic graduate competence."
    >
      <div className="space-y-6">
        
        {/* Rating Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5 bg-white border-l-4 border-l-emerald-600">
            <span className="text-[10px] font-bold uppercase text-slate-400">Technical Competence</span>
            <div className="text-2xl font-extrabold text-govnavy-950 mt-1 font-mono flex items-center gap-1.5">
              <span>4.4</span>
              <span className="text-xs text-amber-500 font-bold">★ ★ ★ ★ ☆</span>
            </div>
            <span className="text-[11px] text-slate-500">Strong theoretical core</span>
          </Card>

          <Card className="p-5 bg-white border-l-4 border-l-amber-500">
            <span className="text-[10px] font-bold uppercase text-slate-400">Shopfloor Readiness</span>
            <div className="text-2xl font-extrabold text-govnavy-950 mt-1 font-mono flex items-center gap-1.5">
              <span>3.9</span>
              <span className="text-xs text-amber-500 font-bold">★ ★ ★ ★ ☆</span>
            </div>
            <span className="text-[11px] text-slate-500">Requires practical lab expansion</span>
          </Card>

          <Card className="p-5 bg-white border-l-4 border-l-blue-600">
            <span className="text-[10px] font-bold uppercase text-slate-400">Work Ethic & Soft Skills</span>
            <div className="text-2xl font-extrabold text-govnavy-950 mt-1 font-mono flex items-center gap-1.5">
              <span>4.6</span>
              <span className="text-xs text-amber-500 font-bold">★ ★ ★ ★ ★</span>
            </div>
            <span className="text-[11px] text-slate-500">High discipline & teamwork</span>
          </Card>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {EMPLOYER_FEEDBACK_DATA.map((fb) => (
            <Card key={fb.id} className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Building className="w-4 h-4 text-govnavy-900" />
                    <h3 className="font-display font-bold text-base text-govnavy-950">
                      {fb.employerName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Evaluated Course: <strong className="text-slate-800">{fb.courseEvaluated}</strong> ({fb.instituteGraduated})
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {fb.dateSubmitted}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 block">Technical Score</span>
                  <span className="font-bold text-govnavy-900">{fb.technicalCompetenceRating} / 5.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Practical Readiness</span>
                  <span className="font-bold text-amber-700">{fb.practicalReadinessRating} / 5.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Work Ethic</span>
                  <span className="font-bold text-emerald-700">{fb.workEthicSoftSkillsRating} / 5.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed italic">
                "{fb.feedbackNotes}"
              </p>

              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="font-bold text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Key Missing Skills Cited:
                </span>
                <div className="flex flex-wrap gap-1">
                  {fb.topMissingSkillsReported.map(sk => (
                    <span key={sk} className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
