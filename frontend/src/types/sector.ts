export interface IndustrySector {
  id: string;
  name: string;
  marathiName: string;
  iconName: string;
  imageKey: string;
  growthRate: number; // e.g. +24%
  openJobsCount: number;
  topSkills: string[];
  primaryHubs: string[];
  avgStartingSalary: string;
  projectedNewJobs2026: number;
  description: string;
}
