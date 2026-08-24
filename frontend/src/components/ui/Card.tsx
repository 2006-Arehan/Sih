import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tricolorAccent?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  tricolorAccent = false,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-white rounded-xl border border-slate-200 shadow-gov transition-all duration-200 overflow-hidden",
          hoverEffect && "hover:shadow-gov-lg hover:border-slate-300 hover:-translate-y-0.5",
          tricolorAccent && "border-t-[3px] border-t-saffron-500 relative",
          className
        )
      )}
      {...props}
    >
      {tricolorAccent && (
        <div className="absolute top-0 left-0 right-0 h-[3px] tricolor-stripe" />
      )}
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx("p-5 pb-3 border-b border-slate-100", className))} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={twMerge(clsx("font-display text-lg font-bold text-govnavy-950 tracking-tight", className))} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={twMerge(clsx("text-xs text-slate-500 mt-1", className))} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx("p-5", className))} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx("p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between", className))} {...props}>
    {children}
  </div>
);
