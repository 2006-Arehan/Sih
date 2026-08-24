import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, MapPin, Phone, Mail, Building, Award, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const districtList = [
    'Pune', 'Mumbai City', 'Mumbai Suburban', 'Thane', 'Nagpur', 
    'Nashik', 'Chhatrapati Sambhajinagar', 'Kolhapur', 'Solapur', 
    'Satara', 'Raigad', 'Amravati', 'Latur', 'Jalgaon'
  ];

  return (
    <footer className="bg-govnavy-950 text-slate-300 relative border-t-2 border-slate-800" aria-label="Official Site Footer">
      {/* Tricolor Top Accent Line */}
      <div className="h-1 tricolor-stripe w-full absolute top-0 left-0 right-0" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Department Identity (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 p-2 flex items-center justify-center shadow-md text-white font-black text-base">
                SP
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  SKILL<span className="text-saffron-400">PULSE</span> MAHARASHTRA
                </span>
                <p className="text-xs text-slate-400 font-medium">
                  "Aligning Skills with Maharashtra's Future"
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              A state-of-the-art Labour Market Intelligence & Skill Alignment platform 
              connecting industry demand, training institutes, curriculum frameworks, and youth 
              career roadmaps across all 36 administrative districts.
            </p>

            <div className="p-3.5 rounded-xl bg-govnavy-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Building className="w-3.5 h-3.5 text-saffron-400" />
                <span>Department of Skill, Employment, Entrepreneurship & Innovation</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Government of Maharashtra, Mantralaya, Madam Cama Road, Nariman Point, Mumbai - 400032.
              </p>
            </div>
          </div>

          {/* Stakeholder Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-400"></span>
              Stakeholder Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/government/dashboard" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>🏛️ Government Directorate</span>
                </Link>
              </li>
              <li>
                <Link to="/institute/dashboard" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>🎓 Polytechnics & ITIs</span>
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>💼 Industry & Employers</span>
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>🧑‍🎓 Students & Jobseekers</span>
                </Link>
              </li>
              <li>
                <Link to="/employer/post-job" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>📋 Post Skill Demand</span>
                </Link>
              </li>
              <li>
                <Link to="/student/assessment" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>🎯 Take Skill Assessment</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-govgreen-400"></span>
              Platform Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/features" className="hover:text-saffron-400 transition-colors">
                  Skill Intelligence Engine
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-saffron-400 transition-colors">
                  How SkillPulse Works
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-saffron-400 transition-colors">
                  State Skill Reports (2026)
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-saffron-400 transition-colors">
                  MSBTE Curriculum Toolkits
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-saffron-400 transition-colors">
                  Vision & Governance
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-saffron-400 transition-colors">
                  District Facilitation Helpdesk
                </Link>
              </li>
            </ul>
          </div>

          {/* Top District Hubs & Reference Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Districts & Reference
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {districtList.map((district) => (
                <Link
                  key={district}
                  to={`/government/districts`}
                  className="text-[10px] px-2 py-0.5 rounded bg-govnavy-900 hover:bg-govnavy-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                >
                  {district}
                </Link>
              ))}
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Affiliated Ecosystems
              </div>
              <p className="flex items-center gap-1">
                <span>• Mahaswayam Portal</span>
              </p>
              <p className="flex items-center gap-1">
                <span>• Skill India Digital (SIDH)</span>
              </p>
              <p className="flex items-center gap-1">
                <span>• National Career Service (NCS)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Prototype Data Notice & Legal Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-saffron-400 shrink-0" />
            <p className="text-[11px]">
              <strong className="text-slate-200">Prototype Disclaimer:</strong> SkillPulse Maharashtra is an interactive frontend-only labor intelligence prototype. Numbers, forecasts, and institutional rankings are simulated mock data for demonstration purposes.
            </p>
          </div>
          <div className="text-[11px] text-slate-500 whitespace-nowrap">
            © {currentYear} SkillPulse Maharashtra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
