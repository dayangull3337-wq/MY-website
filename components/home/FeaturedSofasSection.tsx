'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { GlassTabs } from '@/components/ui/GlassTabs';
import { GlassButton } from '@/components/ui/GlassButton';
import { ArrowRight, Sparkles, Flame, Star, Layers, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FeaturedSofasSection() {
  const [activeTab, setActiveTab] = useState('curated');

  const tabs = [
    { id: 'curated', label: 'All 4-Seater L-Shapes', icon: <Crown className="w-3.5 h-3.5" /> },
    { id: 'boucle', label: 'Alpine Bouclé', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'leather', label: 'Tuscan Leather', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'bestsellers', label: 'Best Sellers', icon: <Flame className="w-3.5 h-3.5" /> },
  ];

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'boucle':
        return INITIAL_PRODUCTS.filter((p) => p.primaryMaterial.toLowerCase().includes('bouclé') || p.variants.some(v => v.material.toLowerCase().includes('bouclé'))).slice(0, 6);
      case 'bestsellers':
        return INITIAL_PRODUCTS.filter((p) => p.isBestSeller || p.rating >= 4.93).slice(0, 6);
      case 'leather':
        return INITIAL_PRODUCTS.filter((p) => p.primaryMaterial.toLowerCase().includes('leather') || p.variants.some(v => v.material.toLowerCase().includes('leather'))).slice(0, 6);
      case 'curated':
      default:
        return INITIAL_PRODUCTS.slice(0, 6);
    }
  }, [activeTab]);

  return (
    <section id="featured-sofas" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Signature 4-Seater Living Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
              4-Seater L-Shape Sofas & Lounges
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-lg">
              Each 4-seater L-shape sofa is individually handcrafted with kiln-dried beechwood, deep chaise loungers, and high-definition natural textiles.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <GlassTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </motion.div>

        {/* Product Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <ProductCard
                  product={product}
                  priority={idx < 3}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/sofas">
            <GlassButton
              variant="secondary"
              size="lg"
              className="px-8 shadow-sm hover:shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Browse All 4-Seater L-Shape Sofas ({INITIAL_PRODUCTS.length} Models)
            </GlassButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
