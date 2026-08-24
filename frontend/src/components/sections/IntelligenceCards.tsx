import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { Scale, TrendingUp, Activity, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IntelligenceCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-govbg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-govnavy-900 bg-govnavy-50 px-3 py-1 rounded-full border border-govnavy-200 inline-block mb-3">
            Analytical Deep Dives
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
            Tri-Pillar Workforce Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Skill gap severity, predictive growth modeling, and syllabus health diagnostics unified in one view.
          </p>
        </div>

        {/* 3 Intelligence Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Skill Gap */}
          <Card hoverEffect className="flex flex-col justify-between border-t-4 border-t-rose-500 border-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50">
              <div className="flex items-center justify-between">
                <Badge variant="red" size="sm" dot>
                  Supply vs Demand Gap
                </Badge>
                <Scale className="w-4 h-4 text-rose-500" />
              </div>
              <CardTitle className="mt-2 text-lg">
                High-Deficit Skills Matrix
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Skill 1: AI/ML */}
              <div>
                <div className="flex justify-between text-xs font-bold text-govnavy-950 mb-1">
                  <span>AI & Machine Learning</span>
                  <span className="text-rose-600">82/100 Deficit</span>
                </div>
                <Progress value={82} variant="saffron" size="md" />
              </div>

              {/* Skill 2: Cloud Computing */}
              <div>
                <div className="flex justify-between text-xs font-bold text-govnavy-950 mb-1">
                  <span>Cloud Architecture & DevOps</span>
                  <span className="text-amber-600">65/100 Deficit</span>
                </div>
                <Progress value={65} variant="amber" size="md" />
              </div>

              {/* Skill 3: GenAI */}
              <div>
                <div className="flex justify-between text-xs font-bold text-govnavy-950 mb-1">
                  <span>Generative AI & LLMs</span>
                  <span className="text-rose-600">77/100 Deficit</span>
                </div>
                <Progress value={77} variant="saffron" size="md" />
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs flex items-center justify-between text-rose-900 font-semibold">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>State Critical Gaps:</span>
                </span>
                <span className="text-sm font-mono font-black text-rose-700">23 Skills</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => navigate('/government/skill-gap')}
              >
                Explore Full Gap Analysis
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Demand Forecast */}
          <Card hoverEffect className="flex flex-col justify-between border-t-4 border-t-saffron-500 border-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50">
              <div className="flex items-center justify-between">
                <Badge variant="saffron" size="sm" dot>
                  Predictive Projections
                </Badge>
                <TrendingUp className="w-4 h-4 text-saffron-500" />
              </div>
              <CardTitle className="mt-2 text-lg">
                12-Month Demand Forecast
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-govnavy-950 block">Generative AI</span>
                  <span className="text-[10px] text-slate-500">Enterprise Adoption</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                  ↗ +72%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-govnavy-950 block">Cloud Computing</span>
                  <span className="text-[10px] text-slate-500">Multi-Cloud Migration</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                  ↗ +41%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-govnavy-950 block">Cybersecurity & SOC</span>
                  <span className="text-[10px] text-slate-500">FinTech & Defense</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                  ↗ +36%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-saffron-50 border border-saffron-200 text-xs flex items-center justify-between text-saffron-900 font-semibold">
                <span>Forecast Horizon:</span>
                <span className="text-sm font-mono font-black text-saffron-800">12 Months (2026-27)</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => navigate('/government/forecast')}
              >
                View Predictive Modeling
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Course Health */}
          <Card hoverEffect className="flex flex-col justify-between border-t-4 border-t-amber-500 border-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50">
              <div className="flex items-center justify-between">
                <Badge variant="amber" size="sm" dot>
                  Curriculum Health Audit
                </Badge>
                <Activity className="w-4 h-4 text-amber-500" />
              </div>
              <CardTitle className="mt-2 text-lg">
                Data Analytics Course Health
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-govnavy-950">
                  <span>Industry Alignment</span>
                  <span className="text-amber-700 font-mono">78% (Lagging)</span>
                </div>
                <Progress value={78} variant="amber" size="md" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Future Demand</span>
                  <span className="font-extrabold text-emerald-700">VERY HIGH</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Placement Rate</span>
                  <span className="font-extrabold text-govnavy-900">74%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between text-amber-900 font-bold">
                <span>Recommendation:</span>
                <span className="text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded uppercase tracking-wider">
                  NEEDS SYLLABUS UPDATE
                </span>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => navigate('/government/course-health')}
              >
                Inspect 84 State Courses
              </Button>
            </CardFooter>
          </Card>

        </div>

      </div>
    </section>
  );
};
