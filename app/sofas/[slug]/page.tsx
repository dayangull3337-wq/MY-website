'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import { SofaColorVariant, Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { ColorVariantPicker } from '@/components/product/ColorVariantPicker';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductReviewsSection } from '@/components/product/ProductReviewsSection';
import { ProductImageZoom } from '@/components/product/ProductImageZoom';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { GlassTabs } from '@/components/ui/GlassTabs';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Ruler,
  Layers,
  Palette,
  CheckCircle2,
  Box,
  Feather,
  Info,
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState<SofaColorVariant>(
    product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(selectedVariant.image);
  const [selectedConfig, setSelectedConfig] = useState<string>(product.configurations[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeSpecTab, setActiveSpecTab] = useState<'dimensions' | 'craft' | 'delivery' | 'care'>('dimensions');
  const [isAdding, setIsAdding] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  // Sync recently viewed on mount
  useEffect(() => {
    addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  const isSaved = isInWishlist(product.id);
  const unitPrice =
    (product.salePrice ?? product.basePrice) + (selectedVariant.priceModifier || 0);

  const handleVariantChange = (v: SofaColorVariant) => {
    setSelectedVariant(v);
    setSelectedImage(v.image);
  };

  const handleAddToCart = () => {
    addItem(product, selectedVariant, selectedConfig, quantity);
  };

  // Compile all images for selected variant
  const allImages = [
    selectedVariant.image,
    ...(selectedVariant.hoverImage ? [selectedVariant.hoverImage] : []),
    ...selectedVariant.galleryImages,
  ].filter(Boolean);

  // Related products from same category or style
  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.style === product.style)
  ).slice(0, 3);

  const specTabs = [
    { id: 'dimensions', label: 'Dimensions & Fit Guide', icon: <Ruler className="w-3.5 h-3.5" /> },
    { id: 'craft', label: 'Hardwood & Down Craft', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'delivery', label: 'White-Glove Delivery', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'care', label: 'Care & Maintenance', icon: <Feather className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap pb-1">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <Link href="/sofas" className="hover:text-stone-900 transition-colors">
          All Sofas
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <Link
          href={`/categories/${product.categorySlug}`}
          className="hover:text-stone-900 transition-colors"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <span className="font-semibold text-stone-900 truncate">{product.name}</span>
      </nav>

      {/* Primary 2-Column Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Multi-Image Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stage Image with Interactive Auto-Zoom Loupe */}
          <div className="relative">
            <ProductImageZoom
              src={selectedImage || selectedVariant.image}
              alt={`${product.name} - ${selectedVariant.colorName}`}
              aspectRatio="aspect-[4/3]"
              zoomScale={2.5}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
              {product.isOnSale && (
                <GlassBadge variant="sale" size="md">
                  Seasonal Atelier Pricing
                </GlassBadge>
              )}
              {product.isNewArrival && (
                <GlassBadge variant="new" size="md">
                  New 2026 Edition
                </GlassBadge>
              )}
            </div>
          </div>

          {/* Thumbnail Selector Bar */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-stone-950 ring-2 ring-stone-950/20 scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Free Fabric Swatches Order Banner */}
          <div className="p-4 rounded-2xl glass-panel-subtle border border-stone-200/80 flex items-center justify-between gap-4 bg-amber-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-900 flex-shrink-0">
                <Palette className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  Touch the fabric in your home first
                </h4>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Order a complimentary 6-swatch tailored box. Delivered free in 2–3 business days.
                </p>
              </div>
            </div>
            <Link href="/swatches" className="flex-shrink-0">
              <GlassButton variant="secondary" size="sm" className="text-xs font-semibold">
                Get Swatches
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Right Column: Customizer & Checkout Actions (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Title & Ratings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {product.categoryName} · {product.style}
              </span>
              <a
                href="#customer-reviews"
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 underline transition-colors"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-stone-900">{product.rating}</span>
                <span className="text-stone-500">({product.reviewCount} reviews)</span>
              </a>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl glass-panel-subtle border border-stone-200/80 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-stone-950 tracking-tight">
                  {formatPrice(unitPrice)}
                </span>
                {product.salePrice && (
                  <span className="text-base text-stone-400 line-through">
                    {formatPrice(product.basePrice + (selectedVariant.priceModifier || 0))}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                Complimentary White-Glove In-Room Delivery & Setup
              </p>
            </div>

            <span className="text-xs font-semibold text-stone-500">
              {selectedVariant.stock > 0 ? (
                <span className="text-emerald-700 font-bold">● In Stock ({selectedVariant.stock} left)</span>
              ) : (
                <span className="text-amber-700 font-bold">● Made-to-Order</span>
              )}
            </span>
          </div>

          {/* 1. Color & Fabric Selector */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-900">
                1. Select Upholstery & Color:
              </span>
              <span className="font-semibold text-stone-700">
                {selectedVariant.colorName} ({selectedVariant.material})
              </span>
            </div>

            <ColorVariantPicker
              variants={product.variants}
              selectedVariantId={selectedVariant.id}
              onSelect={handleVariantChange}
              size="lg"
            />
          </div>

          {/* 2. Configuration Selector */}
          {product.configurations.length > 1 && (
            <div className="space-y-2.5 pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-900">
                2. Select Atelier Configuration:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.configurations.map((config) => {
                  const isSelected = selectedConfig === config;
                  return (
                    <button
                      key={config}
                      onClick={() => setSelectedConfig(config)}
                      className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                          : 'glass-panel text-stone-700 hover:bg-white border-stone-200/80'
                      }`}
                    >
                      <span>{config}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Quantity & Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-stone-200/60">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center gap-2 rounded-2xl bg-stone-100 border border-stone-200 p-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-xl hover:bg-white transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-stone-900 px-2 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-xl hover:bg-white transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <GlassButton
                id="pdp-add-to-bag-btn"
                variant="primary"
                size="xl"
                className="flex-1 shadow-xl"
                onClick={handleAddToCart}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Bag · {formatPrice(unitPrice * quantity)}
              </GlassButton>

              {/* Wishlist Button */}
              <button
                id="pdp-wishlist-toggle-btn"
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'glass-panel text-stone-700 hover:bg-white border-stone-200'
                }`}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-stone-600 border-t border-stone-200/50">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-700 flex-shrink-0" />
                <span>White-Glove Included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-stone-700 flex-shrink-0" />
                <span>100-Day In-Home Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-700 flex-shrink-0" />
                <span>10-Yr Hardwood Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Specification & Architecture Deep Dive */}
      <div className="pt-8 border-t border-stone-200/80 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="font-serif text-2xl font-bold text-stone-950">
            Atelier Technical Specifications
          </h3>
          <GlassTabs
            tabs={specTabs}
            activeTab={activeSpecTab}
            onChange={(tabId) => setActiveSpecTab(tabId as any)}
          />
        </div>

        {/* Tab 1: Dimensions & Fit Guide */}
        {activeSpecTab === 'dimensions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70">
            <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/50 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Overall Proportions
              </span>
              <p className="text-lg font-bold text-stone-900">
                {product.dimensions.width} W × {product.dimensions.depth} D × {product.dimensions.height} H
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/50 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Seat Depth & Height
              </span>
              <p className="text-lg font-bold text-stone-900">
                {product.dimensions.seatDepth} Deep / {product.dimensions.seatHeight} High
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/50 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Arm Width & Weight
              </span>
              <p className="text-lg font-bold text-stone-900">
                {product.dimensions.armWidth} Arms / {product.dimensions.weight}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/50 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Shipping Crates
              </span>
              <p className="text-lg font-bold text-stone-900">
                {product.dimensions.boxCount} Protective Modules
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Hardwood & Down Craft */}
        {activeSpecTab === 'craft' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-stone-700" /> Frame Construction
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.frameMaterial}. Reinforced with corner blocks, glued, doweled, and secured with heavy-gauge sinuous steel springs.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Feather className="w-4 h-4 text-stone-700" /> Cushion Cushioning
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.cushionFill}. Multi-layered high-resilience foam core wrapped in hypoallergenic duck & goose down chambers.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-700" /> Legs & Joinery
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.legFinish}. Precision recessed plinth with non-marking felt levelers.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: White-Glove Delivery */}
        {activeSpecTab === 'delivery' && (
          <div className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  1. Scheduled Delivery Window
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our logistics team coordinates a 2-hour appointment window with a 30-minute pre-arrival call.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  2. In-Room Placement
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Two specialists carry your sofa into your chosen room, navigate stairs/elevators, and align sections.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  3. Uncrating & Clean Up
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  All wooden crates, protective wrapping, and cardboard debris are removed and recycled completely.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Care & Maintenance */}
        {activeSpecTab === 'care' && (
          <div className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Maintaining Lifetime Resilience
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-600">
              {product.careInstructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Verified Customer Reviews */}
      <ProductReviewsSection product={product} />

      {/* Related Atelier Sofas */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-stone-200/80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-950">
                Complementary Atelier Silhouettes
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                More handcrafted models in {product.categoryName} and {product.style} aesthetics.
              </p>
            </div>
            <Link
              href="/sofas"
              className="text-xs font-bold text-stone-900 hover:text-stone-700 underline"
            >
              View Full Collection (20) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
