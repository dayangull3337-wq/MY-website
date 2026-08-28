'use client';

import React, { useState } from 'react';
import { Product, SofaSortOption } from '@/types/product';
import { ProductCard } from './ProductCard';
import { GlassSelect } from '@/components/ui/GlassSelect';
import { GlassButton } from '@/components/ui/GlassButton';
import { LayoutGrid, Grid3X3, ArrowUpDown, RotateCcw, PackageSearch } from 'lucide-react';

export interface ProductGridProps {
  products: Product[];
  sortOption: SofaSortOption;
  onSortChange: (sort: SofaSortOption) => void;
  onResetFilters?: () => void;
  itemsPerPage?: number;
}

const SORT_OPTIONS = [
  { label: 'Featured & Atelier Curated', value: 'featured' },
  { label: 'Best Selling First', value: 'best_selling' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Customer Rating', value: 'rating' },
  { label: 'Newest Releases', value: 'newest' },
];

export function ProductGrid({
  products,
  sortOption,
  onSortChange,
  onResetFilters,
  itemsPerPage = 12,
}: ProductGridProps) {
  const [columns, setColumns] = useState<'3' | '2'>('3');
  const [visibleCount, setVisibleCount] = useState<number>(itemsPerPage);

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar: Results Count, Grid Toggle, Sort Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60">
        <div className="text-xs text-stone-500">
          Showing <strong className="text-stone-900 font-bold">{displayedProducts.length}</strong> of{' '}
          <strong className="text-stone-900 font-bold">{products.length}</strong> atelier sofas
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Column Layout Switcher (Desktop) */}
          <div className="hidden sm:flex items-center p-1 rounded-xl glass-panel-subtle border border-stone-200/70 gap-1">
            <button
              onClick={() => setColumns('3')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                columns === '3' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-400 hover:text-stone-800'
              }`}
              aria-label="3-column grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns('2')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                columns === '2' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-400 hover:text-stone-800'
              }`}
              aria-label="2-column spacious grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="w-48 sm:w-56">
            <GlassSelect
              options={SORT_OPTIONS}
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SofaSortOption)}
              className="py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Grid of Sofas */}
      {displayedProducts.length > 0 ? (
        <>
          <div
            className={`grid grid-cols-1 gap-6 sm:gap-8 ${
              columns === '3'
                ? 'sm:grid-cols-2 lg:grid-cols-3'
                : 'sm:grid-cols-2 lg:grid-cols-2'
            }`}
          >
            {displayedProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>

          {/* Load More Pagination */}
          {hasMore && (
            <div className="pt-10 flex flex-col items-center justify-center gap-2">
              <GlassButton
                variant="secondary"
                size="lg"
                onClick={handleLoadMore}
                className="px-8 shadow-sm"
              >
                Load Next {Math.min(itemsPerPage, products.length - visibleCount)} Sofas
              </GlassButton>
              <span className="text-[11px] text-stone-400">
                {products.length - visibleCount} more models available
              </span>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-6 rounded-3xl glass-panel border border-dashed border-stone-300/80 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full glass-panel-subtle flex items-center justify-center text-stone-400 mb-4 border border-stone-200">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 tracking-tight">
            No sofas match your selected criteria
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mt-1.5 leading-relaxed">
            Try adjusting your price range, clearing color selections, or expanding the seating capacity options.
          </p>
          {onResetFilters && (
            <div className="mt-6">
              <GlassButton
                variant="primary"
                size="md"
                onClick={onResetFilters}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset All Filters
              </GlassButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
