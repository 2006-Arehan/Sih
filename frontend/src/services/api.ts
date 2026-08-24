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

const API_BASE_URL = typeof window !== 'undefined' && window.location.origin.includes('5173')
  ? 'http://localhost:8000/api/v1'
  : '/api/v1';

// Simulated latency helper when fallback is triggered
const simulateDelay = (ms = 150): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

async function fetchFromBackend<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.warn(`[ApiService] API endpoint ${endpoint} unavailable, using mock data fallback:`, error);
    await simulateDelay();
    return fallback;
  }
}

export const ApiService = {
  // District APIs
  async getAllDistricts(): Promise<DistrictData[]> {
    return fetchFromBackend<DistrictData[]>('/districts', MAHARASHTRA_DISTRICTS);
  },

  async getDistrictById(id: string): Promise<DistrictData | undefined> {
    try {
      const districts = await this.getAllDistricts();
      return districts.find(d => d.id === id || d.name.toLowerCase() === id.toLowerCase());
    } catch {
      return MAHARASHTRA_DISTRICTS.find(d => d.id === id || d.name.toLowerCase() === id.toLowerCase());
    }
  },

  async getDistrictsByDivision(division: string): Promise<DistrictData[]> {
    const districts = await this.getAllDistricts();
    return districts.filter(d => d.division === division);
  },

  // Skills & Intelligence APIs
  async getAllSkills(): Promise<SkillItem[]> {
    return fetchFromBackend<SkillItem[]>('/skills', SKILLS_DATA);
  },

  async getEmergingSkills(): Promise<SkillItem[]> {
    return fetchFromBackend<SkillItem[]>('/skills?type=emerging', SKILLS_DATA.filter(s => s.type === 'emerging'));
  },

  async getSkillById(id: string): Promise<SkillItem | undefined> {
    const skills = await this.getAllSkills();
    return skills.find(s => s.id === id);
  },

  // Courses & Curriculum APIs
  async getAllCourses(): Promise<Course[]> {
    return fetchFromBackend<Course[]>('/courses', COURSES_DATA);
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    const courses = await this.getAllCourses();
    return courses.find(c => c.id === id);
  },

  async getCoursesByHealth(status: string): Promise<Course[]> {
    const courses = await this.getAllCourses();
    return courses.filter(c => c.healthStatus === status);
  },

  // Jobs APIs
  async getAllJobs(): Promise<JobPosting[]> {
    return fetchFromBackend<JobPosting[]>('/jobs', JOBS_DATA);
  },

  async getJobById(id: string): Promise<JobPosting | undefined> {
    const jobs = await this.getAllJobs();
    return jobs.find(j => j.id === id);
  },

  async searchJobs(query: string, district?: string, sector?: string): Promise<JobPosting[]> {
    const jobs = await this.getAllJobs();
    return jobs.filter(j => {
      const matchQuery = !query || j.title.toLowerCase().includes(query.toLowerCase()) || j.requiredSkills.some(s => s.toLowerCase().includes(query.toLowerCase()));
      const matchDist = !district || district === 'All' || j.district === district;
      const matchSec = !sector || sector === 'All' || j.sector === sector;
      return matchQuery && matchDist && matchSec;
    });
  },

  // Sectors APIs
  async getAllSectors(): Promise<IndustrySector[]> {
    return fetchFromBackend<IndustrySector[]>('/sectors', SECTORS_DATA);
  },

  // Dashboard & State Analytics APIs
  async getStateImpactStats() {
    return fetchFromBackend('/stats/impact', STATE_IMPACT_STATS);
  },

  async getSectorDemandDistribution() {
    return fetchFromBackend('/stats/sector-demand', SECTOR_DEMAND_DISTRIBUTION);
  },

  async getMonthlyDemandTrend() {
    return fetchFromBackend('/stats/monthly-trend', MONTHLY_DEMAND_TREND);
  },

  async getForecastData() {
    return fetchFromBackend('/stats/forecast', FORECAST_DATASETS);
  },

  async getTrainingPlannerData(): Promise<TrainingPlannerRecord[]> {
    return fetchFromBackend<TrainingPlannerRecord[]>('/planner', TRAINING_PLANNER_DATA);
  },

  async getEmployerFeedback(): Promise<EmployerFeedbackRecord[]> {
    return fetchFromBackend<EmployerFeedbackRecord[]>('/feedback', EMPLOYER_FEEDBACK_DATA);
  },

  async getTopEmployers() {
    return fetchFromBackend('/employers/top', TOP_EMPLOYERS);
  },

  async getReports() {
    return fetchFromBackend('/reports', MOCK_REPORTS);
  },

  // Auth APIs
  async loginUser(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Login failed');
      }
      return await response.json();
    } catch (e) {
      console.warn('[ApiService] Live auth login failed, fallback to mock login:', e);
      return null;
    }
  },

  async registerUser(email: string, password: string, full_name: string, role: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name, role })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Registration failed');
      }
      return await response.json();
    } catch (e) {
      console.warn('[ApiService] Live auth registration failed, fallback to mock register:', e);
      return null;
    }
  }
};

