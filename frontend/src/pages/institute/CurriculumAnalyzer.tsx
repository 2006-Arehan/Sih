import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { COURSES_DATA } from '../../data/courses';
import { Course } from '../../types/course';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Sparkles, Check, X, ArrowRight, Download, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

export const CurriculumAnalyzer: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES_DATA[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCourse, setAnalyzedCourse] = useState<Course>(COURSES_DATA[0]);

  const courseOptions = COURSES_DATA.map(c => ({
    value: c.id,
    label: `${c.name} (${c.code})`
  }));

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const found = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
      setAnalyzedCourse(found);
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <DashboardLayout
      pageTitle="AI Curriculum Alignment Analyzer"
      pageSubtitle="Compare your polytechnic syllabus directly against live Maharashtra employer skill requirements to diagnose missing modules."
      actions={
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert(`Exporting MSBTE Board Proposal for ${analyzedCourse.name}`)}
        >
          Export Board Proposal
        </Button>
      }
    >
      <div className="space-y-8">
        
        {/* Selector & Action Bar */}
        <Card className="p-6 bg-white border-slate-200 shadow-gov">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-8">
              <Select
                label="Select Course to Audit"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                options={courseOptions}
              />
            </div>
            <div className="md:col-span-4">
              <Button
                variant="primary"
                size="md"
                isLoading={isAnalyzing}
                className="w-full justify-center shadow-md font-bold"
                leftIcon={<Sparkles className="w-4 h-4" />}
                onClick={handleRunAnalysis}
              >
                Run AI Alignment Audit
              </Button>
            </div>
          </div>
        </Card>

        {/* Alignment Scorecard Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-gov space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-slate-400">{analyzedCourse.code}</span>
                <Badge variant={analyzedCourse.industryAlignmentScore >= 85 ? 'green' : 'amber'} size="sm" dot>
                  {analyzedCourse.healthStatus}
                </Badge>
              </div>
              <h3 className="font-display text-2xl font-bold text-govnavy-950">
                {analyzedCourse.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {analyzedCourse.institute} • {analyzedCourse.district} • Level: {analyzedCourse.level}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 sm:text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Calculated Industry Alignment Score
              </span>
              <span className="text-3xl font-extrabold font-mono text-govnavy-950">
                {analyzedCourse.industryAlignmentScore}%
              </span>
              <div className="w-32 mt-1 sm:ml-auto">
                <Progress 
                  value={analyzedCourse.industryAlignmentScore} 
                  variant={analyzedCourse.industryAlignmentScore >= 85 ? 'green' : 'saffron'} 
                  size="sm" 
                />
              </div>
            </div>
          </div>

          {/* 2-Column Comparison: Current vs Industry Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Current Syllabus */}
            <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-emerald-950">
                    Current Syllabus Topics ({analyzedCourse.coveredSkills.length})
                  </h4>
                  <p className="text-[10px] text-emerald-800">Verified present in existing syllabus</p>
                </div>
              </div>

              <div className="space-y-2">
                {analyzedCourse.coveredSkills.map((sk) => (
                  <div key={sk} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-emerald-100 text-xs font-semibold text-slate-800 shadow-2xs">
                    <span>{sk}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Taught</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Industry Skills */}
            <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-rose-950">
                    Missing Industry Demands ({analyzedCourse.missingSkills.length})
                  </h4>
                  <p className="text-[10px] text-rose-800">Required by employers but absent from syllabus</p>
                </div>
              </div>

              <div className="space-y-2">
                {analyzedCourse.missingSkills.map((sk) => (
                  <div key={sk} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-rose-100 text-xs font-semibold text-slate-800 shadow-2xs">
                    <span>{sk}</span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Gap</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Emerging Skills To Integrate */}
          <div className="p-4 rounded-xl bg-saffron-50/60 border border-saffron-200">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-900 block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-saffron-600" />
              <span>Recommended Emerging Additions (Future-Proofing for 2026-28)</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {analyzedCourse.emergingSkillsToIntegrate.map((em) => (
                <span key={em} className="text-xs bg-white text-saffron-900 border border-saffron-300 font-semibold px-3 py-1 rounded-lg shadow-2xs">
                  + {em}
                </span>
              ))}
            </div>
          </div>

          {/* Actionable Update Plan */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-display font-bold text-sm text-govnavy-950">
              Proposed Syllabus Revision Steps (MSBTE Board Submission)
            </h4>
            <div className="space-y-2">
              {analyzedCourse.recommendedCurriculumUpdates.map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200/80">
                  <span className="w-5 h-5 rounded-full bg-govnavy-900 text-white font-mono text-[10px] flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
