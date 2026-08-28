'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface GlassTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'pill' | 'underline' | 'glass';
}

export function GlassTabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'glass',
}: GlassTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex p-1.5 rounded-2xl glass-panel-subtle border border-stone-200/60 overflow-x-auto max-w-full scrollbar-none gap-1',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer select-none',
              isActive
                ? 'text-stone-950 font-semibold shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/40'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-white/95 rounded-xl border border-stone-200/80 shadow-xs"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-semibold',
                    isActive ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
