import React from 'react';
import { MaharashtraMap } from '../maps/MaharashtraMap';
import { Button } from '../ui/Button';
import { MapPin, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SkillIntelligence: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="skill-map-section" className="py-20 bg-govbg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>36-District Spatial Telemetry</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
              Maharashtra Skill Intelligence Map
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Explore localized talent demand scores, emerging technical skills, seat capacities, and placement metrics across every division.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/government/districts')}
            className="self-start md:self-auto bg-white"
          >
            View All 36 Districts Table
          </Button>
        </div>

        {/* Interactive Map Component */}
        <MaharashtraMap />

      </div>
    </section>
  );
};
