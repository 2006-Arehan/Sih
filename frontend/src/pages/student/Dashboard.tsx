import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/cards/StatCard';
import { Badge } from '../../components/ui/Badge';
import { JOBS_DATA } from '../../data/jobs';
import { useAuth } from '../../store/authStore';
import { 
  BookCheck, 
  Compass, 
  Sparkles, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  CircleDot, 
  Briefcase,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const acquiredSkills = user.acquiredSkills || ['Python Basics', 'SQL Databases', 'Power BI Dashboards', 'Excel Modeling'];
  const inProgressSkills = user.inProgressSkills || ['Machine Learning', 'Generative AI Applications'];
  const readinessScore = user.careerReadinessScore || 68;
  const targetRole = user.targetRole || 'Junior Data Analyst';

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* 1. Main Hero-Style Header Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-700 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-saffron-500" />
              <span>Student Career Readiness Hub</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-govnavy-950 tracking-tight">
              Welcome back, {user.name}!
            </h1>

            <p className="text-sm text-slate-500 max-w-2xl font-medium leading-relaxed">
              Track your skill benchmarks, target role roadmaps, and high-match job vacancies across Maharashtra's industrial hubs.
            </p>
          </div>

          <button
            onClick={() => navigate('/student/assessment')}
            className="bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 self-start md:self-auto shrink-0"
          >
            <BookCheck className="w-4 h-4" />
            <span>Take Skill Assessment</span>
          </button>
        </div>

        {/* 2. Primary Hero Feature Card: Market Readiness Score + 4 Fast Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Primary Market Readiness Hero Card (5 Cols on LG) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#081B3E] to-[#051329] text-white rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-gov-lg flex flex-col justify-between relative overflow-hidden group">
            {/* Background Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-saffron-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Top Row: Eyebrow & Target Role Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Target Career Role
                </span>
                <span className="px-3 py-1 rounded-full bg-saffron-500/20 border border-saffron-500/40 text-saffron-300 text-xs font-extrabold tracking-wide">
                  {targetRole}
                </span>
              </div>

              {/* Main Score Block */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Market Readiness Score
                </h3>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl sm:text-6xl font-black tracking-tight text-white font-mono">
                    {readinessScore}%
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                    +14% this month
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Benchmarked against <strong>1,840+</strong> live Data & AI vacancies across Maharashtra
                </p>
              </div>

              {/* Progress & Milestone Indicator */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Milestone Progression</span>
                  <span className="text-saffron-300 font-bold">3 of 5 Skills Mastered</span>
                </div>
                <div className="w-full bg-slate-800/90 rounded-full h-2.5 overflow-hidden border border-slate-700/60 p-0.5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-saffron-500 via-amber-400 to-emerald-400 transition-all duration-1000 shadow-sm"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="relative z-10 pt-6 mt-4 border-t border-slate-800">
              <button
                onClick={() => navigate('/student/skill-gap')}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group/btn"
              >
                <span>Inspect Detailed Skill Gap</span>
                <ArrowRight className="w-4 h-4 text-saffron-400 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 4 Metric Cards (7 Cols on LG) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              title="Verified Badges"
              value="4 Skills"
              subtitle="MSBTE Certified Practical"
              icon={<Award className="w-5 h-5 text-emerald-600" />}
              accentColor="green"
              onClick={() => navigate('/student/skills')}
            />
            <StatCard
              title="Matching Job Openings"
              value="18 Vacancies"
              change="90%+ Match"
              isPositive={true}
              icon={<Briefcase className="w-5 h-5 text-blue-600" />}
              accentColor="blue"
              onClick={() => navigate('/student/jobs')}
            />
            <StatCard
              title="Target Milestone"
              value="Machine Learning"
              subtitle="Next Skill to Unlock"
              icon={<Sparkles className="w-5 h-5 text-orange-600" />}
              accentColor="saffron"
              onClick={() => navigate('/student/career-path')}
            />
            <StatCard
              title="Recommended Course"
              value="Applied AI Lab"
              subtitle="100% Govt. Subsidized"
              icon={<Compass className="w-5 h-5 text-purple-600" />}
              accentColor="purple"
              onClick={() => navigate('/student/recommendations')}
            />
          </div>

        </div>

        {/* 3. Skill Inventory Breakdown (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Acquired Skills Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-govnavy-950">
                    Acquired & Verified Skills
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">{acquiredSkills.length} competencies certified</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/student/skills')}
                className="text-xs font-bold text-slate-600 hover:text-govnavy-950 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Manage
              </button>
            </div>

            <div className="space-y-2">
              {acquiredSkills.map((sk) => (
                <div key={sk} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{sk}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next In-Demand Skills Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <CircleDot className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-govnavy-950">
                    Next In-Demand Skills to Learn
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">{inProgressSkills.length} high-growth deficits</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/student/recommendations')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50/50 hover:bg-orange-50 transition-colors"
              >
                Find Courses
              </button>
            </div>

            <div className="space-y-2">
              {inProgressSkills.map((sk) => (
                <div key={sk} className="flex items-center justify-between p-3 rounded-xl bg-orange-50/40 border border-orange-100 text-xs font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{sk}</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-md">
                    High Demand
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. High-Match Job Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-govnavy-950">
                High-Match Job Recommendations for You
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Filtered by your acquired technical proficiencies in Pune & Mumbai corridors
              </p>
            </div>

            <button
              onClick={() => navigate('/student/jobs')}
              className="text-xs font-bold text-govnavy-900 hover:text-saffron-600 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <span>Explore All Jobs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {JOBS_DATA.slice(0, 2).map((job) => (
              <div 
                key={job.id} 
                className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {job.matchScore || 92}% Match Score
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {job.district}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base sm:text-lg text-govnavy-950 mb-1">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">{job.companyName} • {job.locationDetails}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.requiredSkills.map(s => (
                      <span key={s} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Offered CTC</span>
                    <span className="font-extrabold text-sm text-govnavy-950 font-mono">{job.salaryRange}</span>
                  </div>

                  <button
                    onClick={() => alert(`Simulated Apply: Application submitted to ${job.companyName}!`)}
                    className="bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow-sm transition-all"
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
