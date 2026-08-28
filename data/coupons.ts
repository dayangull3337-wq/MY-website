import { Coupon } from '@/types/cart';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'VELOURA10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 1000,
    description: '10% off your entire atelier order',
    isActive: true,
  },
  {
    code: 'LUXURY100',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 1200,
    description: '£100 off orders over £1,200',
    isActive: true,
  },
  {
    code: 'SPRINGSOFA',
    discountType: 'fixed',
    discountValue: 200,
    minOrderAmount: 2000,
    description: '£200 off seasonal grand orders over £2,000',
    isActive: true,
  },
  {
    code: 'WELCOME50',
    discountType: 'fixed',
    discountValue: 50,
    minOrderAmount: 500,
    description: '£50 off first purchase welcome gift',
    isActive: true,
  },
];

export const COUPONS = INITIAL_COUPONS;
