import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills' | 'enclosed';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pills',
}) => {
  if (variant === 'underline') {
    return (
      <div className={twMerge("border-b border-slate-200 flex gap-6 overflow-x-auto", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={clsx(
                "pb-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2",
                isActive
                  ? "border-saffron-500 text-govnavy-900"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={clsx("text-xs px-2 py-0.5 rounded-full", isActive ? "bg-saffron-100 text-saffron-800" : "bg-slate-100 text-slate-600")}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={twMerge("inline-flex p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 gap-1 overflow-x-auto max-w-full", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2",
              isActive
                ? "bg-white text-govnavy-950 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={clsx("text-[10px] px-1.5 py-0.2 rounded-full", isActive ? "bg-govnavy-100 text-govnavy-900" : "bg-slate-200 text-slate-600")}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
