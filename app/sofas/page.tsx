'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import { SofaFilterState, SofaSortOption, Product } from '@/types/product';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassDrawer } from '@/components/ui/GlassDrawer';
import { Filter, Sparkles, SlidersHorizontal } from 'lucide-react';

const INITIAL_FILTERS: SofaFilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: 6000,
  colors: [],
  seatingCapacity: [],
  firmness: [],
  style: [],
  features: [],
  inStockOnly: false,
};

function AllSofasContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as any) || 'all';

  const [filters, setFilters] = useState<SofaFilterState>({
    ...INITIAL_FILTERS,
    category: initialCategory,
  });
  const [sortOption, setSortOption] = useState<SofaSortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = INITIAL_PRODUCTS.filter((product) => {
      // Category
      if (filters.category !== 'all' && product.categorySlug !== filters.category) {
        return false;
      }

      // Price
      const effectivePrice = product.salePrice ?? product.basePrice;
      if (effectivePrice < filters.minPrice || effectivePrice > filters.maxPrice) {
        return false;
      }

      // Colors
      if (filters.colors.length > 0) {
        const matchesColor = product.variants.some((v) =>
          filters.colors.some((c) => v.colorName.toLowerCase().includes(c.toLowerCase()))
        );
        if (!matchesColor) return false;
      }

      // Seating capacity
      if (filters.seatingCapacity.length > 0) {
        const matchesSeating = filters.seatingCapacity.some((cap) => {
          if (cap >= 5) return product.seatingCapacity >= 5;
          return product.seatingCapacity === cap;
        });
        if (!matchesSeating) return false;
      }

      // Firmness
      if (filters.firmness.length > 0 && !filters.firmness.includes(product.firmness)) {
        return false;
      }

      // Style
      if (filters.style.length > 0 && !filters.style.includes(product.style)) {
        return false;
      }

      // Features
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feat) =>
          product.features.includes(feat)
        );
        if (!hasAllFeatures) return false;
      }

      // In stock
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      const priceA = a.salePrice ?? a.basePrice;
      const priceB = b.salePrice ?? b.basePrice;

      switch (sortOption) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.createdAt.localeCompare(a.createdAt);
        case 'popular':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'featured':
        default:
          return 0;
      }
    });
  }, [filters, sortOption]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 pb-6 border-b border-stone-200/60">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Veloura Atelier 2026</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950">
          4-Seater L-Shape Sofa Collection
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          Explore our exclusive 4-seater L-shape sectionals and modular corner suites, handcrafted with kiln-dried European hardwood frames, deep feather-down cushioning, and matching luxury ottomans.
        </p>

        {/* Mobile Filter Button */}
        <div className="mt-4 lg:hidden">
          <GlassButton
            variant="secondary"
            size="md"
            className="w-full justify-between"
            onClick={() => setIsMobileFilterOpen(true)}
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          >
            <span>Filter & Refine Sofas</span>
            <span className="text-xs bg-stone-900 text-white px-2 py-0.5 rounded-full font-bold">
              {filteredAndSortedProducts.length}
            </span>
          </GlassButton>
        </div>
      </div>

      {/* Main Content Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24 p-6 rounded-3xl glass-panel border border-stone-200/80 shadow-sm max-h-[85vh] overflow-y-auto scrollbar-thin">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResultsCount={filteredAndSortedProducts.length}
          />
        </div>

        {/* Product Grid Area (9 cols) */}
        <div className="lg:col-span-9">
          <ProductGrid
            products={filteredAndSortedProducts}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onResetFilters={handleResetFilters}
            itemsPerPage={12}
          />
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <GlassDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter & Refine Sofas"
        subtitle={`${filteredAndSortedProducts.length} models matching`}
        side="left"
        maxWidth="md"
        footer={
          <GlassButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            Show {filteredAndSortedProducts.length} Results
          </GlassButton>
        }
      >
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalResultsCount={filteredAndSortedProducts.length}
        />
      </GlassDrawer>
    </div>
  );
}

export default function AllSofasPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Loading Veloura Atelier Collection...
          </p>
        </div>
      }
    >
      <AllSofasContent />
    </Suspense>
  );
}
