'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils';
import { GlassDrawer } from '@/components/ui/GlassDrawer';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { Trash2, Plus, Minus, Tag, ShieldCheck, Truck, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totals,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const router = useRouter();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setTimeout(() => {
      const res = applyCoupon(couponInput);
      if (res) {
        setCouponInput('');
      }
      setIsApplyingCoupon(false);
    }, 200);
  };

  const handleProceedToCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const progressToFreeShipping = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <GlassDrawer
      isOpen={isOpen}
      onClose={closeCart}
      title="Atelier Shopping Bag"
      subtitle={`${items.length} ${items.length === 1 ? 'sofa' : 'sofas'} in your curation`}
      maxWidth="md"
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            {/* Totals Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(totals.subtotal)}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Promo Discount ({totals.appliedCoupon?.code})
                  </span>
                  <span>-{formatPrice(totals.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-stone-400" />
                  White-Glove Delivery
                </span>
                <span>
                  {totals.shipping === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase text-[10px]">Complimentary</span>
                  ) : (
                    formatPrice(totals.shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax (7.5%)</span>
                <span>{formatPrice(totals.estimatedTax, true)}</span>
              </div>

              <div className="pt-2 border-t border-stone-200/60 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-stone-950">Estimated Total</span>
                  <p className="text-[10px] text-stone-400">Duties, white-glove setup & VAT included</p>
                </div>
                <span className="text-lg font-extrabold text-stone-950">
                  {formatPrice(totals.total, true)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <GlassButton
                id="drawer-checkout-btn"
                variant="primary"
                size="lg"
                className="w-full shadow-lg"
                onClick={handleProceedToCheckout}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </GlassButton>

              <button
                onClick={closeCart}
                className="w-full text-center text-xs font-medium text-stone-500 hover:text-stone-900 py-1.5 transition-colors cursor-pointer"
              >
                Continue Browsing Collection
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 pt-1 border-t border-stone-200/40">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" /> 10-Year Warranty
              </span>
              <span>·</span>
              <span>100-Day In-Home Trial</span>
              <span>·</span>
              <span>Secure SSL Checkout</span>
            </div>
          </div>
        ) : undefined
      }
    >
      {/* Free Shipping Progress Indicator */}
      {items.length > 0 && (
        <div className="mb-6 p-3.5 rounded-2xl glass-panel-subtle border border-stone-200/70">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-stone-800 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-700" />
              {totals.freeShippingQualified ? (
                <span className="text-emerald-700">You qualify for Complimentary White-Glove In-Room Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-stone-950">{formatPrice(totals.amountNeededForFreeShipping)}</strong> more for free white-glove setup
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-stone-500">{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                totals.freeShippingQualified ? 'bg-emerald-600' : 'bg-stone-800'
              }`}
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>
      )}

      {/* Cart Items List */}
      {items.length > 0 ? (
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl glass-panel border border-stone-200/70 shadow-xs flex gap-3.5 transition-all"
            >
              {/* Product Thumbnail */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/50">
                <Image
                  src={item.variant.image}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/sofas/${item.product.slug}`}
                      onClick={closeCart}
                      className="text-xs font-bold text-stone-900 hover:text-stone-700 line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Variant & Config details */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-600 font-medium">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300 flex-shrink-0"
                        style={{ backgroundColor: item.variant.colorHex }}
                      />
                      {item.variant.colorName}
                    </span>
                    {item.configuration && (
                      <>
                        <span className="text-stone-300">·</span>
                        <span className="text-[11px] text-stone-500">{item.configuration}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Price & Quantity Controls */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-stone-900">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>

                  <div className="flex items-center gap-2 rounded-xl bg-stone-100/90 border border-stone-200/80 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold text-stone-900 px-1 min-w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Coupon Code Section */}
          <div className="pt-2">
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <div>
                    <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-emerald-700">{appliedCoupon.description}</p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <GlassInput
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. VELOURA10)"
                  className="py-2 text-xs uppercase"
                  leftIcon={<Tag className="w-3.5 h-3.5" />}
                />
                <GlassButton
                  type="submit"
                  size="sm"
                  variant="secondary"
                  isLoading={isApplyingCoupon}
                  disabled={!couponInput.trim()}
                >
                  Apply
                </GlassButton>
              </form>
            )}
            <div className="flex items-center gap-1.5 mt-1.5 px-1 text-[11px] text-stone-400">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>
                Try codes: <code className="text-stone-700 font-bold">VELOURA10</code> (10% off) or{' '}
                <code className="text-stone-700 font-bold">LUXURY100</code> ($100 off)
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-stone-400 mb-4 border border-stone-200/60 shadow-sm">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-900 tracking-tight">Your bag is empty</h3>
          <p className="text-xs text-stone-500 max-w-xs mt-1.5 leading-relaxed">
            Explore our bespoke collection of handcrafted sectionals, curved silhouettes, and modular lounges.
          </p>
          <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => {
                closeCart();
                router.push('/sofas');
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Browse All Sofas
            </GlassButton>
            <GlassButton
              variant="glass"
              size="md"
              onClick={() => {
                closeCart();
                router.push('/categories/sectional');
              }}
            >
              Explore Grand Sectionals
            </GlassButton>
          </div>
        </div>
      )}
    </GlassDrawer>
  );
}
