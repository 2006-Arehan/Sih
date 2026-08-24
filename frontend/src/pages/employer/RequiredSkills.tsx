import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { SKILLS_DATA } from '../../data/skills';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Target, TrendingUp, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RequiredSkills: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      pageTitle="Industry Required Skills Catalog"
      pageSubtitle="Explore trending technological competencies requested by hiring managers across Maharashtra industrial belts."
      actions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => navigate('/employer/post-job')}
        >
          Post Skill Demand
        </Button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS_DATA.map((skill) => (
          <Card key={skill.id} hoverEffect className="p-6 bg-white border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={skill.type === 'emerging' ? 'saffron' : 'navy'} size="sm">
                  {skill.category}
                </Badge>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  +{skill.growthPercent}% YoY
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
                {skill.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4">{skill.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Demand: <strong className="text-govnavy-900">{skill.demandVolume.toLocaleString()} jobs</strong></span>
              <span className="font-bold text-saffron-600">{skill.momentum} Velocity</span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};
