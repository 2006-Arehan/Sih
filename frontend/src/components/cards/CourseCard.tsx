import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Course } from '../../types/course';
import { Building, MapPin, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface CourseCardProps {
  course: Course;
  onAnalyze?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onAnalyze }) => {
  const statusBadgeVariant = 
    course.healthStatus === 'Excellent' ? 'green' :
    course.healthStatus === 'Good' ? 'navy' :
    course.healthStatus === 'Needs Improvement' ? 'amber' : 'red';

  return (
    <Card hoverEffect className="p-5 flex flex-col justify-between border-slate-200">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant={statusBadgeVariant} size="sm" dot>
            {course.healthStatus}
          </Badge>
          <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {course.code}
          </span>
        </div>

        <h3 className="font-display text-base font-bold text-govnavy-950 mb-1 line-clamp-1">
          {course.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{course.institute}</span>
        </div>

        {/* Alignment Score Meter */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-semibold text-slate-700">Industry Alignment</span>
            <span className="font-extrabold text-govnavy-900">{course.industryAlignmentScore}%</span>
          </div>
          <Progress 
            value={course.industryAlignmentScore} 
            variant={course.industryAlignmentScore >= 85 ? 'green' : course.industryAlignmentScore >= 75 ? 'saffron' : 'amber'} 
            size="sm" 
          />
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Placement: <strong>{course.placementRate}%</strong></span>
            <span>Enrolled: <strong>{course.enrolledStudents}/{course.annualCapacity}</strong></span>
          </div>
        </div>

        {/* Missing Skills Warning */}
        {course.missingSkills.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3" />
              Missing High-Demand Skills ({course.missingSkills.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {course.missingSkills.slice(0, 2).map((sk) => (
                <span key={sk} className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
                  {sk}
                </span>
              ))}
              {course.missingSkills.length > 2 && (
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  +{course.missingSkills.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>{course.district}</span>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          rightIcon={<ArrowRight className="w-3 h-3" />}
          onClick={onAnalyze}
          className="text-xs py-1 px-2.5 h-7"
        >
          Curriculum Diff
        </Button>
      </div>
    </Card>
  );
};
