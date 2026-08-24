import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'saffron' | 'navy' | 'green' | 'amber' | 'red' | 'gray' | 'purple' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'navy',
  size = 'md',
  dot = false,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded',
    md: 'text-xs px-2.5 py-1 font-semibold rounded-md',
  };

  const variantStyles = {
    saffron: 'bg-saffron-50 text-saffron-800 border border-saffron-200',
    navy: 'bg-govnavy-50 text-govnavy-900 border border-govnavy-200',
    green: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
    red: 'bg-rose-50 text-rose-800 border border-rose-200',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    purple: 'bg-purple-50 text-purple-800 border border-purple-200',
    outline: 'bg-white text-slate-700 border border-slate-300',
  };

  const dotColors = {
    saffron: 'bg-saffron-500',
    navy: 'bg-govnavy-800',
    green: 'bg-emerald-600',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
    gray: 'bg-slate-400',
    purple: 'bg-purple-500',
    outline: 'bg-slate-500',
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 leading-none transition-colors",
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0 animate-pulse", dotColors[variant])} />
      )}
      {children}
    </span>
  );
};
