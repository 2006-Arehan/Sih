import { TrainingPlannerRecord, StateForecastTrend } from '../types/dashboard';

export const STATE_IMPACT_STATS = {
  jobsAnalyzed: 12450,
  skillsIdentified: 3240,
  emergingSkills: 187,
  employersConnected: 2146,
  districtsCovered: 36,
  courseAlignmentRate: 78,
  activeTrainees: 184500,
  annualPlacements: 142800,
};

export const SECTOR_DEMAND_DISTRIBUTION = [
  { name: 'IT & Telecom', value: 32, jobs: 3980, color: '#000080' },
  { name: 'Automotive & EV', value: 24, jobs: 2980, color: '#FF9933' },
  { name: 'Manufacturing', value: 21, jobs: 2650, color: '#138808' },
  { name: 'Finance & FinTech', value: 19, jobs: 2420, color: '#3461B5' },
  { name: 'Healthcare & Pharma', value: 15, jobs: 1840, color: '#EA580C' },
  { name: 'Logistics & Ports', value: 14, jobs: 1680, color: '#0F6906' },
  { name: 'Renewable Energy', value: 9, jobs: 1120, color: '#F59E0B' },
  { name: 'Textiles & Apparel', value: 10, jobs: 1250, color: '#8B5CF6' }
];

export const MONTHLY_DEMAND_TREND = [
  { month: 'Sep 2025', jobs: 9200, trainingSeats: 8800, gap: 400 },
  { month: 'Oct 2025', jobs: 9800, trainingSeats: 9000, gap: 800 },
  { month: 'Nov 2025', jobs: 10400, trainingSeats: 9200, gap: 1200 },
  { month: 'Dec 2025', jobs: 10900, trainingSeats: 9400, gap: 1500 },
  { month: 'Jan 2026', jobs: 11600, trainingSeats: 9800, gap: 1800 },
  { month: 'Feb 2026', jobs: 12100, trainingSeats: 10100, gap: 2000 },
  { month: 'Mar 2026', jobs: 12450, trainingSeats: 10350, gap: 2100 }
];

export const FORECAST_DATASETS: StateForecastTrend[] = [
  {
    period: '3-Month',
    techAIGrowth: 28,
    manufacturingEVGrowth: 22,
    renewableEnergyGrowth: 18,
    healthcarePharmaGrowth: 12,
    logisticsGrowth: 16
  },
  {
    period: '6-Month',
    techAIGrowth: 52,
    manufacturingEVGrowth: 41,
    renewableEnergyGrowth: 34,
    healthcarePharmaGrowth: 21,
    logisticsGrowth: 28
  },
  {
    period: '12-Month',
    techAIGrowth: 78,
    manufacturingEVGrowth: 64,
    renewableEnergyGrowth: 49,
    healthcarePharmaGrowth: 31,
    logisticsGrowth: 42
  }
];

export const TRAINING_PLANNER_DATA: TrainingPlannerRecord[] = [
  {
    id: 'plan-1',
    district: 'Pune',
    division: 'Pune',
    sector: 'Automotive & EV',
    skill: 'EV Battery Management & High Voltage Safety',
    currentSeats: 480,
    industryDemand: 1250,
    seatGap: -770,
    recommendedSeats: 1200,
    priority: 'Critical',
    actionProposed: 'Sanction 12 new EV laboratory batches across 4 Government ITIs and Polytechnics in Chakan corridor.'
  },
  {
    id: 'plan-2',
    district: 'Mumbai Suburban',
    division: 'Konkan',
    sector: 'IT & Telecommunications',
    skill: 'Generative AI & Enterprise Cloud Architecture',
    currentSeats: 620,
    industryDemand: 1640,
    seatGap: -1020,
    recommendedSeats: 1600,
    priority: 'Critical',
    actionProposed: 'Upgrade MSBTE Computer & IT curriculum; fund high-performance GPU labs at VJTI and Government Polytechnic Mumbai.'
  },
  {
    id: 'plan-3',
    district: 'Nagpur',
    division: 'Nagpur',
    sector: 'Logistics, Port & Supply Chain',
    skill: 'Automated Warehouse Systems & Air Cargo Logistics',
    currentSeats: 350,
    industryDemand: 780,
    seatGap: -430,
    recommendedSeats: 750,
    priority: 'High',
    actionProposed: 'Partner with MIHAN logistics operators to establish specialized dry port simulator center.'
  },
  {
    id: 'plan-4',
    district: 'Satara',
    division: 'Pune',
    sector: 'Renewable Energy & CleanTech',
    skill: 'Solar PV String Inverter O&M & BESS Systems',
    currentSeats: 220,
    industryDemand: 520,
    seatGap: -300,
    recommendedSeats: 500,
    priority: 'High',
    actionProposed: 'Establish dedicated CleanTech training center in Koregaon with live rooftop and ground-mount test installations.'
  },
  {
    id: 'plan-5',
    district: 'Chhatrapati Sambhajinagar',
    division: 'Chhatrapati Sambhajinagar',
    sector: 'Manufacturing & Precision Engineering',
    skill: 'Industrial Robotics & Mechatronics (Industry 4.0)',
    currentSeats: 380,
    industryDemand: 690,
    seatGap: -310,
    recommendedSeats: 650,
    priority: 'High',
    actionProposed: 'Integrate AURIC Shendra industrial apprenticeships with polytechnic diploma final year.'
  },
  {
    id: 'plan-6',
    district: 'Kolhapur',
    division: 'Pune',
    sector: 'Manufacturing & Precision Engineering',
    skill: '5-Axis CNC Programming & Tooling Design',
    currentSeats: 410,
    industryDemand: 590,
    seatGap: -180,
    recommendedSeats: 580,
    priority: 'Medium',
    actionProposed: 'Procure 8 modern VMC simulator units for ITI Shiroli and Gokul Shirgaon.'
  },
  {
    id: 'plan-7',
    district: 'Amravati',
    division: 'Amravati',
    sector: 'Textiles & Apparel',
    skill: 'Automated Garment Pattern CAD & Technical Fabrics',
    currentSeats: 320,
    industryDemand: 460,
    seatGap: -140,
    recommendedSeats: 450,
    priority: 'Medium',
    actionProposed: 'Upgrade Nandgaon Peth Textile Training Institute with computerized apparel grading software.'
  },
  {
    id: 'plan-8',
    district: 'Nandurbar',
    division: 'Nashik',
    sector: 'Renewable Energy',
    skill: 'Wind Turbine Mechanical Inspection & Safety',
    currentSeats: 80,
    industryDemand: 210,
    seatGap: -130,
    recommendedSeats: 200,
    priority: 'High',
    actionProposed: 'Launch tribal youth wind energy vocational cohort with guaranteed stipend and state hostel accommodation.'
  }
];

export const MOCK_REPORTS = [
  {
    id: 'rep-1',
    title: 'Maharashtra State Skill Trends & Future of Work 2026',
    category: 'State Overview',
    publishDate: 'August 2026',
    author: 'Department of Skills, Employment & Innovation',
    fileSize: '4.8 MB',
    pages: 64,
    description: 'Comprehensive analysis of 12,450+ job openings, macro economic shifts, and district-level workforce readiness across Maharashtra.',
    tags: ['Policy', 'State Overview', 'Emerging Tech']
  },
  {
    id: 'rep-2',
    title: 'Automotive & EV Sector Talent Blueprint: Pune-Chakan Corridor',
    category: 'Sector Deep Dive',
    publishDate: 'July 2026',
    author: 'Maharashtra State Skill Development Mission & SIAM',
    fileSize: '3.2 MB',
    pages: 42,
    description: 'Detailed roadmap for training 30,000+ EV technicians, battery engineers, and embedded electronics operators by 2028.',
    tags: ['Automotive', 'Electric Vehicles', 'Chakan']
  },
  {
    id: 'rep-3',
    title: 'District Skill Gap & Industrial Alignment Index (36 Districts)',
    category: 'District Intelligence',
    publishDate: 'June 2026',
    author: 'State Labour Market Intelligence Unit',
    fileSize: '6.1 MB',
    pages: 98,
    description: 'Granular assessment of seat capacity vs industrial hiring demand across all 36 administrative districts in 6 divisions.',
    tags: ['Districts', 'Gap Analysis', 'Capacity Planning']
  },
  {
    id: 'rep-4',
    title: 'Curriculum Modernization Framework for MSBTE Polytechnics',
    category: 'Curriculum & Education',
    publishDate: 'May 2026',
    author: 'Directorate of Technical Education (DTE)',
    fileSize: '2.9 MB',
    pages: 36,
    description: 'Actionable guidelines to replace legacy syllabus modules with AI, Cloud, Robotics, and Green Hydrogen competencies.',
    tags: ['Polytechnic', 'MSBTE', 'Curriculum']
  }
];
