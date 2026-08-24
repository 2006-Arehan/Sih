export interface TrainingPlannerRecord {
  id: string;
  district: string;
  division: string;
  sector: string;
  skill: string;
  currentSeats: number;
  industryDemand: number;
  seatGap: number;
  recommendedSeats: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  actionProposed: string;
}

export interface StateForecastTrend {
  period: '3-Month' | '6-Month' | '12-Month';
  techAIGrowth: number;
  manufacturingEVGrowth: number;
  renewableEnergyGrowth: number;
  healthcarePharmaGrowth: number;
  logisticsGrowth: number;
}

export interface EmployerFeedbackRecord {
  id: string;
  employerName: string;
  sector: string;
  instituteGraduated: string;
  courseEvaluated: string;
  technicalCompetenceRating: number; // 1-5
  practicalReadinessRating: number; // 1-5
  workEthicSoftSkillsRating: number; // 1-5
  topMissingSkillsReported: string[];
  feedbackNotes: string;
  dateSubmitted: string;
}
