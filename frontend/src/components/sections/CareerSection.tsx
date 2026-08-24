import React from 'react';
import { IMAGES } from '../../config/images';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { CheckCircle2, CircleDot, ArrowRight, Sparkles, UserCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';

export const CareerSection: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleStudentPortal = () => {
    switchRole('student');
    navigate('/student/dashboard');
  };

  const roadmapSteps = [
    { title: 'Python Basics', status: 'Completed', level: 'Fundamental', color: 'bg-emerald-500 text-white' },
    { title: 'SQL & Data Modeling', status: 'Completed', level: 'Core', color: 'bg-emerald-500 text-white' },
    { title: 'Power BI & Dashboards', status: 'Completed', level: 'Applied', color: 'bg-emerald-500 text-white' },
    { title: 'Machine Learning Models', status: 'In Progress', level: 'Advanced', color: 'bg-saffron-500 text-white' },
    { title: 'Generative AI & LLMs', status: 'Target Milestone', level: 'Industry Ready', color: 'bg-slate-200 text-slate-700' },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Student Image & Interactive Profile Preview (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-gov-xl border-2 border-slate-200 bg-slate-900 aspect-square max-w-md mx-auto">
              <img
                src={IMAGES.students.femaleCoder.url}
                alt={IMAGES.students.femaleCoder.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-govnavy-950 via-govnavy-950/20 to-transparent" />
              
              {/* Floating Verified Student Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-none">Pooja Patil</span>
                  <span className="text-[10px] text-slate-500">MSBTE Polytechnic Scholar</span>
                </div>
              </div>

              {/* Career Goal & Readiness Score Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Target Career Role
                    </span>
                    <h4 className="font-display font-extrabold text-base text-govnavy-950">
                      Junior Data Analyst
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-slate-500 block">Readiness</span>
                    <span className="text-xl font-extrabold text-saffron-600 font-mono">68%</span>
                  </div>
                </div>
                <Progress value={68} variant="saffron" size="sm" />
              </div>

            </div>
          </div>

          {/* Right Details and Roadmap Flow (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Student Career Engine</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight leading-snug">
                Know what the market needs. <br />
                <span className="text-saffron-600">Build the skills that matter.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Take intelligent skill quizzes, benchmark yourself against real employer vacancies across Maharashtra, 
                and receive a step-by-step verified learning roadmap.
              </p>
            </div>

            {/* Step-by-Step Roadmap Pipeline */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Recommended Skill Learning Roadmap
              </span>

              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                {roadmapSteps.map((step, idx) => {
                  const isDone = step.status === 'Completed';
                  const isCurrent = step.status === 'In Progress';

                  return (
                    <div 
                      key={idx}
                      className={`flex-1 p-3 rounded-xl border text-center flex flex-col justify-between ${
                        isDone ? 'bg-emerald-50/80 border-emerald-300' :
                        isCurrent ? 'bg-saffron-50 border-saffron-300 ring-2 ring-saffron-400/20' :
                        'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <CircleDot className="w-4 h-4 text-saffron-600 animate-pulse" />
                        ) : (
                          <span className="w-3 h-3 rounded-full border-2 border-slate-300"></span>
                        )}
                      </div>
                      <div className="font-bold text-xs text-govnavy-950 leading-tight my-1">
                        {step.title}
                      </div>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                        isDone ? 'bg-emerald-100 text-emerald-800' :
                        isCurrent ? 'bg-saffron-200 text-saffron-900 font-bold' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleStudentPortal}
              >
                Launch Student Career Portal
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  switchRole('student');
                  navigate('/student/assessment');
                }}
              >
                Take 5-Min Skill Assessment
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
