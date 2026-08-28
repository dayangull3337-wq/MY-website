'use client';

import React from 'react';
import { SofaFilterState, SofaCategorySlug } from '@/types/product';
import { SOFA_CATEGORIES } from '@/data/categories';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { formatPrice } from '@/lib/utils';
import { RotateCcw, Check, Sparkles, Filter } from 'lucide-react';

export interface ProductFiltersProps {
  filters: SofaFilterState;
  onChange: (filters: SofaFilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

const COLOR_OPTIONS = [
  { name: 'Oatmeal / Cream', hex: '#f0ece1' },
  { name: 'Chalk White', hex: '#fbfaf8' },
  { name: 'Charcoal / Ebony', hex: '#2b2b2b' },
  { name: 'Vintage Cognac', hex: '#94542d' },
  { name: 'Alpine Moss / Olive', hex: '#485743' },
  { name: 'Midnight Navy', hex: '#1c2536' },
  { name: 'Sandstone Velvet', hex: '#c5b59e' },
  { name: 'Terracotta Rust', hex: '#ab5c44' },
];

const SEATING_OPTIONS = [
  { label: '2-Seater', value: 2 },
  { label: '3-Seater', value: 3 },
  { label: '4-Seater', value: 4 },
  { label: '5+ Grand', value: 5 },
];

const FIRMNESS_OPTIONS = [
  'Plush & Cloudlike',
  'Medium Supportive',
  'Tailored Firm',
];

const STYLE_OPTIONS = [
  'Organic Modern',
  'Italian Contemporary',
  'Scandinavian Minimal',
  'Mid-Century Atelier',
  'Low-Profile Bauhaus',
];

const FEATURE_OPTIONS = [
  'Reversible Cushions',
  'High-Performance Stain Resistant',
  'Removable Washable Covers',
  'Concealed Motorized Recline',
  'Magnetic Modular Locking',
  'Hypoallergenic Down Blend',
  'Integrated Wireless Charging & USB-C',
];

export function ProductFilters({
  filters,
  onChange,
  onReset,
  totalResultsCount,
}: ProductFiltersProps) {
  const handleCategoryChange = (slug: SofaCategorySlug | 'all') => {
    onChange({ ...filters, category: slug });
  };

  const handlePriceChange = (min: number, max: number) => {
    onChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const toggleColor = (colorName: string) => {
    const exists = filters.colors.includes(colorName);
    const newColors = exists
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onChange({ ...filters, colors: newColors });
  };

  const toggleSeating = (capacity: number) => {
    const exists = filters.seatingCapacity.includes(capacity);
    const newCapacities = exists
      ? filters.seatingCapacity.filter((c) => c !== capacity)
      : [...filters.seatingCapacity, capacity];
    onChange({ ...filters, seatingCapacity: newCapacities });
  };

  const toggleFirmness = (f: string) => {
    const exists = filters.firmness.includes(f);
    const newFirmness = exists
      ? filters.firmness.filter((item) => item !== f)
      : [...filters.firmness, f];
    onChange({ ...filters, firmness: newFirmness });
  };

  const toggleStyle = (st: string) => {
    const exists = filters.style.includes(st);
    const newStyles = exists
      ? filters.style.filter((item) => item !== st)
      : [...filters.style, st];
    onChange({ ...filters, style: newStyles });
  };

  const toggleFeature = (feat: string) => {
    const exists = filters.features.includes(feat);
    const newFeatures = exists
      ? filters.features.filter((item) => item !== feat)
      : [...filters.features, feat];
    onChange({ ...filters, features: newFeatures });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 6000 ||
    filters.colors.length > 0 ||
    filters.seatingCapacity.length > 0 ||
    filters.firmness.length > 0 ||
    filters.style.length > 0 ||
    filters.features.length > 0 ||
    filters.inStockOnly;

  return (
    <div className="space-y-6 text-stone-900">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-700" />
          <h3 className="text-sm font-bold tracking-tight">Atelier Filters</h3>
          <GlassBadge size="sm" variant="default">
            {totalResultsCount} found
          </GlassBadge>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Sofa Category
        </label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-white/80'
            }`}
          >
            <span>All Atelier Sofas</span>
            <span className="text-[11px] opacity-70">20</span>
          </button>
          {SOFA_CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-white/80'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[11px] opacity-70">{cat.productCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-4 border-t border-stone-200/50">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold uppercase tracking-wider text-stone-600">
            Price Range
          </label>
          <span className="font-semibold text-stone-900">
            {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
          </span>
        </div>

        {/* Dual Slider / Max Slider */}
        <input
          type="range"
          min={1000}
          max={6000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value))}
          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
        />

        {/* Quick Price Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => handlePriceChange(0, 2500)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              filters.maxPrice === 2500 && filters.minPrice === 0
                ? 'bg-stone-900 text-white'
                : 'glass-panel-subtle text-stone-600 hover:bg-white'
            }`}
          >
            Under $2,500
          </button>
          <button
            onClick={() => handlePriceChange(2500, 3500)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              filters.minPrice === 2500 && filters.maxPrice === 3500
                ? 'bg-stone-900 text-white'
                : 'glass-panel-subtle text-stone-600 hover:bg-white'
            }`}
          >
            $2,500 – $3,500
          </button>
          <button
            onClick={() => handlePriceChange(3500, 6000)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              filters.minPrice === 3500 && filters.maxPrice === 6000
                ? 'bg-stone-900 text-white'
                : 'glass-panel-subtle text-stone-600 hover:bg-white'
            }`}
          >
            $3,500+
          </button>
        </div>
      </div>

      {/* Seating Capacity */}
      <div className="space-y-2.5 pt-4 border-t border-stone-200/50">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Seating Capacity
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {SEATING_OPTIONS.map((opt) => {
            const isSelected = filters.seatingCapacity.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleSeating(opt.value)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'glass-panel-subtle text-stone-700 hover:bg-white'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-2.5 pt-4 border-t border-stone-200/50">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Color Palette
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((col) => {
            const isSelected = filters.colors.some((c) =>
              col.name.toLowerCase().includes(c.toLowerCase())
            );
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name.split(' / ')[0])}
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'glass-panel-subtle text-stone-700 hover:bg-white'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="text-[11px] truncate max-w-[100px]">{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Firmness Comfort */}
      <div className="space-y-2 pt-4 border-t border-stone-200/50">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Cushion Feel & Firmness
        </label>
        <div className="space-y-1">
          {FIRMNESS_OPTIONS.map((firm) => {
            const isChecked = filters.firmness.includes(firm);
            return (
              <label
                key={firm}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFirmness(firm)}
                  className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900 cursor-pointer"
                />
                <span>{firm}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Style Aesthetics */}
      <div className="space-y-2 pt-4 border-t border-stone-200/50">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Aesthetic Style
        </label>
        <div className="space-y-1">
          {STYLE_OPTIONS.map((st) => {
            const isChecked = filters.style.includes(st);
            return (
              <label
                key={st}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleStyle(st)}
                  className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900 cursor-pointer"
                />
                <span>{st}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Features & Architecture */}
      <div className="space-y-2 pt-4 border-t border-stone-200/50">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
          Atelier Features
        </label>
        <div className="space-y-1">
          {FEATURE_OPTIONS.map((feat) => {
            const isChecked = filters.features.includes(feat);
            return (
              <label
                key={feat}
                className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFeature(feat)}
                  className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900 cursor-pointer"
                />
                <span className="line-clamp-1">{feat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-4 border-t border-stone-200/50">
        <label className="flex items-center justify-between text-xs font-semibold text-stone-900 cursor-pointer">
          <span>In-Stock For Immediate Dispatch</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
