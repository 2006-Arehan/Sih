import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/cards/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { CourseCard } from '../../components/cards/CourseCard';
import { COURSES_DATA } from '../../data/courses';
import { EMPLOYER_FEEDBACK_DATA } from '../../data/employers';
import { BookOpen, Target, Users, Award, Compass, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export const InstituteDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Institute Curriculum & Placement Dashboard"
      pageSubtitle="Government Polytechnic, Pune • Institutional alignment health, missing skills alerts, and employer satisfaction metrics."
      actions={
        <Button
          variant="primary"
          size="sm"
          rightIcon={<Compass className="w-4 h-4" />}
          onClick={() => navigate('/institute/curriculum')}
        >
          Launch Curriculum Analyzer
        </Button>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average Course Alignment"
          value="82%"
          change="+6% vs 2024"
          isPositive={true}
          icon={<Target className="w-5 h-5 text-emerald-700" />}
          accentColor="green"
          onClick={() => navigate('/institute/alignment')}
        />
        <StatCard
          title="Active Polytechnic Courses"
          value="18 Trades"
          subtitle="MSBTE Accredited"
          icon={<BookOpen className="w-5 h-5 text-blue-700" />}
          accentColor="blue"
          onClick={() => navigate('/institute/courses')}
        />
        <StatCard
          title="Annual Placement Rate"
          value="84%"
          change="+4% YoY"
          isPositive={true}
          icon={<Award className="w-5 h-5 text-saffron-600" />}
          accentColor="saffron"
          onClick={() => navigate('/institute/placement')}
        />
        <StatCard
          title="Employer Satisfaction"
          value="4.4 / 5.0"
          subtitle="From 42 Recruiters"
          icon={<Users className="w-5 h-5 text-purple-700" />}
          accentColor="purple"
          onClick={() => navigate('/institute/feedback')}
        />
      </div>

      {/* Curriculum Analyzer Promotion Banner */}
      <div className="bg-gradient-to-r from-govnavy-950 via-govnavy-900 to-govnavy-950 text-white p-6 rounded-2xl shadow-gov border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4" />
            <span>Interactive AI Alignment Engine</span>
          </span>
          <h3 className="font-display text-xl font-bold">
            Audit Your Syllabus Against Live Market Requirements
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Select or paste course modules to discover missing high-growth skills and generate curriculum upgrade proposals.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          className="whitespace-nowrap shadow-saffron-glow font-bold"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate('/institute/curriculum')}
        >
          Open Analyzer Tool
        </Button>
      </div>

      {/* Main Course Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-govnavy-950">
              Department Courses & Health Status
            </h3>
            <p className="text-xs text-slate-500">
              Live alignment scores calculated from employer hiring specifications in Pune and Maharashtra.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/institute/courses')}
          >
            View All Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DATA.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onAnalyze={() => navigate('/institute/curriculum')}
            />
          ))}
        </div>
      </div>

      {/* Recent Employer Feedback */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="font-display text-base font-bold text-govnavy-950">
              Recent Recruiter Evaluation Notes
            </h3>
            <p className="text-xs text-slate-500">Direct feedback on graduating batch technical readiness</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/institute/feedback')}
          >
            View All Feedback
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMPLOYER_FEEDBACK_DATA.slice(0, 2).map((fb) => (
            <div key={fb.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-govnavy-950">{fb.employerName}</span>
                <span className="text-[10px] font-semibold text-slate-500">{fb.dateSubmitted}</span>
              </div>
              <p className="text-xs text-slate-600 italic">"{fb.feedbackNotes}"</p>
              <div className="text-[11px] text-rose-700 font-semibold pt-1">
                Reported Gaps: {fb.topMissingSkillsReported.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </Card>

    </DashboardLayout>
  );
};
