'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { useToast } from '@/context/ToastContext';
import {
  Palette,
  Check,
  Plus,
  Truck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface SwatchItem {
  id: string;
  name: string;
  material: string;
  colorHex: string;
  rubCount: string;
  origin: string;
  description: string;
  image: string;
  petFriendly: boolean;
}

const SWATCH_CATALOG: SwatchItem[] = [
  {
    id: 'sw-boucle-oatmeal',
    name: 'Oatmeal Alpine Bouclé',
    material: 'Italian Bouclé (92% Wool / 8% Poly)',
    colorHex: '#e8e2d5',
    rubCount: '65,000 Rubs',
    origin: 'Biella, Italy',
    description: 'Ultra-soft curly loop texture with high structural resilience.',
    image: 'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
  {
    id: 'sw-boucle-moss',
    name: 'Alpine Moss Bouclé',
    material: 'Italian Bouclé (92% Wool / 8% Poly)',
    colorHex: '#485743',
    rubCount: '65,000 Rubs',
    origin: 'Biella, Italy',
    description: 'Deep botanical green with subtle tactile depth.',
    image: 'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
  {
    id: 'sw-leather-cognac',
    name: 'Vintage Tuscan Cognac',
    material: 'Full-Grain Semi-Aniline Leather',
    colorHex: '#94542d',
    rubCount: '100,000+ Rubs',
    origin: 'Santa Croce, Tuscany',
    description: 'Supple European cowhide that patinas with natural warmth.',
    image: 'https://images.pexels.com/photos/7045712/pexels-photo-7045712.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
  {
    id: 'sw-leather-ebony',
    name: 'Charcoal Black Leather',
    material: 'Full-Grain Matte Leather',
    colorHex: '#2b2b2b',
    rubCount: '100,000+ Rubs',
    origin: 'Santa Croce, Tuscany',
    description: 'Matte architectural leather with subtle pebble grain.',
    image: 'https://images.pexels.com/photos/31737854/pexels-photo-31737854.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
  {
    id: 'sw-velvet-sandstone',
    name: 'Sandstone Velvet',
    material: 'Performance Stain-Shield Velvet',
    colorHex: '#c5b59e',
    rubCount: '80,000 Rubs',
    origin: 'Como, Italy',
    description: 'Liquid-repelling plush velvet with a rich warm sheen.',
    image: 'https://images.pexels.com/photos/37110858/pexels-photo-37110858.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
  {
    id: 'sw-velvet-terracotta',
    name: 'Terracotta Rust Velvet',
    material: 'Performance Stain-Shield Velvet',
    colorHex: '#ab5c44',
    rubCount: '80,000 Rubs',
    origin: 'Como, Italy',
    description: 'Warm earthen pigment with deep fiber pile.',
    image: 'https://images.pexels.com/photos/12498613/pexels-photo-12498613.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
  {
    id: 'sw-linen-chalk',
    name: 'Chalk White Slub Linen',
    material: 'Belgian Washed Slub Linen',
    colorHex: '#fbfaf8',
    rubCount: '45,000 Rubs',
    origin: 'Flanders, Belgium',
    description: 'Airy natural plant fiber with relaxed textural character.',
    image: 'https://images.pexels.com/photos/37110860/pexels-photo-37110860.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: false,
  },
  {
    id: 'sw-chenille-navy',
    name: 'Midnight Navy Chenille',
    material: 'Textured Woven Chenille',
    colorHex: '#1c2536',
    rubCount: '60,000 Rubs',
    origin: 'Ghent, Belgium',
    description: 'Deep dimensional weave with cozy yarn thickness.',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85',
    petFriendly: true,
  },
];

export default function SwatchesPage() {
  const [selectedSwatches, setSelectedSwatches] = useState<string[]>([
    'sw-boucle-oatmeal',
    'sw-leather-cognac',
    'sw-velvet-sandstone',
  ]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address form
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');

  const { success, error: toastError } = useToast();

  const toggleSwatch = (id: string) => {
    if (selectedSwatches.includes(id)) {
      setSelectedSwatches(selectedSwatches.filter((s) => s !== id));
    } else {
      if (selectedSwatches.length >= 6) {
        toastError('Kit Maximum', 'You can select up to 6 complimentary swatches per kit.');
        return;
      }
      setSelectedSwatches([...selectedSwatches, id]);
    }
  };

  const handleOrderSwatches = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSwatches.length === 0) {
      toastError('No Swatches Selected', 'Please select at least 1 fabric swatch.');
      return;
    }

    setIsOrdered(true);
    success('Swatch Kit Dispatched', 'Your curated fabric box is on its way via USPS Priority!');
  };

  const filteredSwatches =
    activeCategory === 'all'
      ? SWATCH_CATALOG
      : activeCategory === 'boucle'
      ? SWATCH_CATALOG.filter((s) => s.material.toLowerCase().includes('bouclé'))
      : activeCategory === 'leather'
      ? SWATCH_CATALOG.filter((s) => s.material.toLowerCase().includes('leather'))
      : activeCategory === 'velvet'
      ? SWATCH_CATALOG.filter((s) => s.material.toLowerCase().includes('velvet'))
      : SWATCH_CATALOG;

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-stone-200/80 bg-stone-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complimentary Atelier Sample Kit</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Order Free Swatches To Your Residence
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
            Experience our Italian bouclés, full-grain Tuscan leathers, and liquid-repelling velvets under your own living room lighting. Select up to <strong>6 complimentary samples</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-300" /> Free 2–3 Day USPS Priority
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" /> 100% Free · No Card Required
            </span>
          </div>
        </div>
      </div>

      {isOrdered ? (
        /* Success State */
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-stone-200/80 bg-white/90 shadow-xl text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950">
            Your Swatch Kit Is Being Prepared!
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We are assembling your <strong>{selectedSwatches.length} selected swatches</strong> into our signature embossed atelier box. It will arrive at <strong>{street}, {city}</strong> within 2–3 business days.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <Link href="/sofas">
              <GlassButton variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Sofas While You Wait
              </GlassButton>
            </Link>
          </div>
        </div>
      ) : (
        /* Selection and Checkout Flow */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Swatches Grid (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Swatches' },
                  { id: 'boucle', label: 'Italian Bouclé' },
                  { id: 'leather', label: 'Tuscan Leather' },
                  { id: 'velvet', label: 'Stain-Shield Velvet' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeCategory === tab.id
                        ? 'bg-stone-900 text-white'
                        : 'glass-panel text-stone-700 hover:bg-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold text-stone-900 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 self-start sm:self-auto">
                Selected: <span className="text-stone-950">{selectedSwatches.length} / 6</span>
              </div>
            </div>

            {/* Swatch Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSwatches.map((sw) => {
                const isSelected = selectedSwatches.includes(sw.id);
                return (
                  <div
                    key={sw.id}
                    onClick={() => toggleSwatch(sw.id)}
                    className={`p-4 rounded-3xl glass-panel border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-stone-950 ring-2 ring-stone-950/15 bg-white shadow-md'
                        : 'border-stone-200/80 bg-white/70 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Swatch Visual Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full border border-stone-300 shadow-inner"
                            style={{ backgroundColor: sw.colorHex }}
                          />
                          <div>
                            <h3 className="text-xs font-bold text-stone-950">{sw.name}</h3>
                            <span className="text-[11px] text-stone-500">{sw.origin}</span>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isSelected
                              ? 'bg-stone-900 text-white'
                              : 'bg-stone-100 text-stone-400 border border-stone-300'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">{sw.description}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                      <span>{sw.rubCount}</span>
                      {sw.petFriendly && (
                        <span className="text-emerald-700 font-semibold">● Pet & Family Safe</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Free Shipping Order Form (4 cols on lg) */}
          <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/90 shadow-md space-y-4 sticky top-24">
            <h3 className="font-serif text-lg font-bold text-stone-950 pb-2 border-b border-stone-200/60">
              Mailing Address & Kit Dispatch
            </h3>

            <p className="text-xs text-stone-500">
              We ship your custom sample box with tracking. 100% complimentary.
            </p>

            <form onSubmit={handleOrderSwatches} className="space-y-3">
              <GlassInput
                label="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Eleanor Vanderbilt"
              />

              <GlassInput
                label="Email (for shipment tracking)"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@residence.com"
              />

              <GlassInput
                label="Street Address"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="742 Pacific Heights Blvd"
              />

              <div className="grid grid-cols-2 gap-2">
                <GlassInput
                  label="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="San Francisco"
                />
                <GlassInput
                  label="ZIP Code"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="94109"
                />
              </div>

              <div className="pt-2">
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="xl"
                  className="w-full shadow-lg"
                  isLoading={isSubmitting}
                  leftIcon={<Package className="w-4 h-4" />}
                >
                  Order Free Swatch Box ({selectedSwatches.length})
                </GlassButton>
              </div>

              <span className="text-[11px] text-stone-400 text-center block pt-1">
                Zero shipping fees. Zero credit card needed.
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
