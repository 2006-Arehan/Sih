export interface JobPosting {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  sector: string;
  district: string;
  locationDetails: string;
  experienceLevel: 'Entry Level (0-2 yrs)' | 'Mid Level (2-5 yrs)' | 'Senior Level (5+ yrs)';
  minExperienceYears: number;
  salaryRange: string;
  openPositions: number;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  educationRequirement: string;
  employmentType: 'Full-time' | 'Apprenticeship' | 'Contract' | 'Internship';
  postedDate: string;
  deadline: string;
  hiringUrgency: 'Immediate' | 'Standard' | 'Upcoming Quarter';
  description: string;
  responsibilities: string[];
  matchScore?: number; // Calculated dynamically for students
}
