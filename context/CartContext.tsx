'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, SofaColorVariant } from '@/types/product';
import { CartItem, Coupon, CartTotals } from '@/types/cart';
import { calculateCartTotals } from '@/lib/utils';
import { useToast } from './ToastContext';
import { INITIAL_COUPONS } from '@/data/coupons';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totals: CartTotals;
  appliedCoupon: Coupon | null;
  coupon: Coupon | null;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, variant?: SofaColorVariant, configuration?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'veloura_cart_items';
const COUPON_STORAGE_KEY = 'veloura_applied_coupon';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const { success, error, info } = useToast();

  // Hydrate from localStorage after component mounts
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch {
      // ignore parsing error
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage only after hydration is complete
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon, isHydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    (product: Product, variant?: SofaColorVariant, configuration?: string, quantity = 1) => {
      const selectedVariant = variant || product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];
      const selectedConfig = configuration || product.configurations[0] || 'Standard';
      const unitPrice = (product.salePrice ?? product.basePrice) + (selectedVariant.priceModifier || 0);
      const compositeId = `${product.id}-${selectedVariant.id}-${selectedConfig}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === compositeId);
        if (existingIndex > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIndex].quantity + quantity;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          return updated;
        } else {
          return [
            ...prevItems,
            {
              id: compositeId,
              product,
              variant: selectedVariant,
              configuration: selectedConfig,
              quantity,
              unitPrice,
            },
          ];
        }
      });

      success('Added to Cart', `${product.name} (${selectedVariant.colorName}) is in your bag.`);
      setIsOpen(true);
    },
    [success]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      setItems((prev) => {
        const target = prev.find((i) => i.id === itemId);
        if (target) {
          info('Removed from bag', `${target.product.name} was removed.`);
        }
        return prev.filter((i) => i.id !== itemId);
      });
    },
    [info]
  );

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.min(10, Math.max(1, quantity)) } : item))
      );
    }
  }, []);

  const applyCoupon = useCallback(
    (code: string): boolean => {
      const cleanCode = code.trim().toUpperCase();
      const match = INITIAL_COUPONS.find((c) => c.code === cleanCode && c.isActive);
      if (match) {
        setAppliedCoupon(match);
        success('Coupon Applied!', `${match.code}: ${match.description}`);
        return true;
      } else {
        error('Invalid Code', 'The promo code entered is either expired or unrecognized.');
        return false;
      }
    },
    [success, error]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    info('Coupon Removed', 'Discount removed from your bag summary.');
  }, [info]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const totals = useMemo(() => calculateCartTotals(items, appliedCoupon), [items, appliedCoupon]);
  const totalItemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totals,
        appliedCoupon,
        coupon: appliedCoupon,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shippingFee: totals.shipping,
        tax: totals.estimatedTax,
        total: totals.total,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

