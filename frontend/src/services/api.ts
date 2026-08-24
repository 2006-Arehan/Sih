/**
 * Mock API Service Layer for SkillPulse Maharashtra
 * Provides asynchronous data access interfaces matching standard REST/GraphQL contracts,
 * enabling seamless swap with real backend services in future phases.
 */

import { MAHARASHTRA_DISTRICTS } from '../data/districts';
import { SKILLS_DATA } from '../data/skills';
import { COURSES_DATA } from '../data/courses';
import { JOBS_DATA } from '../data/jobs';
import { SECTORS_DATA } from '../data/sectors';
import { TOP_EMPLOYERS, EMPLOYER_FEEDBACK_DATA } from '../data/employers';
import { STATE_IMPACT_STATS, SECTOR_DEMAND_DISTRIBUTION, MONTHLY_DEMAND_TREND, FORECAST_DATASETS, TRAINING_PLANNER_DATA, MOCK_REPORTS } from '../data/dashboard';

import { DistrictData } from '../types/district';
import { SkillItem } from '../types/skill';
import { Course } from '../types/course';
import { JobPosting } from '../types/job';
import { IndustrySector } from '../types/sector';
import { TrainingPlannerRecord, EmployerFeedbackRecord } from '../types/dashboard';

// Simulated latency helper
const simulateDelay = (ms = 150): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  // District APIs
  async getAllDistricts(): Promise<DistrictData[]> {
    await simulateDelay();
    return [...MAHARASHTRA_DISTRICTS];
  },

  async getDistrictById(id: string): Promise<DistrictData | undefined> {
    await simulateDelay();
    return MAHARASHTRA_DISTRICTS.find(d => d.id === id || d.name.toLowerCase() === id.toLowerCase());
  },

  async getDistrictsByDivision(division: string): Promise<DistrictData[]> {
    await simulateDelay();
    return MAHARASHTRA_DISTRICTS.filter(d => d.division === division);
  },

  // Skills & Intelligence APIs
  async getAllSkills(): Promise<SkillItem[]> {
    await simulateDelay();
    return [...SKILLS_DATA];
  },

  async getEmergingSkills(): Promise<SkillItem[]> {
    await simulateDelay();
    return SKILLS_DATA.filter(s => s.type === 'emerging');
  },

  async getSkillById(id: string): Promise<SkillItem | undefined> {
    await simulateDelay();
    return SKILLS_DATA.find(s => s.id === id);
  },

  // Courses & Curriculum APIs
  async getAllCourses(): Promise<Course[]> {
    await simulateDelay();
    return [...COURSES_DATA];
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    await simulateDelay();
    return COURSES_DATA.find(c => c.id === id);
  },

  async getCoursesByHealth(status: string): Promise<Course[]> {
    await simulateDelay();
    return COURSES_DATA.filter(c => c.healthStatus === status);
  },

  // Jobs APIs
  async getAllJobs(): Promise<JobPosting[]> {
    await simulateDelay();
    return [...JOBS_DATA];
  },

  async getJobById(id: string): Promise<JobPosting | undefined> {
    await simulateDelay();
    return JOBS_DATA.find(j => j.id === id);
  },

  async searchJobs(query: string, district?: string, sector?: string): Promise<JobPosting[]> {
    await simulateDelay();
    return JOBS_DATA.filter(j => {
      const matchQuery = !query || j.title.toLowerCase().includes(query.toLowerCase()) || j.requiredSkills.some(s => s.toLowerCase().includes(query.toLowerCase()));
      const matchDist = !district || district === 'All' || j.district === district;
      const matchSec = !sector || sector === 'All' || j.sector === sector;
      return matchQuery && matchDist && matchSec;
    });
  },

  // Sectors APIs
  async getAllSectors(): Promise<IndustrySector[]> {
    await simulateDelay();
    return [...SECTORS_DATA];
  },

  // Dashboard & State Analytics APIs
  async getStateImpactStats() {
    await simulateDelay();
    return { ...STATE_IMPACT_STATS };
  },

  async getSectorDemandDistribution() {
    await simulateDelay();
    return [...SECTOR_DEMAND_DISTRIBUTION];
  },

  async getMonthlyDemandTrend() {
    await simulateDelay();
    return [...MONTHLY_DEMAND_TREND];
  },

  async getForecastData() {
    await simulateDelay();
    return [...FORECAST_DATASETS];
  },

  async getTrainingPlannerData(): Promise<TrainingPlannerRecord[]> {
    await simulateDelay();
    return [...TRAINING_PLANNER_DATA];
  },

  async getEmployerFeedback(): Promise<EmployerFeedbackRecord[]> {
    await simulateDelay();
    return [...EMPLOYER_FEEDBACK_DATA];
  },

  async getTopEmployers() {
    await simulateDelay();
    return [...TOP_EMPLOYERS];
  },

  async getReports() {
    await simulateDelay();
    return [...MOCK_REPORTS];
  }
};
