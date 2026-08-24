import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { TopGovernmentBar } from './TopGovernmentBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../store/authStore';
import { UserRole } from '../../types/user';
import { Menu, X, ChevronRight, Sparkles, Building2, GraduationCap, Briefcase, UserCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: UserRole;
  pageTitle?: string;
  pageSubtitle?: string;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role: overrideRole,
  pageTitle,
  pageSubtitle,
  actions,
}) => {
  const { user, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Determine active role based on URL path or context
  const pathPrefix = location.pathname.split('/')[1];
  const activeRole: UserRole = 
    overrideRole ||
    (pathPrefix === 'government' || pathPrefix === 'institute' || pathPrefix === 'employer' || pathPrefix === 'student'
      ? (pathPrefix as UserRole)
      : user.role);

  const pathParts = location.pathname.split('/').filter(Boolean);

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    navigate(`/${newRole}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col selection:bg-saffron-500 selection:text-white">
      {/* 1. Official Government Top Header */}
      <TopGovernmentBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Global Prototype Role Bar (Stakeholder Quick Switcher) */}
      <div className="bg-[#081B3E] text-white text-xs px-4 py-2.5 border-b border-[#0E2856] shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-saffron-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Active Portal
            </span>
            <span className="font-semibold text-slate-200 text-xs">
              Viewing as <strong className="text-white capitalize">{activeRole}</strong> ({user.name.split(',')[0]})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden md:inline">Switch Stakeholder:</span>
            <div className="flex bg-[#051329] p-1 rounded-xl border border-slate-700/60 gap-1">
              <button
                onClick={() => handleRoleSwitch('government')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  activeRole === 'government' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Government</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('institute')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  activeRole === 'institute' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Institute</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('employer')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  activeRole === 'employer' 
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Employer</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  activeRole === 'student' 
                    ? 'bg-saffron-500 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Dashboard Body with Responsive Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto my-6 px-4 sm:px-6 lg:px-8 gap-8">
        
        {/* Desktop Sidebar (Floating Card Architecture) */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 rounded-3xl overflow-hidden shadow-xs border border-slate-200/90 bg-white">
            <Sidebar role={activeRole} />
          </div>
        </div>

        {/* Mobile Sidebar Overlay Modal */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div 
              className="fixed inset-0 bg-[#051329]/70 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-full bg-white h-full z-10 flex flex-col shadow-2xl">
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <span className="font-bold text-xs uppercase text-slate-500 tracking-wider">Navigation Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar role={activeRole} isMobile onCloseMobile={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Dashboard Content Area */}
        <main className="flex-1 min-w-0 flex flex-col">
          
          {/* Breadcrumbs & Mobile Sidebar Toggle */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 mr-2 shadow-2xs"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-4 h-4" />
              </button>

              <Link to="/" className="hover:text-govnavy-900 font-semibold">Home</Link>
              {pathParts.map((part, index) => {
                const isLast = index === pathParts.length - 1;
                const pathUrl = `/${pathParts.slice(0, index + 1).join('/')}`;
                return (
                  <React.Fragment key={pathUrl}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    {isLast ? (
                      <span className="font-bold text-govnavy-950 capitalize">
                        {part.replace(/-/g, ' ')}
                      </span>
                    ) : (
                      <Link to={pathUrl} className="hover:text-govnavy-900 capitalize font-medium">
                        {part.replace(/-/g, ' ')}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Prototype Data Tag */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-saffron-50 text-saffron-700 border border-saffron-200">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 animate-pulse" />
                Prototype Data
              </span>
            </div>
          </div>

          {/* Page Header (if title passed) */}
          {(pageTitle || actions) && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                {pageTitle && (
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-govnavy-950 tracking-tight">
                    {pageTitle}
                  </h1>
                )}
                {pageSubtitle && (
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                    {pageSubtitle}
                  </p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
            </div>
          )}

          {/* Render Children */}
          <div className="flex-1 space-y-6">
            {children}
          </div>

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
