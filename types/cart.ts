import { Product, SofaColorVariant } from './product';

export interface CartItem {
  id: string; // composite item ID (productId + variantId + configuration)
  product: Product;
  variant: SofaColorVariant;
  configuration: string;
  quantity: number;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 150 for $150 off
  minOrderAmount?: number;
  description: string;
  isActive: boolean;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  estimatedTax: number;
  total: number;
  appliedCoupon: Coupon | null;
  freeShippingQualified: boolean;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}
