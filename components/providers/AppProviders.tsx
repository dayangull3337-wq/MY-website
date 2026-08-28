'use client';

import React from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { AuthProvider } from '@/context/AuthContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/product/QuickViewModal';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <CartProvider>
              <QuickViewProvider>
                <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
                  <AnnouncementBar />
                  <Navbar />
                  <main className="flex-1 w-full">{children}</main>
                  <Footer />
                  <CartDrawer />
                  <QuickViewModal />
                </div>
              </QuickViewProvider>
            </CartProvider>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
