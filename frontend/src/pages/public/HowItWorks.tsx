import React from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { HowItWorks as HowItWorksSection } from '../../components/sections/HowItWorks';
import { FeedbackLoop } from '../../components/sections/FeedbackLoop';
import { Card } from '../../components/ui/Card';
import { Radio, Cpu, Scale, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <section className="bg-govnavy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
            System Architecture
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            How SkillPulse Synthesizes <br />
            <span className="text-saffron-400">Labour Market Signals</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            A comprehensive look at our 5-stage data processing pipeline turning unstructured job postings into actionable training policies and career roadmaps.
          </p>
        </div>
      </section>

      <main className="space-y-12">
        <HowItWorksSection />
        <FeedbackLoop />
      </main>

      <div className="bg-white py-12 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-display text-2xl font-bold text-govnavy-950 mb-3">
            Explore the Output in Government Portal
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-xl mx-auto">
            Review live demand charts, skill gap indices, and district training capacity planners.
          </p>
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/government/dashboard')}
          >
            Launch State Overview Dashboard
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
