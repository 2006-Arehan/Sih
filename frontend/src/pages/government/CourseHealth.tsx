import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { CourseTable } from '../../components/tables/CourseTable';
import { COURSES_DATA } from '../../data/courses';
import { Course } from '../../types/course';
import { Card } from '../../components/ui/Card';
import { AlignmentChart } from '../../components/charts/AlignmentChart';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { Activity, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CourseHealth: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <DashboardLayout
      pageTitle="State Course Health & Alignment Scorecard"
      pageSubtitle="Auditing 84+ polytechnic diplomas, engineering degrees, and ITI trades against live industrial competency standards."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/government/curriculum')}
        >
          Curriculum Recommendations
        </Button>
      }
    >
      <div className="space-y-8">
        
        {/* Top Alignment Chart & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-4 p-5 bg-white border-slate-200">
            <h3 className="font-display font-bold text-base text-govnavy-950 mb-1">
              State Syllabus Health Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-3">Overall alignment rating across technical institutions</p>
            <AlignmentChart height={220} />
          </Card>

          <Card className="lg:col-span-8 p-6 bg-white border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-govnavy-950 mb-2">
                Executive Health Assessment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                <strong>78% Average Alignment:</strong> Courses in Computer Science and Automotive Engineering show strong baseline fundamentals but require urgent modular updates in AI tools, cloud data pipelines, and EV high-voltage safety.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Excellent (90%+)</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-mono">28 Courses</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">Good (80-89%)</span>
                  <span className="text-xl font-extrabold text-blue-700 font-mono">35 Courses</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Needs Revamp (&lt;80%)</span>
                  <span className="text-xl font-extrabold text-amber-700 font-mono">21 Courses</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
              <span>Audited by Directorate of Technical Education (DTE)</span>
              <span className="font-semibold text-govnavy-900">Cycle: Fall 2026</span>
            </div>
          </Card>
        </div>

        {/* Detailed Searchable Course Health Table */}
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-govnavy-950">
            Course-by-Course Health Directory
          </h3>
          <CourseTable 
            courses={COURSES_DATA}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        </div>

      </div>

      {/* Course Audit Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.name} (${selectedCourse.code})`}
          subtitle={`${selectedCourse.institute} • ${selectedCourse.district}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Industry Alignment</span>
                <span className="text-2xl font-extrabold text-govnavy-950 font-mono">
                  {selectedCourse.industryAlignmentScore}%
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Placement Rate</span>
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">
                  {selectedCourse.placementRate}%
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Capacity</span>
                <span className="text-2xl font-extrabold text-slate-800 font-mono">
                  {selectedCourse.enrolledStudents}/{selectedCourse.annualCapacity}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Recommended Curriculum Updates
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                {selectedCourse.recommendedCurriculumUpdates.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedCourse(null);
                  navigate('/government/curriculum');
                }}
              >
                Open State Syllabus Revamp Hub
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};
