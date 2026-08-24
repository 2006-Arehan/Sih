import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Award, GraduationCap, MapPin, User, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SkillProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Verified Student Skill Profile"
      pageSubtitle="Your state-verified technical credential passport linked to MSBTE and DigiLocker."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/student/assessment')}
        >
          Add Verified Badges
        </Button>
      }
    >
      <div className="space-y-6">
        
        {/* Profile Card */}
        <Card className="p-6 bg-white border-slate-200 shadow-gov">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-govnavy-900 text-white flex items-center justify-center text-2xl font-bold font-display shadow-md">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-bold text-govnavy-950">{user.name}</h3>
                <Badge variant="green" size="sm" dot>
                  MSBTE Verified Scholar
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.currentEducation} • {user.organization} ({user.district})
              </p>
              <p className="text-xs text-saffron-600 font-semibold mt-1">
                Target Role: <strong>{user.targetRole || 'Junior Data Analyst'}</strong>
              </p>
            </div>
          </div>
        </Card>

        {/* Verified Skill Badges */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-display font-bold text-base text-govnavy-950">
                Verified Competency Badges
              </h4>
              <p className="text-xs text-slate-500">Authenticated via state polytechnic lab practical examinations</p>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Python Scripting', level: 'Intermediate', issuer: 'MSBTE Tech Board', date: 'Jul 2025' },
              { name: 'SQL & Relational DBs', level: 'Advanced', issuer: 'MSBTE Tech Board', date: 'Oct 2025' },
              { name: 'Power BI & Dashboards', level: 'Intermediate', issuer: 'Govt Polytechnic Pune', date: 'Jan 2026' },
              { name: 'Excel Statistical Modeling', level: 'Advanced', issuer: 'Govt Polytechnic Pune', date: 'Mar 2026' },
            ].map((badge, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-govnavy-950">{badge.name}</div>
                <div className="text-[10px] text-emerald-700 font-bold">{badge.level}</div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                  {badge.issuer} • {badge.date}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
