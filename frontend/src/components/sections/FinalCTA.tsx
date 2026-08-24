import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { ArrowRight, Building2, GraduationCap, Briefcase, UserCheck, Sparkles } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleLaunch = (role: 'government' | 'institute' | 'employer' | 'student') => {
    switchRole(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-govnavy-950 via-govnavy-900 to-govnavy-950 text-white relative overflow-hidden">
      {/* Subtle tricolor background glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-govgreen-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-saffron-400" />
          <span>JOIN MAHARASHTRA'S SKILL TRANSFORMATION</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to align skills with <br />
          <span className="text-saffron-400">Maharashtra's Future?</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Select your stakeholder gateway below to test the live prototype intelligence pipelines, interactive maps, curriculum analyzers, and student roadmap engines.
        </p>

        {/* 4 Interactive Gateway Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
          <button
            onClick={() => handleLaunch('government')}
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-center group"
          >
            <Building2 className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Government</div>
            <div className="text-[10px] text-slate-400">Directorate View</div>
          </button>

          <button
            onClick={() => handleLaunch('institute')}
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-center group"
          >
            <GraduationCap className="w-6 h-6 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Institute</div>
            <div className="text-[10px] text-slate-400">Curriculum Diff</div>
          </button>

          <button
            onClick={() => handleLaunch('employer')}
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-center group"
          >
            <Briefcase className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Employer</div>
            <div className="text-[10px] text-slate-400">Post Skill Jobs</div>
          </button>

          <button
            onClick={() => handleLaunch('student')}
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-center group"
          >
            <UserCheck className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Student</div>
            <div className="text-[10px] text-slate-400">Career Pathway</div>
          </button>
        </div>

        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={() => navigate('/login')}
            className="shadow-saffron-glow font-bold"
          >
            Access All Portals via Unified Sign-In
          </Button>
        </div>

      </div>
    </section>
  );
};
