import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Compass, CheckCircle2, CircleDot, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CareerPath: React.FC = () => {
  const navigate = useNavigate();

  const roadmap = [
    {
      step: 1,
      title: 'Python Scripting & Data Cleaning',
      duration: 'Completed in Sem 4',
      status: 'Mastered',
      topics: ['NumPy arrays', 'Pandas dataframes', 'Data wrangling', 'File I/O operations'],
      isDone: true,
    },
    {
      step: 2,
      title: 'SQL Relational Queries & Database Modeling',
      duration: 'Completed in Sem 5',
      status: 'Mastered',
      topics: ['Complex JOINs', 'Window functions', 'Indexing & performance', 'Schema design'],
      isDone: true,
    },
    {
      step: 3,
      title: 'Power BI & Executive Dashboards',
      duration: 'Completed in Sem 5 Lab',
      status: 'Mastered',
      topics: ['DAX formulas', 'Interactive slicers', 'Automated data refresh', 'Drillthrough reports'],
      isDone: true,
    },
    {
      step: 4,
      title: 'Applied Machine Learning Models',
      duration: 'Estimated 4 Weeks',
      status: 'Current Target',
      topics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Scikit-Learn pipeline', 'Model evaluation'],
      isDone: false,
      isCurrent: true,
    },
    {
      step: 5,
      title: 'Generative AI & LLM Data Engineering',
      duration: 'Estimated 3 Weeks',
      status: 'Final Capstone',
      topics: ['OpenAI / Gemini API integration', 'Vector embeddings', 'RAG query pipelines', 'Cloud deployment'],
      isDone: false,
    }
  ];

  return (
    <DashboardLayout
      pageTitle="Step-by-Step Learning & Career Path"
      pageSubtitle="Structured milestone progression from academic basics to industry job readiness."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/student/recommendations')}
        >
          View Recommended Courses
        </Button>
      }
    >
      <div className="space-y-6">
        
        {/* Pathway Header Banner */}
        <div className="bg-gradient-to-r from-govnavy-950 to-govnavy-900 text-white p-6 rounded-2xl border border-slate-800 shadow-gov">
          <div className="flex items-center gap-2 text-saffron-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Target Role Pathway</span>
          </div>
          <h3 className="font-display text-xl font-bold">
            Data Analyst & BI Specialist Roadmap
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Complete the 5 sequential milestones below to achieve 100% placement readiness for top Maharashtra tech and manufacturing recruiters.
          </p>
        </div>

        {/* Vertical Milestone Flow */}
        <div className="space-y-4">
          {roadmap.map((item) => (
            <Card
              key={item.step}
              className={`p-6 border-slate-200 ${
                item.isDone ? 'bg-white border-l-4 border-l-emerald-600' :
                item.isCurrent ? 'bg-saffron-50/40 border-l-4 border-l-saffron-500 ring-2 ring-saffron-400/20' :
                'bg-slate-50 border-l-4 border-l-slate-300 opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    item.isDone ? 'bg-emerald-600 text-white' :
                    item.isCurrent ? 'bg-saffron-500 text-white animate-pulse' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {item.isDone ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-govnavy-950">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">{item.duration}</span>
                  </div>
                </div>

                <Badge
                  variant={item.isDone ? 'green' : item.isCurrent ? 'saffron' : 'gray'}
                  size="sm"
                  dot={item.isCurrent}
                >
                  {item.status}
                </Badge>
              </div>

              <div className="pt-2 border-t border-slate-100/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Key Concepts & Deliverables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.topics.map(t => (
                    <span key={t} className="text-xs bg-white text-slate-800 border border-slate-200 px-2.5 py-0.5 rounded-md font-medium">
                      {t}
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
