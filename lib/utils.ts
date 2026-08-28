import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItem, Coupon, CartTotals } from "@/types/cart"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, includeDecimals = false): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const FREE_SHIPPING_THRESHOLD = 1500;

export function calculateCartTotals(items: CartItem[], appliedCoupon: Coupon | null): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon && appliedCoupon.isActive) {
    if (!appliedCoupon.minOrderAmount || subtotal >= appliedCoupon.minOrderAmount) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      } else {
        discount = Math.min(subtotal, appliedCoupon.discountValue);
      }
    }
  }

  const freeShippingQualified = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = items.length === 0 ? 0 : freeShippingQualified ? 0 : 85;
  
  const taxableAmount = Math.max(0, subtotal - discount);
  // UK 20% VAT (standard included or broken out)
  const estimatedTax = items.length === 0 ? 0 : Math.round(taxableAmount * 0.20 * 100) / 100;
  
  const total = Math.max(0, subtotal - discount + shipping);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    discount,
    shipping,
    estimatedTax,
    total,
    appliedCoupon,
    freeShippingQualified,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping,
  };
}

export function generateOrderNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `VEL-UK-${randomNum}`;
}

export function getEstimatedDeliveryDate(daysFromNow = 5): string {
  const target = new Date();
  target.setDate(target.getDate() + daysFromNow);
  return target.toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

