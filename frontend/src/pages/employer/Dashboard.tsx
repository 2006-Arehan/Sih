import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/cards/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { JOBS_DATA } from '../../data/jobs';
import { Briefcase, PlusCircle, Users, Award, TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Employer Hiring & Skill Demand Portal"
      pageSubtitle="Tata AutoComp Systems Ltd • Broadcast hiring demands to 180+ Maharashtra ITIs and Polytechnics."
      actions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => navigate('/employer/post-job')}
        >
          Post New Skill Demand
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Job Postings"
          value="6 Openings"
          change="32 Positions"
          isPositive={true}
          icon={<Briefcase className="w-5 h-5 text-blue-700" />}
          accentColor="blue"
          onClick={() => navigate('/employer/jobs')}
        />
        <StatCard
          title="Matched Candidates"
          value="480 Trainees"
          subtitle="MSBTE Verified"
          icon={<Users className="w-5 h-5 text-emerald-700" />}
          accentColor="green"
          onClick={() => navigate('/employer/jobs')}
        />
        <StatCard
          title="Campus Hires (2026)"
          value="124 Recruits"
          change="+18% YoY"
          isPositive={true}
          icon={<Award className="w-5 h-5 text-saffron-600" />}
          accentColor="saffron"
        />
        <StatCard
          title="Talent Readiness Index"
          value="86 / 100"
          subtitle="Pune Region"
          icon={<TrendingUp className="w-5 h-5 text-purple-700" />}
          accentColor="purple"
          onClick={() => navigate('/employer/skills')}
        />
      </div>

      {/* Post Job Quick Banner */}
      <div className="bg-gradient-to-r from-govnavy-950 to-govnavy-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-gov">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-wider">
            Fast-Track Talent Acquisition
          </span>
          <h3 className="font-display text-xl font-bold">
            Post an Industrial Job or Apprenticeship Demand
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Input specific technical requirements to notify matching final-year polytechnic & ITI cohorts across Maharashtra.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          className="whitespace-nowrap font-bold shadow-saffron-glow"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/employer/post-job')}
        >
          Start 5-Step Job Wizard
        </Button>
      </div>

      {/* Active Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-govnavy-950">
              My Active Vacancy Postings
            </h3>
            <p className="text-xs text-slate-500">Live recruitment drives synchronized with state skill registries</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/employer/jobs')}
          >
            Manage All Jobs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JOBS_DATA.slice(0, 4).map((job) => (
            <Card key={job.id} hoverEffect className="p-5 bg-white border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="navy" size="sm">
                    {job.sector}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {job.openPositions} Positions
                  </span>
                </div>

                <h4 className="font-display font-bold text-base text-govnavy-950 mb-1">
                  {job.title}
                </h4>
                <p className="text-xs text-slate-500 mb-3">{job.companyName} • {job.locationDetails}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {job.requiredSkills.map(sk => (
                    <span key={sk} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-extrabold text-govnavy-900 font-mono">{job.salaryRange}</span>
                <span className="text-slate-500">Match Pool: <strong>140+ students</strong></span>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </DashboardLayout>
  );
};
