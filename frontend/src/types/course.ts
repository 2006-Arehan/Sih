export type CourseHealthStatus = 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical';

export interface Course {
  id: string;
  name: string;
  code: string;
  institute: string;
  instituteType: 'Government Polytechnic' | 'Engineering College' | 'ITI' | 'State University' | 'Private Institute';
  district: string;
  level: 'Diploma' | 'Undergraduate' | 'Certificate' | 'ITI Trade' | 'Postgraduate';
  durationMonths: number;
  industryAlignmentScore: number; // 0-100 percentage (e.g. 78)
  industryDemand: 'High' | 'Very High' | 'Medium' | 'Low';
  futureDemandScore: number; // 0-100
  placementRate: number; // e.g. 74 (%)
  annualCapacity: number;
  enrolledStudents: number;
  healthStatus: CourseHealthStatus;
  coveredSkills: string[];
  missingSkills: string[];
  emergingSkillsToIntegrate: string[];
  recommendedCurriculumUpdates: string[];
  lastSyllabusRevisionYear: number;
}
