'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { SOFA_CATEGORIES } from '@/data/categories';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { SearchModal } from './SearchModal';
import { MobileNav } from './MobileNav';
import { GlassBadge } from '@/components/ui/GlassBadge';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Package,
  LogOut,
  LogIn,
  Palette,
  Bot,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const pathname = usePathname();
  const { totalItemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout, login } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-sm backdrop-blur-xl border-b border-black/5 py-3.5'
            : 'bg-[#fdfcfb]/85 backdrop-blur-md border-b border-black/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu & Desktop Brand */}
            <div className="flex items-center gap-3 lg:gap-8">
              {/* Mobile Hamburger */}
              <button
                id="mobile-nav-toggle-btn"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-full text-stone-800 hover:text-black hover:bg-black/5 transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo with Animation */}
              <BrandLogo size="md" />

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-4">
                <Link
                  href="/sofas"
                  className={`nav-link px-3.5 py-2 rounded-full transition-all ${
                    pathname === '/sofas'
                      ? 'text-[#1a1a1a] bg-black/5 font-bold'
                      : 'text-stone-600 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  Collection
                </Link>

                {/* Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                >
                  <button
                    className={`nav-link flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                      pathname.startsWith('/categories')
                        ? 'text-[#1a1a1a] bg-black/5 font-bold'
                        : 'text-stone-600 hover:text-[#1a1a1a] hover:bg-black/5'
                    }`}
                  >
                    <span>Categories</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
                  </button>

                  <AnimatePresence>
                    {isCategoriesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-[560px] rounded-[32px] glass shadow-2xl border border-white/80 p-5 z-50 grid grid-cols-2 gap-3"
                      >
                        {SOFA_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.slug}`}
                            onClick={() => setIsCategoriesDropdownOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/90 border border-transparent hover:border-black/5 hover:shadow-xs transition-all group"
                          >
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/40">
                              <Image
                                src={cat.heroImage}
                                alt={cat.name}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-stone-900 group-hover:text-black">
                                  {cat.name}
                                </h4>
                                <span className="text-[10px] text-stone-400 font-medium">
                                  {cat.productCount} models
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                                {cat.tagline}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/photos"
                  className={`nav-link flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                    pathname === '/photos'
                      ? 'text-[#1a1a1a] bg-black/5 font-bold'
                      : 'text-stone-600 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-amber-600" />
                  <span>HD Photos</span>
                  <GlassBadge size="sm" variant="success" className="ml-0.5">Full HD</GlassBadge>
                </Link>

                <Link
                  href="/swatches"
                  className={`nav-link flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                    pathname === '/swatches'
                      ? 'text-[#1a1a1a] bg-black/5 font-bold'
                      : 'text-stone-600 hover:text-[#1a1a1a] hover:bg-black/5'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-stone-400" />
                  <span>Swatches</span>
                  <GlassBadge size="sm" variant="accent" className="ml-0.5">Free</GlassBadge>
                </Link>

                <Link
                  href="/ai-assistant"
                  className={`nav-link flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                    pathname === '/ai-assistant'
                      ? 'text-[#8f6e4d] bg-[#c4a484]/20 font-bold border border-[#c4a484]/30'
                      : 'text-stone-700 hover:text-[#8f6e4d] hover:bg-[#c4a484]/15'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8f6e4d]" />
                  <span>AI Stylist</span>
                </Link>
              </nav>
            </div>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle Button */}
              <button
                id="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/10 text-stone-600 hover:text-[#1a1a1a] text-xs font-medium transition-all cursor-pointer shadow-xs"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 text-stone-500" />
                <span className="hidden md:inline text-stone-400">Search sofas...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-black/5 rounded text-stone-500 border border-black/5">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Link */}
              <Link
                id="header-wishlist-link"
                href="/wishlist"
                className="relative p-2.5 rounded-full glass hover:bg-white border border-black/10 text-stone-700 hover:text-[#1a1a1a] transition-all cursor-pointer shadow-xs"
                aria-label="View Saved Sofas"
              >
                <Heart className="w-4 h-4" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1a1a1a] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                onMouseLeave={() => setIsAccountDropdownOpen(false)}
              >
                <Link
                  id="header-account-link"
                  href="/account"
                  className="flex items-center gap-1.5 p-2.5 rounded-full glass hover:bg-white border border-black/10 text-stone-700 hover:text-[#1a1a1a] transition-all shadow-xs"
                  aria-label="Client Account"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden xl:inline text-xs font-semibold text-stone-800">
                    {mounted && isAuthenticated ? user?.firstName : 'Account'}
                  </span>
                </Link>

                <AnimatePresence>
                  {isAccountDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-1.5 w-60 rounded-[28px] glass shadow-2xl border border-white/80 p-2 z-50 space-y-1"
                    >
                      <div className="px-3 py-2.5 border-b border-stone-200/60 mb-1">
                        <p className="text-xs font-bold text-stone-900">
                          {mounted && isAuthenticated ? `${user?.firstName} ${user?.lastName}` : 'Guest Atelier Visitor'}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {mounted && isAuthenticated ? user?.email : 'Sign in to access VIP pricing & trials'}
                        </p>
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-100 transition-colors"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        <span>Client Profile & Addresses</span>
                      </Link>

                      <Link
                        href="/account/orders"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-100 transition-colors"
                      >
                        <Package className="w-4 h-4 text-stone-400" />
                        <span>Orders & White-Glove Tracking</span>
                      </Link>

                      {mounted && isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-700" />
                          <span>Admin Atelier Console</span>
                        </Link>
                      )}

                      <div className="pt-1 border-t border-stone-200/50">
                        {mounted && isAuthenticated ? (
                          <button
                            onClick={() => {
                              logout();
                              setIsAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out of Atelier</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              login();
                              setIsAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-900 hover:bg-stone-100 transition-colors text-left cursor-pointer"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Quick VIP Sign In</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Drawer Trigger */}
              <button
                id="header-bag-btn"
                onClick={openCart}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] hover:bg-stone-800 text-white text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
                aria-label={`Open shopping bag with ${mounted ? totalItemCount : 0} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white text-[#1a1a1a] text-[10px] font-bold">
                  {mounted ? totalItemCount : 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
