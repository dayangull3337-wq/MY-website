'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SOFA_CATEGORIES } from '@/data/categories';
import { INITIAL_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function CategoryBentoSection() {
  return (
    <section id="shop-by-category" className="py-16 md:py-20 bg-stone-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Architectural Silhouettes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
              Shop by Category
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-lg">
              Explore bespoke seating designed around modular flexibility, sculptural curves, and deep conversational comfort.
            </p>
          </div>

          <Link
            href="/sofas"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-stone-700 underline underline-offset-4"
          >
            Explore All 4-Seater L-Shapes ({INITIAL_PRODUCTS.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOFA_CATEGORIES.map((cat, idx) => {
            const catProds = INITIAL_PRODUCTS.filter((p) => p.categorySlug === cat.slug);
            const count = catProds.length || 2;
            const minPrice = catProds.length > 0 ? Math.min(...catProds.map((p) => p.salePrice ?? p.basePrice)) : 2190;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group relative flex flex-col rounded-3xl glass-panel border border-stone-200/80 hover:border-stone-400/60 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 h-full"
                >
                  {/* Category Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={cat.heroImage}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Pill: Model Count */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full glass-panel-dark text-white text-[11px] font-semibold">
                      {count} Models
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-serif text-xl font-bold text-stone-950 group-hover:text-stone-700 transition-colors">
                          {cat.name}
                        </h3>
                        <span className="text-xs text-stone-500 font-medium">
                          From {formatPrice(minPrice)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-stone-950">
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                        Explore Models
                      </span>
                      <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
