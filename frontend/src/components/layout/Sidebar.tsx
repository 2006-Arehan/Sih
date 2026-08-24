import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Layers, 
  TrendingUp, 
  LineChart, 
  Activity, 
  BookOpen, 
  CalendarCheck, 
  FileText, 
  Compass, 
  Sparkles, 
  Users, 
  Briefcase, 
  PlusCircle, 
  Award, 
  HelpCircle, 
  ClipboardList, 
  User, 
  Target, 
  BookCheck, 
  Search
} from 'lucide-react';
import { UserRole } from '../../types/user';

export interface SidebarProps {
  role: UserRole;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  isMobile = false,
  onCloseMobile
}) => {
  const location = useLocation();

  // Route configurations tailored for all 4 roles
  const governmentNav = [
    { name: 'Overview', path: '/government/dashboard', icon: LayoutDashboard },
    { name: 'Maharashtra Skill Map', path: '/government/map', icon: Map, badge: 'Live' },
    { name: 'District Analysis', path: '/government/districts', icon: BarChart3 },
    { name: 'Industry Demand', path: '/government/industry-demand', icon: Layers },
    { name: 'Skill Gap Analysis', path: '/government/skill-gap', icon: Activity },
    { name: 'Emerging Skills', path: '/government/emerging-skills', icon: Sparkles },
    { name: 'Demand Forecast', path: '/government/forecast', icon: LineChart },
    { name: 'Course Health', path: '/government/course-health', icon: Activity },
    { name: 'Curriculum Revamp', path: '/government/curriculum', icon: BookOpen },
    { name: 'Training Planner', path: '/government/training-planner', icon: CalendarCheck, badge: 'Policy' },
    { name: 'State Reports', path: '/government/reports', icon: FileText },
  ];

  const instituteNav = [
    { name: 'Overview', path: '/institute/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', path: '/institute/courses', icon: BookOpen },
    { name: 'Curriculum Analyzer', path: '/institute/curriculum', icon: Compass, badge: 'AI Tool' },
    { name: 'Industry Alignment', path: '/institute/alignment', icon: Target },
    { name: 'Missing Skills', path: '/institute/missing-skills', icon: Layers },
    { name: 'Recommendations', path: '/institute/recommendations', icon: Sparkles },
    { name: 'Placement Analytics', path: '/institute/placement', icon: BarChart3 },
    { name: 'Employer Feedback', path: '/institute/feedback', icon: Users },
  ];

  const employerNav = [
    { name: 'Overview', path: '/employer/dashboard', icon: LayoutDashboard },
    { name: 'Post Job', path: '/employer/post-job', icon: PlusCircle, badge: 'Wizard' },
    { name: 'My Job Postings', path: '/employer/jobs', icon: Briefcase },
    { name: 'Required Skills', path: '/employer/skills', icon: Target },
    { name: 'Hiring Demand', path: '/employer/hiring-demand', icon: TrendingUp },
    { name: 'Candidate Feedback', path: '/employer/feedback', icon: ClipboardList },
    { name: 'Training Survey', path: '/employer/training-survey', icon: HelpCircle },
  ];

  const studentNav = [
    { name: 'Overview', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Skill Assessment', path: '/student/assessment', icon: BookCheck, badge: 'Quiz' },
    { name: 'My Skills', path: '/student/skills', icon: Award },
    { name: 'Skill Gap', path: '/student/skill-gap', icon: Activity },
    { name: 'Career Path', path: '/student/career-path', icon: Compass },
    { name: 'Course Recommendations', path: '/student/recommendations', icon: Sparkles },
    { name: 'Matching Jobs', path: '/student/jobs', icon: Search, badge: 'Apply' },
  ];

  const currentNav = 
    role === 'government' ? governmentNav :
    role === 'institute' ? instituteNav :
    role === 'employer' ? employerNav : studentNav;

  const roleMeta = {
    government: { title: 'Government Portal', color: 'bg-blue-600', subtitle: 'State Policy Directorate' },
    institute: { title: 'Institute Portal', color: 'bg-emerald-600', subtitle: 'Polytechnic & ITI Hub' },
    employer: { title: 'Employer Portal', color: 'bg-amber-600', subtitle: 'Corporate Talent Network' },
    student: { title: 'Student Portal', color: 'bg-saffron-500', subtitle: 'Career & Skill Pathway' },
  };

  return (
    <aside className={`w-full bg-white flex flex-col shrink-0 ${isMobile ? 'p-3' : 'p-4'}`}>
      {/* Sidebar Header with Role Identifier */}
      <div className="px-3 py-3.5 mb-2 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-8 rounded-full ${roleMeta[role].color} shadow-xs`} />
          <div>
            <h2 className="text-xs font-bold text-govnavy-950 uppercase tracking-wider">
              {roleMeta[role].title}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {roleMeta[role].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1" aria-label="Dashboard Navigation">
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isCurrentActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.name + item.path}
              to={item.path}
              onClick={() => {
                if (isMobile && onCloseMobile) onCloseMobile();
              }}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group
                ${isActive || isCurrentActive
                  ? 'bg-[#081B3E] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-govnavy-950 hover:bg-slate-50/90'
                }
              `}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isCurrentActive ? 'text-saffron-400' : 'text-slate-400 group-hover:text-govnavy-900'
                }`} />
                <span className="truncate">{item.name}</span>
              </div>

              {item.badge && (
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                  isCurrentActive 
                    ? 'bg-saffron-500 text-white' 
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer Indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 py-1">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Online</span>
          </span>
          <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
            MSBTE AI 2.4
          </span>
        </div>
      </div>
    </aside>
  );
};
