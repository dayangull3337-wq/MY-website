'use client';

import React, { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SofaSortOption } from '@/types/product';
import { GlassInput } from '@/components/ui/GlassInput';
import { Search, Sparkles } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [sortOption, setSortOption] = useState<SofaSortOption>('featured');

  const matchingProducts = useMemo(() => {
    if (!query.trim()) return INITIAL_PRODUCTS;
    const q = query.toLowerCase();
    return INITIAL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.primaryMaterial.toLowerCase().includes(q) ||
        p.variants.some((v) => v.colorName.toLowerCase().includes(q) || v.material.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel-subtle border border-stone-300 text-stone-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Atelier Catalog Search</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-950">
          Find Your Desired Sofa Silhouette
        </h1>

        <div className="relative">
          <GlassInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, fabric (Bouclé, Velvet, Leather), color, or category..."
            leftIcon={<Search className="w-4 h-4 text-stone-500" />}
            className="py-3.5 text-sm"
          />
        </div>
      </div>

      {/* Results */}
      <div className="pt-6">
        <ProductGrid
          products={matchingProducts}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onResetFilters={() => setQuery('')}
        />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Searching Atelier Catalog...
          </p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
