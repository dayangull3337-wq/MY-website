import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'sale' | 'new' | 'featured' | 'dark' | 'success' | 'outline' | 'editorial' | 'accent';
  size?: 'sm' | 'md';
}

export function GlassBadge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: GlassBadgeProps) {
  const sizeStyles = {
    sm: 'text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full',
    md: 'text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full',
  };

  const variantStyles = {
    default: 'bg-black/5 text-stone-900 border border-black/5 shadow-xs',
    editorial: 'bg-stone-900 text-white shadow-xs font-medium',
    accent: 'bg-[#c4a484]/20 text-[#8f6e4d] border border-[#c4a484]/30 shadow-xs font-medium',
    sale: 'bg-rose-50 text-rose-800 border border-rose-200/70 shadow-xs font-medium',
    new: 'bg-emerald-50 text-emerald-800 border border-emerald-200/70 shadow-xs font-medium',
    featured: 'bg-[#c4a484]/25 text-[#735235] border border-[#c4a484]/40 shadow-xs font-semibold',
    dark: 'bg-[#1a1a1a] text-white border border-white/15',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    outline: 'border border-stone-300 text-stone-700 bg-white/40 backdrop-blur-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap transition-colors select-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
