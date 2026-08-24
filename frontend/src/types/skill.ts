export type SkillCategory = 
  | 'Technology & AI' 
  | 'Manufacturing & Robotics' 
  | 'Healthcare & Biotech' 
  | 'Automotive & EV' 
  | 'Renewable Energy' 
  | 'Logistics & Supply Chain' 
  | 'Finance & FinTech' 
  | 'Core Engineering' 
  | 'Soft Skills & Leadership';

export type SkillType = 'emerging' | 'core' | 'specialized' | 'declining';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  type: SkillType;
  growthPercent: number; // e.g., +72%
  demandVolume: number; // Total postings mentioning this
  currentSupply: number; // Trained students
  gapIndex: number; // 0-100 (higher = worse gap)
  momentum: 'Very High' | 'High' | 'Moderate' | 'Steady';
  forecast12m: number; // projected growth %
  primarySectors: string[];
  topDistricts: string[];
  relatedCourses: string[];
  avgSalaryGrowth: number; // e.g. 24 (%)
  description: string;
}
