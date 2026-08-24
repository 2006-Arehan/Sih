import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { CourseTable } from '../../components/tables/CourseTable';
import { COURSES_DATA } from '../../data/courses';
import { Course } from '../../types/course';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { PlusCircle, Compass, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InstituteCourses: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <DashboardLayout
      pageTitle="Polytechnic & ITI Course Catalog"
      pageSubtitle="Monitor course-level health alignment, enrollment capacity, and syllabus revision cycles."
      actions={
        <Button
          variant="primary"
          size="sm"
          rightIcon={<Compass className="w-4 h-4" />}
          onClick={() => navigate('/institute/curriculum')}
        >
          Analyze Course Curriculum
        </Button>
      }
    >
      <div className="space-y-6">
        <CourseTable
          courses={COURSES_DATA}
          onSelectCourse={(course) => setSelectedCourse(course)}
        />
      </div>

      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={selectedCourse.name}
          subtitle={`${selectedCourse.code} • ${selectedCourse.institute}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Covered Topics:</span>
              <div className="flex flex-wrap gap-1">
                {selectedCourse.coveredSkills.map(s => (
                  <span key={s} className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-[10px] uppercase font-bold text-rose-700 block mb-1">Missing Topics:</span>
              <div className="flex flex-wrap gap-1">
                {selectedCourse.missingSkills.map(s => (
                  <span key={s} className="bg-white text-rose-800 px-2 py-0.5 rounded border border-rose-200 font-medium">{s}</span>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setSelectedCourse(null);
                navigate('/institute/curriculum');
              }}
            >
              Run Full AI Curriculum Analyzer
            </Button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};
