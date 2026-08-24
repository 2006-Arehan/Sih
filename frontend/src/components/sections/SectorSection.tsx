import React from 'react';
import { SectorCard } from '../cards/SectorCard';
import { SECTORS_DATA } from '../../data/sectors';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { Factory, ArrowRight } from 'lucide-react';

export const SectorSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-govbg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Factory className="w-3.5 h-3.5" />
              <span>Key Maharashtra Growth Pillars</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
              10 High-Growth Industry Sectors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Driving thousands of high-value employment opportunities from IT parks and automotive clusters to green hydrogen corridors.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/government/districts')}
            className="self-start md:self-auto bg-white"
          >
            Filter by Sector in Districts
          </Button>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SECTORS_DATA.slice(0, 8).map((sector) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              onExplore={() => navigate(`/government/districts`)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
