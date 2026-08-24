import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Award, Plus, CheckCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentSkills: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const acquiredSkills = user.acquiredSkills || ['Python Basics', 'SQL Databases', 'Power BI Dashboards', 'Excel Modeling'];
  const inProgressSkills = user.inProgressSkills || ['Machine Learning', 'Generative AI Applications'];

  return (
    <DashboardLayout
      pageTitle="My Technical Skills Inventory"
      pageSubtitle="Manage your acquired proficiencies, verified credentials, and active in-progress competencies."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/student/assessment')}
        >
          Verify New Skill
        </Button>
      }
    >
      <div className="space-y-6">
        
        {/* Acquired Skills Grid */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
            Mastered & Verified Competencies ({acquiredSkills.length})
          </h3>
          <p className="text-xs text-slate-500 mb-4">These skills are actively indexed by recruiting employers.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {acquiredSkills.map((sk) => (
              <div key={sk} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-left space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="green" size="sm">Verified</Badge>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-bold text-xs text-slate-900">{sk}</div>
                <div className="text-[10px] text-slate-500">Mastery Level: Proficient</div>
              </div>
            ))}
          </div>
        </Card>

        {/* In Progress Skills */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
            Target Competencies in Progress ({inProgressSkills.length})
          </h3>
          <p className="text-xs text-slate-500 mb-4">Closing these gaps will boost your job match score to 95%+.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inProgressSkills.map((sk) => (
              <div key={sk} className="p-4 rounded-xl bg-saffron-50/60 border border-saffron-200 text-left flex items-center justify-between">
                <div>
                  <Badge variant="saffron" size="sm">In Progress</Badge>
                  <div className="font-bold text-xs text-slate-900 mt-1">{sk}</div>
                  <div className="text-[10px] text-slate-500">Estimated time: 4-6 weeks</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/student/recommendations')}
                  className="bg-white text-xs"
                >
                  View Course
                </Button>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
