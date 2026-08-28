'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlassDrawer } from '@/components/ui/GlassDrawer';
import { SOFA_CATEGORIES } from '@/data/categories';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  Heart,
  User,
  ShieldCheck,
  Compass,
  ArrowRight,
  ChevronRight,
  Palette,
  Package,
  Headphones,
  Bot,
  Camera,
} from 'lucide-react';
import { GlassBadge } from '@/components/ui/GlassBadge';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <GlassDrawer
      isOpen={isOpen}
      onClose={onClose}
      side="left"
      title="Veloura Atelier"
      subtitle="Luxury Sofas & Living Architecture"
      maxWidth="sm"
      footer={
        <div className="space-y-3">
          <Link
            href="/swatches"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold"
          >
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-700" />
              Order Free Fabric Swatches
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-2">
            <span>Client Concierge: +1 (800) 835-6872</span>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Quick Search Button */}
        <button
          onClick={() => {
            onClose();
            onOpenSearch();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel-subtle border border-stone-200/80 text-stone-500 text-xs text-left"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Search sofas, fabrics, or styles...</span>
        </button>

        {/* AI Sofa Assistant Highlight */}
        <Link
          href="/ai-assistant"
          onClick={onClose}
          className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-900 text-white shadow-md relative overflow-hidden group"
        >
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-amber-300">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight">AI Sofa Concierge</span>
              <GlassBadge size="sm" variant="sale" className="bg-amber-400 text-stone-900 font-extrabold text-[9px] px-1.5 py-0">
                Gemini 3.7
              </GlassBadge>
            </div>
            <p className="text-[11px] text-stone-300 truncate">Instant room styling & sofa matching</p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Main Navigation Links */}
        <div className="space-y-1">
          <Link
            href="/sofas"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              pathname === '/sofas' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            <span>All Sofas Catalog</span>
            <span className="text-xs text-stone-400 font-normal">20 Curations</span>
          </Link>

          <Link
            href="/photos"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname === '/photos' ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-600" />
              Full HD Photo Studio
            </span>
            <GlassBadge size="sm" variant="success">HD</GlassBadge>
          </Link>

          <Link
            href="/swatches"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-stone-500" />
              Fabric & Leather Swatches
            </span>
            <GlassBadge size="sm" variant="new">Free</GlassBadge>
          </Link>

          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-stone-500" />
              Saved Wishlist
            </span>
            {mounted && wishlistCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        {/* Categories Collapsible */}
        <div className="pt-2 border-t border-stone-200/60">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Shop by Category
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {SOFA_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100/70 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  {cat.name}
                </span>
                <span className="text-[11px] text-stone-400">{cat.productCount} models</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User Account / Admin Section */}
        <div className="pt-4 border-t border-stone-200/60 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 px-2 block mb-2">
            Client Account
          </span>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <User className="w-4 h-4 text-stone-500" />
            <span>
              {mounted && isAuthenticated ? `${user?.firstName}'s Atelier Profile` : 'Sign In / Register'}
            </span>
          </Link>

          <Link
            href="/account/orders"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <Package className="w-4 h-4 text-stone-500" />
            <span>Order History & Tracking</span>
          </Link>

          {mounted && isAdmin && (
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/80 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Admin Atelier Dashboard</span>
            </Link>
          )}
        </div>
      </div>
    </GlassDrawer>
  );
}
