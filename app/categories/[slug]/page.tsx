'use client';

import React, { use, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SOFA_CATEGORIES } from '@/data/categories';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SofaSortOption } from '@/types/product';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = SOFA_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const [sortOption, setSortOption] = useState<SofaSortOption>('featured');

  const categoryProducts = useMemo(() => {
    let prods = INITIAL_PRODUCTS.filter((p) => p.categorySlug === slug);

    return prods.sort((a, b) => {
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
  }, [slug, sortOption]);

  const otherCategories = SOFA_CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-stone-200/80 shadow-lg bg-stone-950 text-white min-h-[320px] flex items-center p-8 sm:p-12">
        <Image
          src={category.heroImage}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category Collection · {categoryProducts.length} Models</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            {category.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-300" /> Complimentary In-Room Setup
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-amber-300" /> 100-Day In-Home Trial
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> 10-Year Timber Warranty
            </span>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-stone-950">
            Available {category.name} ({categoryProducts.length})
          </h2>
        </div>

        <ProductGrid
          products={categoryProducts}
          sortOption={sortOption}
          onSortChange={setSortOption}
          itemsPerPage={12}
        />
      </div>

      {/* Other Categories Directory */}
      <div className="pt-12 border-t border-stone-200/60 space-y-6">
        <h3 className="font-serif text-xl font-bold text-stone-950">
          Explore Other Sofa Silhouettes
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherCategories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className="p-4 rounded-2xl glass-panel border border-stone-200/80 hover:border-stone-400 hover:shadow-md transition-all text-center group bg-white/70"
            >
              <h4 className="text-sm font-bold text-stone-900 group-hover:text-stone-950">
                {c.name}
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {INITIAL_PRODUCTS.filter((p) => p.categorySlug === c.slug).length} models
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
