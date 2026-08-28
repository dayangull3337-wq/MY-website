'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import {
  Heart,
  ShoppingBag,
  Trash2,
  Share2,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { success } = useToast();

  const handleMoveToBag = (product: any) => {
    addItem(product, product.variants[0], product.configurations[0], 1);
    removeFromWishlist(product.id);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Link Copied', 'Your bespoke wishlist link has been copied to clipboard.');
    }
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200/60">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Curated Residence Selection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-950">
            Saved Sofas & Atelier Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'sofa' : 'sofas'} saved to your bespoke profile.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl glass-panel text-stone-700 hover:text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Wishlist</span>
            </button>

            <button
              onClick={clearWishlist}
              className="px-3.5 py-2 rounded-xl glass-panel-subtle text-rose-600 hover:text-rose-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl glass-panel border border-stone-200/80 overflow-hidden bg-white/80 flex flex-col justify-between transition-all hover:shadow-lg"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={product.variants[0].image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full glass-panel text-stone-600 hover:text-rose-600 transition-colors shadow-sm cursor-pointer"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{product.categoryName}</span>
                    <div className="flex items-center gap-1 font-semibold text-stone-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <Link
                    href={`/sofas/${product.slug}`}
                    className="font-serif text-lg font-bold text-stone-950 hover:text-stone-700 block transition-colors"
                  >
                    {product.name}
                  </Link>

                  <p className="text-xs text-stone-600 line-clamp-2">{product.description}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 border-t border-stone-200/50 flex items-center justify-between gap-3 mt-4">
                <div>
                  <span className="text-base font-black text-stone-950 font-serif">
                    {formatPrice(product.salePrice ?? product.basePrice)}
                  </span>
                </div>

                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleMoveToBag(product)}
                  leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                >
                  Move to Bag
                </GlassButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full glass-panel-subtle flex items-center justify-center mx-auto text-stone-400 border border-stone-200">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-950">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Click the heart icon on any sofa to save your favorite silhouettes, fabrics, and configurations.
          </p>
          <Link href="/sofas">
            <GlassButton variant="primary" size="md" className="mt-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Sofas (20)
            </GlassButton>
          </Link>
        </div>
      )}
    </div>
  );
}
