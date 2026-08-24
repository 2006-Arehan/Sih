import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth, PRESET_USERS } from '../../store/authStore';
import { UserRole } from '../../types/user';
import { Building2, GraduationCap, Briefcase, UserCheck, ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRole } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('government');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const rolePresets = [
    {
      role: 'government' as UserRole,
      title: 'Government Directorate',
      subtitle: 'Policy & Capacity Planning',
      icon: Building2,
      color: 'border-blue-500 bg-blue-50/50 text-blue-700',
      user: PRESET_USERS.government
    },
    {
      role: 'institute' as UserRole,
      title: 'Training Institute',
      subtitle: 'Curriculum & Placements',
      icon: GraduationCap,
      color: 'border-emerald-500 bg-emerald-50/50 text-emerald-700',
      user: PRESET_USERS.institute
    },
    {
      role: 'employer' as UserRole,
      title: 'Industry Employer',
      subtitle: 'Post Demands & Hire',
      icon: Briefcase,
      color: 'border-amber-500 bg-amber-50/50 text-amber-700',
      user: PRESET_USERS.employer
    },
    {
      role: 'student' as UserRole,
      title: 'Student & Youth',
      subtitle: 'Skills & Career Roadmap',
      icon: UserCheck,
      color: 'border-purple-500 bg-purple-50/50 text-purple-700',
      user: PRESET_USERS.student
    },
  ];

  const handleQuickPresetLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithRole(role);
      navigate(`/${role}/dashboard`);
    }, 400);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginWithRole(selectedRole, undefined, email || undefined);
      navigate(`/${selectedRole}/dashboard`);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 my-6">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Quick 1-Click Role Access (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-govnavy-950 text-white shadow-gov-xl border border-slate-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-saffron-500/20 text-saffron-300 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-saffron-400" />
                <span>Prototype Quick Login</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white leading-snug">
                1-Click Stakeholder Presets
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience the interactive platform instantly by selecting an authentic pre-configured role profile.
              </p>

              <div className="space-y-2 pt-2">
                {rolePresets.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = selectedRole === preset.role;

                  return (
                    <button
                      key={preset.role}
                      type="button"
                      onClick={() => handleQuickPresetLogin(preset.role)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between group ${
                        isSelected 
                          ? 'bg-white text-govnavy-950 border-saffron-500 shadow-md font-bold' 
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${preset.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{preset.title}</span>
                          <span className="text-[10px] text-slate-400">{preset.user.name.split(',')[0]}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-saffron-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Standard Login Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <Card className="p-8 bg-white border-slate-200 shadow-gov-xl">
              <form onSubmit={handleCustomLogin} className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-govnavy-950 tracking-tight">
                    Sign In to SkillPulse
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter credentials or switch target portal below.
                  </p>
                </div>

                {/* Role Switcher Pills */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Role Portal
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                    {(['government', 'institute', 'employer', 'student'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRole(r)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                          selectedRole === r
                            ? 'bg-govnavy-900 text-white shadow-sm'
                            : 'text-slate-600 hover:text-govnavy-950'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Email / Mobile Number"
                  type="email"
                  placeholder="name@organization.gov.in"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password / Security PIN"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-saffron-500 focus:ring-saffron-400" />
                    <span>Remember this session</span>
                  </label>
                  <Link to="/forgot-password" className="text-saffron-600 hover:text-saffron-700 font-semibold">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full justify-center shadow-md font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign In to {selectedRole.toUpperCase()} Portal
                </Button>

                <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                  <span>Don't have an institutional account? </span>
                  <Link to="/register" className="text-govnavy-900 font-bold hover:underline">
                    Register Organization / Student
                  </Link>
                </div>
              </form>
            </Card>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
