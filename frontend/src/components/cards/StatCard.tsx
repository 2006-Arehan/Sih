import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  accentColor?: 'saffron' | 'green' | 'navy' | 'blue' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon,
  accentColor = 'navy',
  onClick,
}) => {
  const accentTheme = {
    saffron: {
      bg: 'bg-orange-50/80 text-orange-600 border-orange-100',
      pill: 'bg-orange-50 text-orange-700',
      dot: 'bg-orange-500',
    },
    green: {
      bg: 'bg-emerald-50/80 text-emerald-600 border-emerald-100',
      pill: 'bg-emerald-50 text-emerald-700',
      dot: 'bg-emerald-500',
    },
    navy: {
      bg: 'bg-slate-100/80 text-slate-800 border-slate-200',
      pill: 'bg-slate-100 text-slate-800',
      dot: 'bg-slate-700',
    },
    blue: {
      bg: 'bg-blue-50/80 text-blue-600 border-blue-100',
      pill: 'bg-blue-50 text-blue-700',
      dot: 'bg-blue-500',
    },
    purple: {
      bg: 'bg-purple-50/80 text-purple-600 border-purple-100',
      pill: 'bg-purple-50 text-purple-700',
      dot: 'bg-purple-500',
    },
  };

  const theme = accentTheme[accentColor];

  return (
    <div 
      className={`p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative transition-all duration-300 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-slate-300' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
              {title}
            </p>
          </div>
          <div className="text-2xl sm:text-[28px] font-display font-extrabold text-govnavy-950 tracking-tight leading-tight">
            {value}
          </div>
        </div>

        {icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${theme.bg}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between gap-2 flex-wrap text-xs">
        {change && (
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </span>
        )}
        {subtitle && (
          <span className="text-[11px] text-slate-500 font-medium">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
