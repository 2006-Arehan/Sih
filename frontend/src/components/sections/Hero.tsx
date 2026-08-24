import React from 'react';
import { Button } from '../ui/Button';
import { IMAGES } from '../../config/images';
import { Sparkles, ArrowRight, ShieldCheck, Activity, BarChart2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-govnavy-950 via-govnavy-900 to-govnavy-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* Background Subtle Tricolor Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-govgreen-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-300 text-xs font-bold tracking-wide shadow-inner animate-fade-in">
              <Sparkles className="w-4 h-4 text-saffron-400 animate-pulse" />
              <span>AI-POWERED LABOUR MARKET INTELLIGENCE</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
              Aligning Skills with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-saffron-400 via-amber-300 to-saffron-400 bg-clip-text text-transparent">
                Maharashtra's Future
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Connecting industry demand, workforce skills, training programs and employment outcomes through one intelligent platform.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => {
                  const mapElement = document.getElementById('skill-map-section');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/government/map');
                  }
                }}
                className="w-full sm:w-auto shadow-saffron-glow font-bold"
              >
                Explore Skill Intelligence
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const howItWorks = document.getElementById('how-it-works-section');
                  if (howItWorks) {
                    howItWorks.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/how-it-works');
                  }
                }}
                className="w-full sm:w-auto text-white border-slate-500 hover:bg-white/10"
              >
                How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>36 Districts Integrated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-saffron-400" />
                <span>Real-time Hiring Signals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-blue-400" />
                <span>MSBTE & DTE Aligned</span>
              </div>
            </div>

          </div>

          {/* Right Real Photography & Analytics Overlay (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Central Real Photography Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl shadow-black/50 bg-slate-900 aspect-4/3 sm:aspect-16/10">
                <img
                  src={IMAGES.hero.main.url}
                  alt={IMAGES.hero.main.alt}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-govnavy-950 via-transparent to-black/30" />
                
                {/* State Seal Watermark */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-govnavy-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold">Gov. of Maharashtra Hub</span>
                </div>
              </div>

              {/* Analytics Floating Overlay Box */}
              <div className="mt-4 sm:-mt-12 sm:ml-6 relative bg-white text-govnavy-950 p-5 rounded-2xl shadow-gov-xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-saffron-500 animate-ping" />
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-govnavy-900">
                      Maharashtra Skill Intelligence
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-govnavy-50 text-govnavy-900 px-2 py-0.5 rounded">
                    Live Telemetry
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-display font-extrabold text-govnavy-950 block">
                      12,450+
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      Jobs Analyzed
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-display font-extrabold text-saffron-600 block">
                      3,240+
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      Skills
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-display font-extrabold text-emerald-700 block">
                      36
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      Districts
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-lg sm:text-xl font-display font-extrabold text-blue-700 block">
                      187
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">
                      Emerging Skills
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
