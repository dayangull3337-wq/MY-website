'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, SofaColorVariant } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { ColorVariantPicker } from './ColorVariantPicker';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { GlassButton } from '@/components/ui/GlassButton';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'motion/react';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<SofaColorVariant>(
    product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0]
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const isSaved = isInWishlist(product.id);
  const effectivePrice = (product.salePrice ?? product.basePrice) + (selectedVariant.priceModifier || 0);
  const discountPercent = product.salePrice
    ? Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedVariant, product.configurations[0] || 'Standard', 1);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const [imgError, setImgError] = useState(false);

  const currentImage = imgError
    ? '/images/hero_luxury_sofa.jpg'
    : (isHovered && selectedVariant.hoverImage ? selectedVariant.hoverImage : selectedVariant.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-[32px] glass border border-white/80 hover:border-black/10 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Stage Container */}
      <div className="relative w-full aspect-[4/3] bg-stone-100/80 overflow-hidden">
        <Link href={`/sofas/${product.slug}`} className="block w-full h-full">
          <Image
            src={currentImage}
            alt={`${product.name} - ${selectedVariant.colorName}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isOnSale && (
            <GlassBadge variant="sale" size="sm" className="shadow-xs font-bold">
              Save {discountPercent}%
            </GlassBadge>
          )}
          {product.isNewArrival && (
            <GlassBadge variant="accent" size="sm" className="shadow-xs font-bold">
              New Edition
            </GlassBadge>
          )}
          {product.isBestSeller && !product.isOnSale && (
            <GlassBadge variant="editorial" size="sm" className="shadow-xs font-bold">
              In Demand
            </GlassBadge>
          )}
        </div>

        {/* Top Floating Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={handleWishlistClick}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-xs cursor-pointer ${
              isSaved
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/80 hover:bg-white text-stone-700 hover:text-black border border-white/80'
            }`}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
          </button>

          <button
            id={`quickview-btn-${product.id}`}
            onClick={handleQuickViewClick}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-black backdrop-blur-md border border-white/80 shadow-xs transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 cursor-pointer hidden sm:flex items-center justify-center"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Overlay on desktop hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hidden sm:block">
          <GlassButton
            id={`quick-add-btn-${product.id}`}
            variant="primary"
            size="sm"
            className="w-full shadow-md bg-[#1a1a1a]/95 backdrop-blur-md"
            onClick={handleQuickAdd}
            
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Quick Add to Bag
          </GlassButton>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold tracking-widest uppercase text-[9px] text-[#8f6e4d]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#c4a484] text-[#c4a484]" />
              <span className="font-semibold text-stone-800 text-[11px]">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/sofas/${product.slug}`} className="block group-hover:text-stone-700 transition-colors">
            <h3 className="font-serif italic text-lg font-medium text-[#1a1a1a] tracking-tight leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Subheading */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-normal">
            {product.tagline}
          </p>

          {/* Key Attributes Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-900 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/60">
              4-Seater L-Shape
            </span>
            {product.configurations.some(c => c.toLowerCase().includes('footstool') || c.toLowerCase().includes('ottoman')) && (
              <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60">
                + Footstool
              </span>
            )}
            <span className="text-[9px] uppercase tracking-wider font-medium text-stone-600 px-2.5 py-0.5 rounded-full bg-black/5 border border-black/5">
              {product.firmness}
            </span>
          </div>
        </div>

        {/* Bottom: Color Variants & Price */}
        <div className="mt-4 pt-3.5 border-t border-black/5 flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex flex-col gap-0.5">
            <ColorVariantPicker
              variants={product.variants}
              selectedVariantId={selectedVariant.id}
              onSelect={(v) => setSelectedVariant(v)}
              size="sm"
              maxVisible={4}
            />
            <span className="text-[10px] text-stone-400 font-medium truncate max-w-[130px]">
              {selectedVariant.colorName}
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="flex items-baseline gap-1.5 justify-end">
              <span className="text-base sm:text-lg font-medium text-[#1a1a1a] tracking-tight">
                {formatPrice(effectivePrice)}
              </span>
              {product.salePrice && (
                <span className="text-xs text-stone-400 line-through font-normal">
                  {formatPrice(product.basePrice + (selectedVariant.priceModifier || 0))}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-[#8f6e4d] font-semibold block">
              Complimentary White-Glove
            </span>
          </div>
        </div>

        {/* Mobile Add to Bag button */}
        <div className="mt-3 sm:hidden">
          <GlassButton
            variant="secondary"
            size="sm"
            className="w-full text-xs"
            onClick={handleQuickAdd}
            
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Add to Bag
          </GlassButton>
        </div>
      </div>
    </motion.div>
  );
}
