import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  variant?: 'saffron' | 'green' | 'navy' | 'amber' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'navy',
  size = 'md',
  showLabel = false,
  className,
  ...props
}) => {
  const clamped = Math.min(Math.max(0, value), max);
  const percentage = Math.round((clamped / max) * 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantBarClasses = {
    saffron: 'bg-saffron-500',
    green: 'bg-govgreen-700',
    navy: 'bg-govnavy-900',
    amber: 'bg-amber-500',
    gradient: 'bg-gradient-to-r from-saffron-500 via-govnavy-800 to-govgreen-700',
  };

  return (
    <div className={twMerge("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
          <span>Alignment & Progress</span>
          <span className="font-mono">{percentage}%</span>
        </div>
      )}
      <div className={clsx("w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50", sizeClasses[size])}>
        <div
          className={clsx("h-full transition-all duration-500 rounded-full", variantBarClasses[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
