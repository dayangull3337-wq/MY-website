'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { SofaColorVariant } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { GlassModal } from '@/components/ui/GlassModal';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { ProductImageZoom } from '@/components/product/ProductImageZoom';
import { ColorVariantPicker } from './ColorVariantPicker';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Plus,
  Minus,
  Ruler,
  Layers,
} from 'lucide-react';

export function QuickViewModal() {
  const { product, isOpen, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [customVariant, setCustomVariant] = useState<SofaColorVariant | null>(null);
  const [customImage, setCustomImage] = useState<string>('');
  const [customConfig, setCustomConfig] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  if (!product) return null;

  const defaultVariant =
    product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];
  const selectedVariant = customVariant || defaultVariant;
  const selectedImage = customImage || selectedVariant.image;
  const selectedConfig = customConfig || product.configurations[0] || 'Standard';

  const isSaved = isInWishlist(product.id);
  const unitPrice =
    (product.salePrice ?? product.basePrice) + (selectedVariant.priceModifier || 0);

  const handleVariantChange = (v: SofaColorVariant) => {
    setCustomVariant(v);
    setCustomImage(v.image);
  };

  const handleClose = () => {
    setCustomVariant(null);
    setCustomImage('');
    setCustomConfig('');
    setQuantity(1);
    closeQuickView();
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, selectedVariant, selectedConfig, quantity);
    setTimeout(() => {
      setIsAdding(false);
      handleClose();
    }, 400);
  };

  // Combine variant image + gallery images
  const allImages = [
    selectedVariant.image,
    ...(selectedVariant.hoverImage ? [selectedVariant.hoverImage] : []),
    ...selectedVariant.galleryImages,
  ].filter(Boolean);

  return (
    <GlassModal isOpen={isOpen} onClose={handleClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Left Column: Image Gallery */}
        <div className="space-y-3">
          <div className="relative">
            <ProductImageZoom
              src={selectedImage || selectedVariant.image}
              alt={product.name}
              aspectRatio="aspect-[4/3]"
              zoomScale={2.2}
              showLensHint={false}
            />
            {product.isOnSale && (
              <div className="absolute top-3 left-3 pointer-events-none z-10">
                <GlassBadge variant="sale" size="sm">
                  Seasonal Atelier Pricing
                </GlassBadge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomImage(img)}
                  className={`relative w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-stone-900 ring-2 ring-stone-900/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Customizer */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            {/* Header / Category & Rating */}
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold uppercase tracking-wider text-stone-500">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1.5 text-stone-700">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-xs">{product.rating}</span>
                <span className="text-stone-400 text-xs">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-stone-950 tracking-tight">{product.name}</h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">{product.tagline}</p>

            {/* Price block */}
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-2xl font-black text-stone-950 tracking-tight">
                {formatPrice(unitPrice)}
              </span>
              {product.salePrice && (
                <span className="text-sm text-stone-400 line-through">
                  {formatPrice(product.basePrice + (selectedVariant.priceModifier || 0))}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wide ml-1">
                White-Glove Included
              </span>
            </div>

            {/* Color Swatches */}
            <div className="mt-4 pt-4 border-t border-stone-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Fabric & Color:
                </span>
                <span className="text-stone-700 font-medium">
                  {selectedVariant.colorName} ({selectedVariant.material})
                </span>
              </div>
              <ColorVariantPicker
                variants={product.variants}
                selectedVariantId={selectedVariant.id}
                onSelect={handleVariantChange}
                size="md"
              />
            </div>

            {/* Configuration Select */}
            {product.configurations.length > 1 && (
              <div className="mt-4 space-y-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-stone-900 text-[11px]">
                  Atelier Orientation:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.configurations.map((config) => (
                    <button
                      key={config}
                      onClick={() => setCustomConfig(config)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedConfig === config
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'glass-panel-subtle text-stone-700 hover:bg-white border border-stone-200'
                      }`}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Specs Snapshot */}
            <div className="mt-4 p-3 rounded-2xl glass-panel-subtle border border-stone-200/60 grid grid-cols-2 gap-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Ruler className="w-3.5 h-3.5 text-stone-400" />
                <span>{product.dimensions.width}W × {product.dimensions.depth}D</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                <span>{product.firmness}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-stone-200/60">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 rounded-2xl bg-stone-100 border border-stone-200 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-xl hover:bg-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-stone-900 px-2 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-xl hover:bg-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <GlassButton
                variant="primary"
                size="lg"
                className="flex-1 shadow-lg"
                onClick={handleAddToCart}
                isLoading={isAdding}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Add {quantity > 1 ? `(${quantity})` : ''} to Bag · {formatPrice(unitPrice * quantity)}
              </GlassButton>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'glass-panel text-stone-700 hover:bg-white border-stone-200'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Deep link to Full Product Page */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" /> 10-Yr Warranty
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" /> 100-Day Trial
                </span>
              </div>

              <Link
                href={`/sofas/${product.slug}`}
                onClick={handleClose}
                className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-stone-700 underline"
              >
                Full Atelier Specs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GlassModal>
  );
}
