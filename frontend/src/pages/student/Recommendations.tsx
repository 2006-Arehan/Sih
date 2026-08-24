import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sparkles, BookOpen, Clock, Building, Award, ArrowRight } from 'lucide-react';

export const StudentRecommendations: React.FC = () => {
  const recommendedCourses = [
    {
      id: 'rec-1',
      title: 'Applied Machine Learning for Polytechnic Engineers',
      provider: 'COEP Technological University & MSBTE',
      duration: '4 Weeks (Online + Weekend Lab)',
      subsidy: '100% State Sponsored',
      skillsCovered: ['Scikit-Learn', 'Feature Engineering', 'Model Deployment'],
      matchReason: 'Directly resolves your primary missing skill for Junior Data Analyst roles.'
    },
    {
      id: 'rec-2',
      title: 'Generative AI & Enterprise LLM Applications',
      provider: 'IIT Bombay & Maharashtra Skill Mission',
      duration: '3 Weeks (Self-paced + Mentor Hours)',
      subsidy: 'Free for Polytechnic Final Years',
      skillsCovered: ['OpenAI APIs', 'Prompt Engineering', 'RAG Pipelines'],
      matchReason: '+72% YoY hiring surge across Pune and Mumbai IT companies.'
    },
    {
      id: 'rec-3',
      title: 'Cloud Data Warehousing with Snowflake & BigQuery',
      provider: 'Government Polytechnic Mumbai Virtual Hub',
      duration: '2 Weeks (Practical Hands-on)',
      subsidy: 'Govt. Subsidized',
      skillsCovered: ['Cloud SQL', 'Snowflake Architecture', 'Data Pipelines'],
      matchReason: 'Highly requested in 28+ active job postings.'
    }
  ];

  return (
    <DashboardLayout
      pageTitle="Personalized Course & Micro-Credential Recommendations"
      pageSubtitle="AI-curated vocational upskilling programs aligned with your target career role and state sponsorship schemes."
    >
      <div className="space-y-6">
        
        <div className="p-4 rounded-xl bg-saffron-50 border border-saffron-200 text-xs text-saffron-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron-600 shrink-0" />
            <span>
              <strong>State Subsidy Scheme Active:</strong> All courses below are free or 100% subsidized under the Maharashtra Youth Technical Upskilling Initiative 2026.
            </span>
          </div>
          <Badge variant="saffron" size="sm">Govt. Funded</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <Card key={course.id} hoverEffect className="p-6 bg-white border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="green" size="sm">
                    {course.subsidy}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{course.provider}</p>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 leading-relaxed">
                  <strong>Why Recommended:</strong> {course.matchReason}
                </p>

                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Curriculum Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsCovered.map(s => (
                      <span key={s} className="text-[11px] bg-govnavy-50 text-govnavy-900 border border-govnavy-100 px-2 py-0.5 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-between"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => alert(`Simulated Enrollment: Successfully registered for ${course.title}!`)}
                >
                  Enroll with Student ID
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
