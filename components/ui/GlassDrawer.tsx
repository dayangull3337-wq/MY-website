'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GlassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  side?: 'right' | 'left' | 'bottom';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

export function GlassDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  side = 'right',
  maxWidth = 'md',
  footer,
}: GlassDrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const sideVariants = {
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      className: 'top-0 right-0 h-full border-l border-stone-200/60',
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      className: 'top-0 left-0 h-full border-r border-stone-200/60',
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
      className: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl border-t border-stone-200/60',
    },
  };

  const currentVariant = sideVariants[side];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
            <div className={cn(
              'absolute inset-y-0 flex max-h-screen pointer-events-none',
              side === 'right' ? 'right-0 max-w-full' : side === 'left' ? 'left-0 max-w-full' : 'bottom-0 inset-x-0'
            )}>
              <motion.div
                initial={currentVariant.initial}
                animate={currentVariant.animate}
                exit={currentVariant.exit}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className={cn(
                  'pointer-events-auto w-screen glass-panel shadow-2xl flex flex-col h-full max-h-[100dvh] overflow-hidden',
                  side !== 'bottom' && maxWidthClasses[maxWidth],
                  currentVariant.className
                )}
                role="dialog"
                aria-modal="true"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200/50 shrink-0 bg-white/60 backdrop-blur-md">
                  <div>
                    {title && <h2 className="text-lg font-bold text-stone-900 tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>}
                  </div>
                  <button
                    id="close-drawer-btn"
                    onClick={onClose}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100/70 transition-colors cursor-pointer"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Body - Smooth scrolling container */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin overscroll-contain">
                  {children}
                </div>

                {/* Sticky Footer */}
                {footer && (
                  <div className="p-6 border-t border-stone-200/50 bg-white/95 backdrop-blur-md shrink-0 shadow-lg">
                    {footer}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
