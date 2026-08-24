import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface PortalCardProps {
  title: string;
  tagline: string;
  badge: string;
  imageUrl: string;
  imageAlt: string;
  features: string[];
  linkPath: string;
  accentColor: 'blue' | 'emerald' | 'amber' | 'purple';
  onEnter: () => void;
}

export const PortalCard: React.FC<PortalCardProps> = ({
  title,
  tagline,
  badge,
  imageUrl,
  imageAlt,
  features,
  linkPath,
  accentColor,
  onEnter
}) => {
  const accentBorders = {
    blue: 'border-t-4 border-t-blue-600',
    emerald: 'border-t-4 border-t-emerald-600',
    amber: 'border-t-4 border-t-amber-600',
    purple: 'border-t-4 border-t-purple-600',
  };

  const badgeBgs = {
    blue: 'bg-blue-100 text-blue-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <Card hoverEffect className={`flex flex-col justify-between overflow-hidden ${accentBorders[accentColor]} border-slate-200`}>
      {/* Real Photography Top Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={imageUrl}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-govnavy-950 via-govnavy-950/40 to-transparent" />
        
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${badgeBgs[accentColor]}`}>
            {badge}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-saffron-300 font-medium line-clamp-1">
            "{tagline}"
          </p>
        </div>
      </div>

      {/* Feature Bullet Points */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Key Capabilities & Tools
          </span>
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-govgreen-700 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Button
            variant="navy"
            size="md"
            className="w-full justify-center group"
            rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            onClick={onEnter}
          >
            Launch {title}
          </Button>
        </div>
      </div>
    </Card>
  );
};
