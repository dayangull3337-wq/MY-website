'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
  dividerAfter?: boolean;
}

export interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export function GlassDropdown({ trigger, items, align = 'right', className }: GlassDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 mt-2 min-w-[220px] rounded-2xl glass-panel shadow-xl border border-stone-200/70 p-1.5 focus:outline-none',
              alignClasses[align],
              className
            )}
          >
            <div className="py-1" role="menu">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium rounded-xl text-stone-800 hover:bg-stone-100/80 transition-colors',
                        item.danger && 'text-rose-600 hover:bg-rose-50'
                      )}
                      role="menuitem"
                    >
                      {item.icon && <span className="text-stone-400">{item.icon}</span>}
                      <div className="flex flex-col">
                        <span>{item.label}</span>
                        {item.sublabel && <span className="text-[10px] text-stone-400">{item.sublabel}</span>}
                      </div>
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.();
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium rounded-xl text-stone-800 hover:bg-stone-100/80 transition-colors text-left cursor-pointer',
                        item.danger && 'text-rose-600 hover:bg-rose-50'
                      )}
                      role="menuitem"
                    >
                      {item.icon && <span className="text-stone-400">{item.icon}</span>}
                      <div className="flex flex-col">
                        <span>{item.label}</span>
                        {item.sublabel && <span className="text-[10px] text-stone-400">{item.sublabel}</span>}
                      </div>
                    </button>
                  )}
                  {item.dividerAfter && <div className="my-1 border-t border-stone-200/50" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
