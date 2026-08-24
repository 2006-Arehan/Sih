import { EmployerFeedbackRecord } from '../types/dashboard';

export interface EmployerProfile {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  locationsInMaharashtra: string[];
  activeJobOpenings: number;
  totalHiredThroughPlatform: number;
  partnershipTier: 'Strategic State Partner' | 'Enterprise Member' | 'SME Member';
  verifiedStatus: boolean;
}

export const TOP_EMPLOYERS: EmployerProfile[] = [
  {
    id: 'emp-1',
    name: 'Tata Motors & Tata AutoComp',
    industry: 'Automotive & EV',
    headquarters: 'Pune',
    locationsInMaharashtra: ['Pune (Pimpri & Chakan)', 'Mumbai', 'Satara'],
    activeJobOpenings: 320,
    totalHiredThroughPlatform: 1450,
    partnershipTier: 'Strategic State Partner',
    verifiedStatus: true
  },
  {
    id: 'emp-2',
    name: 'Mahindra & Mahindra Ltd',
    industry: 'Automotive & Manufacturing',
    headquarters: 'Mumbai',
    locationsInMaharashtra: ['Mumbai (Kandivali)', 'Nashik (Satpur)', 'Pune (Chakan)', 'Nagpur'],
    activeJobOpenings: 280,
    totalHiredThroughPlatform: 1210,
    partnershipTier: 'Strategic State Partner',
    verifiedStatus: true
  },
  {
    id: 'emp-3',
    name: 'Infosys & Tech Mahindra',
    industry: 'IT & Telecommunications',
    headquarters: 'Pune',
    locationsInMaharashtra: ['Pune (Hinjawadi)', 'Nagpur (MIHAN)', 'Mumbai'],
    activeJobOpenings: 650,
    totalHiredThroughPlatform: 3100,
    partnershipTier: 'Strategic State Partner',
    verifiedStatus: true
  },
  {
    id: 'emp-4',
    name: 'Lupin & Cipla Pharmaceuticals',
    industry: 'Healthcare & Biotech',
    headquarters: 'Mumbai',
    locationsInMaharashtra: ['Mumbai', 'Thane', 'Chhatrapati Sambhajinagar', 'Kurkumbh'],
    activeJobOpenings: 190,
    totalHiredThroughPlatform: 840,
    partnershipTier: 'Enterprise Member',
    verifiedStatus: true
  },
  {
    id: 'emp-5',
    name: 'Waaree Energies & Suzlon Green Tech',
    industry: 'Renewable Energy',
    headquarters: 'Mumbai',
    locationsInMaharashtra: ['Satara', 'Dhule', 'Solapur', 'Pune'],
    activeJobOpenings: 140,
    totalHiredThroughPlatform: 620,
    partnershipTier: 'Enterprise Member',
    verifiedStatus: true
  }
];

export const EMPLOYER_FEEDBACK_DATA: EmployerFeedbackRecord[] = [
  {
    id: 'fb-1',
    employerName: 'Tata AutoComp Systems Ltd',
    sector: 'Automotive & EV',
    instituteGraduated: 'Government Polytechnic, Pune',
    courseEvaluated: 'Diploma in Mechatronics & EV Systems',
    technicalCompetenceRating: 4.2,
    practicalReadinessRating: 3.6,
    workEthicSoftSkillsRating: 4.5,
    topMissingSkillsReported: ['High-voltage safety protocols', 'CAN bus live network troubleshooting'],
    feedbackNotes: 'Candidates are very strong on basic mechanical principles, but need deeper practical bench hours on live 400V+ EV architectures before deployable on the shopfloor.',
    dateSubmitted: '2026-08-10'
  },
  {
    id: 'fb-2',
    employerName: 'LTIMindtree Tech Hub',
    sector: 'IT & Telecommunications',
    instituteGraduated: 'VJTI, Mumbai',
    courseEvaluated: 'B.Tech Information Technology',
    technicalCompetenceRating: 4.8,
    practicalReadinessRating: 4.6,
    workEthicSoftSkillsRating: 4.7,
    topMissingSkillsReported: ['Vector embeddings & RAG architectures', 'Kubernetes Helm charting'],
    feedbackNotes: 'Excellent analytical aptitude. Graduates adapted to cloud pipelines within 2 weeks of onboarding.',
    dateSubmitted: '2026-08-14'
  },
  {
    id: 'fb-3',
    employerName: 'Kirloskar Oil Engines Ltd',
    sector: 'Manufacturing & Precision Engineering',
    instituteGraduated: 'Government ITI, Kolhapur',
    courseEvaluated: 'Machinist & CNC Programmer Trade',
    technicalCompetenceRating: 4.4,
    practicalReadinessRating: 4.2,
    workEthicSoftSkillsRating: 4.3,
    topMissingSkillsReported: ['5-axis toolpath optimization', 'CMM automated probe calibration'],
    feedbackNotes: 'Shop-floor discipline and GD&T blueprint comprehension are very commendable. Recommend updating lathe controllers to modern touch consoles.',
    dateSubmitted: '2026-08-18'
  },
  {
    id: 'fb-4',
    employerName: 'Lupin R&D Laboratories',
    sector: 'Healthcare & Biotech',
    instituteGraduated: 'Government College of Pharmacy, Chhatrapati Sambhajinagar',
    courseEvaluated: 'B.Pharm with Analytical Chemistry',
    technicalCompetenceRating: 4.1,
    practicalReadinessRating: 3.8,
    workEthicSoftSkillsRating: 4.4,
    topMissingSkillsReported: ['LIMS software workflow', 'USFDA 21 CFR Part 11 electronic records'],
    feedbackNotes: 'Good conceptual knowledge of HPLC assays. Practical training in digital laboratory audit trails would make candidates 100% Day-1 billable.',
    dateSubmitted: '2026-08-20'
  }
];
