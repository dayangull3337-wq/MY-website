'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';

export interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost' | 'danger' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800/40 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer tracking-tight';

    const sizeStyles = {
      sm: 'text-xs px-4 py-1.5 rounded-full gap-1.5 h-8',
      md: 'text-xs sm:text-sm px-5 py-2 rounded-full gap-2 h-10 tracking-wide',
      lg: 'text-sm font-medium px-7 py-3 rounded-full gap-2.5 h-12 tracking-wide',
      xl: 'text-sm sm:text-base font-medium px-8 py-3.5 rounded-full gap-3 h-13 tracking-wide',
      icon: 'p-2 rounded-full h-10 w-10 justify-center',
    };

    const variantStyles = {
      primary:
        'bg-[#1a1a1a] text-white hover:bg-stone-800 active:scale-[0.98] shadow-md shadow-stone-950/10 border border-stone-900',
      secondary:
        'bg-stone-100/90 text-[#1a1a1a] hover:bg-stone-200/90 active:scale-[0.98] border border-stone-200/60 shadow-xs',
      glass:
        'glass text-[#1a1a1a] hover:bg-white/90 active:scale-[0.98] shadow-xs hover:shadow-md border-white/90',
      outline:
        'border border-stone-300/80 bg-transparent text-[#1a1a1a] hover:bg-white/60 active:scale-[0.98]',
      ghost:
        'bg-transparent text-stone-700 hover:text-[#1a1a1a] hover:bg-stone-100/70',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] shadow-xs',
      dark:
        'glass-panel-dark text-white hover:bg-[#1a1a1a] active:scale-[0.98] border-white/20',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';
