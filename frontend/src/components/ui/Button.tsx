import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'navy' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none rounded-lg";
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary: "bg-saffron-500 hover:bg-saffron-600 active:bg-saffron-700 text-white shadow-md hover:shadow-saffron-glow focus:ring-saffron-400 border border-saffron-600/30",
    secondary: "bg-white hover:bg-slate-50 text-govnavy-900 border border-slate-300 shadow-sm hover:border-slate-400 focus:ring-govnavy-500",
    navy: "bg-govnavy-900 hover:bg-govnavy-950 active:bg-black text-white shadow-md focus:ring-govnavy-400 border border-govnavy-800",
    outline: "bg-transparent hover:bg-govnavy-50 text-govnavy-900 border-2 border-govnavy-800 focus:ring-govnavy-400",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-govnavy-900 focus:ring-slate-400",
    success: "bg-govgreen-700 hover:bg-govgreen-800 text-white shadow-md hover:shadow-green-glow focus:ring-govgreen-500 border border-govgreen-800/30",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="inline-flex shrink-0">{leftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
