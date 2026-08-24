import { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/user';

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  government: {
    id: 'usr-gov-01',
    name: 'Dr. Rajesh Deshmukh, IAS',
    email: 'commissioner.skill@maharashtra.gov.in',
    role: 'government',
    designation: 'State Skill Development Commissioner',
    organization: 'Skill, Employment, Entrepreneurship & Innovation Dept.',
    district: 'Mumbai City',
  },
  institute: {
    id: 'usr-inst-01',
    name: 'Prof. Anjali Kulkarni',
    email: 'principal@gppune.ac.in',
    role: 'institute',
    designation: 'Principal & MSBTE Board Member',
    organization: 'Government Polytechnic, Pune',
    district: 'Pune',
  },
  employer: {
    id: 'usr-emp-01',
    name: 'Vikram Joshi',
    email: 'vikram.joshi@tataautocomp.com',
    role: 'employer',
    designation: 'Head of Talent Acquisition & Technical Hiring',
    organization: 'Tata AutoComp Systems Ltd',
    district: 'Pune',
  },
  student: {
    id: 'usr-stud-01',
    name: 'Pooja Patil',
    email: 'pooja.patil2026@student.msbte.edu.in',
    role: 'student',
    designation: 'Diploma Candidate (Final Year)',
    organization: 'Government Polytechnic, Pune',
    district: 'Pune',
    currentEducation: 'Diploma in Computer Technology',
    targetRole: 'Junior Data Analyst',
    careerReadinessScore: 68,
    acquiredSkills: ['Python Basics', 'SQL Databases', 'Power BI Dashboards', 'Excel Modeling'],
    inProgressSkills: ['Machine Learning', 'Generative AI Applications', 'Cloud Data Warehousing']
  }
};

const AUTH_STORAGE_KEY = 'skillpulse_auth_user';

export function getStoredUser(): UserProfile {
  const saved = localStorage.getItem(AUTH_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return PRESET_USERS.student; // Default to student role
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(getStoredUser());

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  const switchRole = (role: UserRole) => {
    const user = PRESET_USERS[role];
    setCurrentUser(user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  };

  const loginWithRole = (role: UserRole, customName?: string, customEmail?: string) => {
    const base = PRESET_USERS[role];
    const updated: UserProfile = {
      ...base,
      name: customName || base.name,
      email: customEmail || base.email,
    };
    setCurrentUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  };

  const logout = () => {
    const defaultUser = PRESET_USERS.student;
    setCurrentUser(defaultUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser));
  };

  return {
    user: currentUser,
    switchRole,
    loginWithRole,
    logout,
    isAuthenticated: true, // Always true for interactive prototype
  };
}
