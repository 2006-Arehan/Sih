import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Target, Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentSkillGap: React.FC = () => {
  const navigate = useNavigate();

  const targetRole = 'Junior Data Analyst';
  const readiness = 68;

  const comparison = [
    { skill: 'Python Data Scripting', status: 'Mastered', desc: 'Covered in Semester 4 Lab', isAcquired: true },
    { skill: 'SQL & Database Queries', status: 'Mastered', desc: 'Covered in MSBTE DB Course', isAcquired: true },
    { skill: 'Power BI & Dashboards', status: 'Mastered', desc: 'Self-study project completed', isAcquired: true },
    { skill: 'Machine Learning (Scikit-Learn)', status: 'Missing', desc: 'Required by 72% of Pune employers', isAcquired: false },
    { skill: 'Generative AI & LLM APIs', status: 'Missing', desc: 'Required by 64% of Mumbai employers', isAcquired: false },
  ];

  return (
    <DashboardLayout
      pageTitle="Personalized Skill Gap vs Target Role"
      pageSubtitle="Benchmarking your current academic credentials directly against hiring specs for Junior Data Analyst."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/student/career-path')}
        >
          View Career Roadmap
        </Button>
      }
    >
      <div className="space-y-6">
        
        {/* Role Overview */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Target Role Profile</span>
              <h3 className="font-display text-2xl font-bold text-govnavy-950">{targetRole}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Average Starting CTC in Maharashtra: ₹5.5 - 7.5 LPA</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-right shrink-0">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Readiness Score</span>
              <span className="text-3xl font-extrabold font-mono text-saffron-600">{readiness}%</span>
              <div className="w-28 mt-1 sm:ml-auto">
                <Progress value={readiness} variant="saffron" size="sm" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            You possess <strong>3 of the 5 core proficiencies</strong> required by top recruiters (Mahindra Digital, LTIMindtree, Tata Motors). Mastering the remaining 2 skills will raise your match eligibility to over 95%.
          </p>
        </Card>

        {/* Detailed Competency Diff Table */}
        <Card className="p-6 bg-white border-slate-200 space-y-4">
          <h4 className="font-display font-bold text-base text-govnavy-950">
            Competency Requirements Breakdown
          </h4>

          <div className="space-y-2.5">
            {comparison.map((item) => (
              <div
                key={item.skill}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                  item.isAcquired 
                    ? 'bg-emerald-50/40 border-emerald-200' 
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs ${
                    item.isAcquired ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}>
                    {item.isAcquired ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{item.skill}</div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </div>
                </div>

                <Badge variant={item.isAcquired ? 'green' : 'red'} size="sm">
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">2 Competency Deficits Identified</span>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/student/recommendations')}
            >
              Enroll in Recommended Micro-Course
            </Button>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
