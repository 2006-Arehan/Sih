import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { KeyRound, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 my-6">
        <div className="w-full max-w-md">
          <Card className="p-8 bg-white border-slate-200 shadow-gov-xl">
            {isSent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-govnavy-950">
                  Reset Link Dispatched
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A secure one-time password and reset link has been dispatched to <strong>{email || 'your email address'}</strong>.
                </p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button variant="primary" size="md" className="w-full justify-center">
                      Return to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-govnavy-50 text-govnavy-900 flex items-center justify-center mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-govnavy-950 tracking-tight">
                    Reset Password
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your registered email to receive an official OTP verification code.
                  </p>
                </div>

                <Input
                  label="Registered Email"
                  type="email"
                  required
                  placeholder="name@organization.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-md font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Send OTP Code
                </Button>

                <div className="text-center text-xs pt-3 border-t border-slate-100">
                  <Link to="/login" className="text-slate-600 hover:text-govnavy-950 font-semibold flex items-center justify-center gap-1.5">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Login</span>
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
