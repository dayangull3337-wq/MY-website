'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, ArrowRight, Clock, Star } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { GlassBadge } from '@/components/ui/GlassBadge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = 'veloura_recent_searches';

const POPULAR_SEARCHES = [
  'Aurelia Grand Sectional',
  'Curved Italian Velvet',
  'Modular Pit Lounge',
  'Cognac Leather Recliner',
  'Bouclé 3-Seater',
  'Apartment Sofa Under 2000',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return [];
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // Smart Search parsing
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Parse natural language price queries e.g. "under 2500" or "under $3000"
    const priceMatch = q.match(/under\s*\$?(\d+)/i);
    const maxPrice = priceMatch ? parseInt(priceMatch[1], 10) : null;
    const cleanQ = q.replace(/under\s*\$?(\d+)/i, '').trim();

    return INITIAL_PRODUCTS.filter((product) => {
      const effectivePrice = product.salePrice ?? product.basePrice;
      if (maxPrice !== null && effectivePrice > maxPrice) {
        return false;
      }

      if (!cleanQ) return true;

      const words = cleanQ.split(/\s+/).filter(Boolean);
      return words.every((word) => {
        const inName = product.name.toLowerCase().includes(word);
        const inCategory = product.categoryName.toLowerCase().includes(word);
        const inTagline = product.tagline.toLowerCase().includes(word);
        const inMaterial = product.primaryMaterial.toLowerCase().includes(word);
        const inStyle = product.style.toLowerCase().includes(word);
        const inColors = product.variants.some((v) => v.colorName.toLowerCase().includes(word));
        const inFeatures = product.features.some((f) => f.toLowerCase().includes(word));

        return inName || inCategory || inTagline || inMaterial || inStyle || inColors || inFeatures;
      });
    }).slice(0, 6);
  }, [query]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-3xl rounded-3xl glass-panel shadow-2xl border border-white/80 overflow-hidden z-10 p-5 sm:p-7"
          >
            {/* Input Header */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-6">
              <Search className="absolute left-4 w-5 h-5 text-stone-400" />
              <input
                ref={inputRef}
                id="global-search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, color, style or e.g. 'beige sectional under 3000'..."
                className="w-full pl-12 pr-24 py-4 rounded-2xl glass-input text-base text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all shadow-inner"
              />
              <div className="absolute right-3 flex items-center gap-2">
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                    aria-label="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-tight transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Smart Query Assistant prompt hint */}
            {query.length > 0 && (
              <div className="flex items-center gap-2 mb-4 px-1 text-xs text-stone-500">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  Showing instant matches for <strong className="text-stone-800 font-semibold">&ldquo;{query}&rdquo;</strong>
                </span>
              </div>
            )}

            {/* Live Results */}
            {query.length > 0 ? (
              <div className="space-y-3">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
                    {searchResults.map((product) => {
                      const defaultVariant = product.variants[0];
                      return (
                        <Link
                          key={product.id}
                          href={`/sofas/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 hover:bg-white border border-stone-200/60 hover:border-stone-400/50 hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                            <Image
                              src={defaultVariant.image}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <GlassBadge size="sm" variant="default">
                                {product.categoryName}
                              </GlassBadge>
                              {product.isOnSale && (
                                <GlassBadge size="sm" variant="sale">
                                  Sale
                                </GlassBadge>
                              )}
                            </div>
                            <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-stone-700">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs mt-0.5">
                              <span className="font-bold text-stone-900">
                                {formatPrice(product.salePrice ?? product.basePrice)}
                              </span>
                              {product.salePrice && (
                                <span className="text-stone-400 line-through text-[11px]">
                                  {formatPrice(product.basePrice)}
                                </span>
                              )}
                              <span className="text-stone-400">·</span>
                              <span className="flex items-center gap-0.5 text-amber-700 font-medium">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {product.rating}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 px-4 bg-white/40 rounded-2xl border border-dashed border-stone-200">
                    <p className="text-stone-600 font-medium text-sm">
                      No sofas matching &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-stone-400 text-xs mt-1">
                      Try searching by category (e.g. &apos;Sectional&apos;, &apos;Curved&apos;), color (&apos;Bouclé&apos;, &apos;Cognac&apos;), or price range.
                    </p>
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="pt-3 border-t border-stone-200/50 flex justify-end">
                    <button
                      onClick={handleSearchSubmit}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-stone-950 transition-colors"
                    >
                      View all matching results <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Recent Searches & Popular Suggestions */
              <div className="space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Recent Searches
                      </span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-[11px] text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSuggestionClick(term)}
                          className="px-3 py-1.5 rounded-xl glass-panel-subtle text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-white border border-stone-200/60 transition-all flex items-center gap-1.5"
                        >
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Popular Curations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white text-xs font-medium text-stone-800 border border-stone-200/70 hover:border-stone-400/60 hover:shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3 text-stone-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
