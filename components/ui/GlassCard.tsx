'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'subtle' | 'dark' | 'glow' | 'interactive';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      variant = 'default',
      hoverEffect = false,
      padding = 'md',
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'glass-card border border-white/80',
      subtle: 'glass-panel-subtle border border-white/60',
      dark: 'glass-panel-dark text-white',
      glow: 'glass-panel shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-white/90',
      interactive: 'glass-card hover:shadow-xl hover:border-stone-300/80 transition-all duration-300 cursor-pointer',
    };

    const paddingStyles = {
      none: 'p-0',
      sm: 'p-3 sm:p-4',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
      xl: 'p-8 sm:p-10',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
        className={cn(
          'rounded-[28px] sm:rounded-[36px] relative overflow-hidden',
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
