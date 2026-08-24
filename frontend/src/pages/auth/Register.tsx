import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAuth } from '../../store/authStore';
import { UserRole } from '../../types/user';
import { UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRole } = useAuth();
  
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [district, setDistrict] = useState('Pune');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRole(role, name, email);
    setIsSuccess(true);
    setTimeout(() => {
      navigate(`/${role}/dashboard`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 my-6">
        <div className="w-full max-w-xl">
          <Card className="p-8 bg-white border-slate-200 shadow-gov-xl">
            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-govnavy-950">
                  Registration Successful!
                </h3>
                <p className="text-xs text-slate-500">
                  Redirecting to your {role.toUpperCase()} workspace...
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-govnavy-950 tracking-tight">
                    Create SkillPulse Account
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Join Maharashtra's official workforce intelligence network.
                  </p>
                </div>

                <Select
                  label="I am registering as"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  options={[
                    { value: 'student', label: 'Student / Vocational Candidate' },
                    { value: 'institute', label: 'Polytechnic / ITI / University Principal' },
                    { value: 'employer', label: 'Corporate Employer / Hiring Manager' },
                    { value: 'government', label: 'Government Officer / District Collector' },
                  ]}
                />

                <Input
                  label="Full Name / Representative Name"
                  required
                  placeholder="e.g. Anand Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Official Email Address"
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label={role === 'student' ? 'College / Polytechnic Name' : 'Company / Department Name'}
                  required
                  placeholder="e.g. Government Polytechnic / Tata AutoComp"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />

                <Select
                  label="Primary District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  options={[
                    { value: 'Pune', label: 'Pune' },
                    { value: 'Mumbai City', label: 'Mumbai City' },
                    { value: 'Mumbai Suburban', label: 'Mumbai Suburban' },
                    { value: 'Thane', label: 'Thane' },
                    { value: 'Nagpur', label: 'Nagpur' },
                    { value: 'Nashik', label: 'Nashik' },
                    { value: 'Chhatrapati Sambhajinagar', label: 'Chhatrapati Sambhajinagar' },
                    { value: 'Kolhapur', label: 'Kolhapur' },
                    { value: 'Solapur', label: 'Solapur' },
                  ]}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-md font-bold mt-2"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create & Launch Portal
                </Button>

                <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span>Already registered? </span>
                  <Link to="/login" className="text-govnavy-900 font-bold hover:underline">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
