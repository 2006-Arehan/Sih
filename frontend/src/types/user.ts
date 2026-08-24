export type UserRole = 'government' | 'institute' | 'employer' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation?: string;
  organization?: string;
  district?: string;
  avatarUrl?: string;
  // Student specific
  currentEducation?: string;
  targetRole?: string;
  careerReadinessScore?: number;
  acquiredSkills?: string[];
  inProgressSkills?: string[];
}
