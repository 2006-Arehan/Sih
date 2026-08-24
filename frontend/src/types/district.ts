export type DivisionName = 
  | 'Konkan' 
  | 'Pune' 
  | 'Nashik' 
  | 'Chhatrapati Sambhajinagar' 
  | 'Amravati' 
  | 'Nagpur';

export interface DistrictData {
  id: string;
  name: string;
  marathiName: string;
  division: DivisionName;
  demandScore: number; // 0-100
  totalJobs: number;
  topSkills: string[];
  skillGap: 'Low' | 'Medium' | 'High' | 'Critical';
  trainingCapacity: number; // Seats available
  trainingCapacityLevel: 'Low' | 'Medium' | 'High';
  placementRate: number; // Percentage (e.g. 78)
  topSectors: string[];
  activeInstitutes: number;
  activeEmployers: number;
  unmetDemand: number;
  coordinates: [number, number]; // [lat, lng] for Maharashtra map
  description: string;
}
