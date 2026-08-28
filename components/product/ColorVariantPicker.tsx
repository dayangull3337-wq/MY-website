'use client';

import React from 'react';
import { SofaColorVariant } from '@/types/product';
import { cn } from '@/lib/utils';
import { GlassTooltip } from '@/components/ui/GlassTooltip';

export interface ColorVariantPickerProps {
  variants: SofaColorVariant[];
  selectedVariantId: string;
  onSelect: (variant: SofaColorVariant) => void;
  size?: 'sm' | 'md' | 'lg';
  maxVisible?: number;
  className?: string;
}

export function ColorVariantPicker({
  variants,
  selectedVariantId,
  onSelect,
  size = 'md',
  maxVisible,
  className,
}: ColorVariantPickerProps) {
  const visibleVariants = maxVisible ? variants.slice(0, maxVisible) : variants;
  const extraCount = maxVisible && variants.length > maxVisible ? variants.length - maxVisible : 0;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex items-center gap-1.5 flex-wrap', className)} role="radiogroup" aria-label="Sofa Colors">
      {visibleVariants.map((v) => {
        const isSelected = v.id === selectedVariantId;
        return (
          <GlassTooltip key={v.id} content={`${v.colorName} (${v.material})`}>
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={v.colorName}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(v);
              }}
              className={cn(
                'rounded-full p-0.5 transition-all duration-200 focus:outline-none cursor-pointer relative',
                isSelected
                  ? 'ring-2 ring-stone-900 ring-offset-2 ring-offset-white scale-110'
                  : 'hover:scale-105 opacity-85 hover:opacity-100'
              )}
            >
              <span
                className={cn(
                  'block rounded-full border border-stone-300/80 shadow-inner',
                  sizeClasses[size]
                )}
                style={{ backgroundColor: v.colorHex }}
              />
            </button>
          </GlassTooltip>
        );
      })}

      {extraCount > 0 && (
        <span className="text-[10px] text-stone-500 font-semibold ml-0.5">
          +{extraCount}
        </span>
      )}
    </div>
  );
}
