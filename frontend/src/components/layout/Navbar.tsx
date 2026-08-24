import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  UserCheck, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  LogIn, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, switchRole } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Features', path: '/features' },
    { name: 'Insights', path: '/insights' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const portals = [
    {
      name: 'Government Portal',
      description: 'District intelligence, skill gaps, & training capacity',
      icon: Building2,
      path: '/government/dashboard',
      color: 'text-blue-600 bg-blue-50',
      badge: 'State Policy'
    },
    {
      name: 'Training Institute',
      description: 'Curriculum analyzer, industry alignment & placements',
      icon: GraduationCap,
      path: '/institute/dashboard',
      color: 'text-emerald-600 bg-emerald-50',
      badge: 'Polytechnic/ITI'
    },
    {
      name: 'Employer Portal',
      description: 'Post skill demands, hiring trends & graduate feedback',
      icon: Briefcase,
      path: '/employer/dashboard',
      color: 'text-amber-600 bg-amber-50',
      badge: 'Industry'
    },
    {
      name: 'Student Portal',
      description: 'Skill profile, readiness gap, career roadmap & jobs',
      icon: UserCheck,
      path: '/student/dashboard',
      color: 'text-purple-600 bg-purple-50',
      badge: 'Jobseekers'
    },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" aria-label="SkillPulse Maharashtra Home">
            {/* Modern Pill Icon with 3 Tricolor Vertical Bars */}
            <div className="w-10 h-10 rounded-xl bg-[#081B3E] p-2 flex items-center justify-center gap-1 shadow-sm group-hover:scale-105 transition-transform">
              <span className="w-1.5 h-5 rounded-full bg-saffron-500" />
              <span className="w-1.5 h-6 rounded-full bg-blue-400" />
              <span className="w-1.5 h-5 rounded-full bg-emerald-500" />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-xl tracking-tight text-govnavy-950">
                  SkillPulse
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-0.5">
                MAHARASHTRA
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-govnavy-950 font-bold bg-slate-50'
                    : 'text-slate-600 hover:text-govnavy-950 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Stakeholder Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                onBlur={() => setTimeout(() => setPortalsDropdownOpen(false), 200)}
                className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
                  location.pathname.startsWith('/government') ||
                  location.pathname.startsWith('/institute') ||
                  location.pathname.startsWith('/employer') ||
                  location.pathname.startsWith('/student')
                    ? 'text-saffron-600 bg-saffron-50/80 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
                aria-expanded={portalsDropdownOpen}
              >
                <Compass className="w-4 h-4 text-saffron-500" />
                <span>Portals</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${portalsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {portalsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-slide-up">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Stakeholder Portal
                    </span>
                  </div>
                  <div className="space-y-1">
                    {portals.map((portal) => {
                      const Icon = portal.icon;
                      return (
                        <Link
                          key={portal.name}
                          to={portal.path}
                          onClick={() => setPortalsDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${portal.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-govnavy-900">
                                {portal.name}
                              </span>
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {portal.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {portal.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action / Auth & Role CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Log in Text Link */}
            <Link
              to="/login"
              className="text-xs font-bold text-slate-700 hover:text-govnavy-950 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Log in
            </Link>

            {/* Quick Switch Role / Active User Badge */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-left shadow-2xs"
              >
                <div className="text-right">
                  <div className="text-xs font-bold text-govnavy-950 truncate max-w-[120px]">
                    {user.name.split(',')[0]}
                  </div>
                  <div className="text-[9px] text-saffron-600 font-bold uppercase tracking-wider">
                    {user.role}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#081B3E] text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
              </button>

              {/* User / Role Switcher Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-slide-up">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1.5">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.organization || user.email}</p>
                    <div className="mt-1">
                      <Badge variant="saffron" size="sm">
                        Role: {user.role.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="py-1">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active Prototype Role
                    </div>
                    <button
                      onClick={() => { switchRole('government'); navigate('/government/dashboard'); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between hover:bg-slate-100 ${user.role === 'government' ? 'bg-slate-100 font-bold text-govnavy-900' : 'text-slate-700'}`}
                    >
                      <span>🏛️ Government Officer</span>
                      {user.role === 'government' && <span className="text-[10px] text-saffron-600 font-bold">Active</span>}
                    </button>
                    <button
                      onClick={() => { switchRole('institute'); navigate('/institute/dashboard'); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between hover:bg-slate-100 ${user.role === 'institute' ? 'bg-slate-100 font-bold text-govnavy-900' : 'text-slate-700'}`}
                    >
                      <span>🎓 Institute Principal</span>
                      {user.role === 'institute' && <span className="text-[10px] text-saffron-600 font-bold">Active</span>}
                    </button>
                    <button
                      onClick={() => { switchRole('employer'); navigate('/employer/dashboard'); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between hover:bg-slate-100 ${user.role === 'employer' ? 'bg-slate-100 font-bold text-govnavy-900' : 'text-slate-700'}`}
                    >
                      <span>💼 Industry HR Leader</span>
                      {user.role === 'employer' && <span className="text-[10px] text-saffron-600 font-bold">Active</span>}
                    </button>
                    <button
                      onClick={() => { switchRole('student'); navigate('/student/dashboard'); }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between hover:bg-slate-100 ${user.role === 'student' ? 'bg-slate-100 font-bold text-govnavy-900' : 'text-slate-700'}`}
                    >
                      <span>🧑‍🎓 Student Candidate</span>
                      {user.role === 'student' && <span className="text-[10px] text-saffron-600 font-bold">Active</span>}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <Link
                      to="/login"
                      className="w-full text-left px-3 py-1.5 text-xs text-govnavy-900 font-semibold rounded-lg flex items-center gap-2 hover:bg-slate-100"
                    >
                      <LogIn className="w-3.5 h-3.5 text-slate-500" />
                      <span>Role Sign In Portal</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Vibrant Orange My Portal CTA Button */}
            <button
              onClick={() => navigate(`/${user.role}/dashboard`)}
              className="bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <span>My Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="bg-saffron-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-slide-up">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(link.path)
                    ? 'bg-saffron-50 text-saffron-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Stakeholder Portals
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/government/dashboard"
                onClick={() => { switchRole('government'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl border border-slate-200 bg-blue-50/50 hover:bg-blue-50 text-left"
              >
                <Building2 className="w-4 h-4 text-blue-600 mb-1" />
                <div className="text-xs font-bold text-slate-900">Government</div>
                <div className="text-[10px] text-slate-500">State Dashboard</div>
              </Link>
              <Link
                to="/institute/dashboard"
                onClick={() => { switchRole('institute'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl border border-slate-200 bg-emerald-50/50 hover:bg-emerald-50 text-left"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600 mb-1" />
                <div className="text-xs font-bold text-slate-900">Institute</div>
                <div className="text-[10px] text-slate-500">Course Health</div>
              </Link>
              <Link
                to="/employer/dashboard"
                onClick={() => { switchRole('employer'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl border border-slate-200 bg-amber-50/50 hover:bg-amber-50 text-left"
              >
                <Briefcase className="w-4 h-4 text-amber-600 mb-1" />
                <div className="text-xs font-bold text-slate-900">Employer</div>
                <div className="text-[10px] text-slate-500">Post Skill Jobs</div>
              </Link>
              <Link
                to="/student/dashboard"
                onClick={() => { switchRole('student'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl border border-slate-200 bg-purple-50/50 hover:bg-purple-50 text-left"
              >
                <UserCheck className="w-4 h-4 text-purple-600 mb-1" />
                <div className="text-xs font-bold text-slate-900">Student</div>
                <div className="text-[10px] text-slate-500">Readiness & Jobs</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
