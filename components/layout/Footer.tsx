'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SOFA_CATEGORIES } from '@/data/categories';
import { useToast } from '@/context/ToastContext';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassButton } from '@/components/ui/GlassButton';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Heart,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    success(
      'Atelier Gazette Subscription Confirmed',
      'Welcome to Veloura London. Your £50 first-order invitation code is WELCOME50.'
    );
  };

  return (
    <footer id="atelier-footer" className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Core Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-14 border-b border-stone-800">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 tracking-tight">
                UK White-Glove In-Room Delivery
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Full in-room placement across Great Britain, uncrating, precision leveling, and packaging removal.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 tracking-tight">
                100-Day In-Home Trial
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Experience the cloud-like sink and tactile bouclé in your natural living room light.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 tracking-tight">
                10-Year Atelier Frame Warranty
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Kiln-dried European beechwood engineered to endure generations of comfort.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-amber-300 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-100 tracking-tight">
                Complimentary Fabric Swatches
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Order up to 6 tactile samples delivered directly to your UK address at zero cost.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-stone-800">
          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="light" size="lg" />
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Veloura London is an independent British luxury atelier dedicated exclusively to the architecture of seating. Handcrafted with European hardwood frames, certified organic down, and bespoke Italian upholstery.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-stone-200 uppercase tracking-widest block mb-2">
                Join the Private Atelier Gazette
              </span>
              <p className="text-[11px] text-stone-400 mb-3">
                Receive private release previews, swatch kits, and a £50 gift towards your first sofa.
              </p>

              {isSubscribed ? (
                <div className="p-3.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Your subscription is active. Use promo code <strong>WELCOME50</strong>.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 rounded-full bg-stone-900 border border-stone-800 px-4 py-2.5 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-stone-600 transition-colors"
                  />
                  <GlassButton
                    type="submit"
                    size="sm"
                    variant="secondary"
                    className="bg-stone-100 text-stone-950 hover:bg-white text-xs px-5 rounded-full"
                  >
                    Subscribe
                  </GlassButton>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-4">
              Sofa Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {SOFA_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="hover:text-stone-100 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/sofas" className="text-amber-300 hover:text-amber-200 font-medium">
                  View Full Catalog (20) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-4">
              Atelier & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/photos" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-300 font-medium">Full HD Photo Studio</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">4K</span>
                </Link>
              </li>
              <li>
                <Link href="/swatches" className="hover:text-stone-100 transition-colors">
                  Order Fabric Swatches
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-stone-100 transition-colors">
                  AI Sofa Concierge
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-100 transition-colors">
                  Craftsmanship & Timber
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:text-stone-100 transition-colors">
                  Fabric & Leather Care Guide
                </Link>
              </li>
              <li>
                <Link href="/room-planner" className="hover:text-stone-100 transition-colors">
                  Sizing & Fit Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Concierge */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/account/orders" className="hover:text-stone-100 transition-colors">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-stone-100 transition-colors">
                  100-Day In-Home Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-stone-100 transition-colors">
                  10-Year Warranty Terms
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-stone-500 hover:text-amber-400 transition-colors">
                  Atelier Admin Portal
                </Link>
              </li>
              <li className="pt-2 text-stone-400">
                <span className="block text-[11px] text-stone-500">London Atelier Concierge:</span>
                <span className="text-xs text-stone-200 font-semibold">+44 (0)20 7946 0892</span>
                <span className="block text-[10px] text-stone-500">Mayfair, London • Mon–Sat 9am – 6pm GMT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Veloura Atelier Inc. All rights reserved. Exclusively seating architecture.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-stone-300 transition-colors">
              White-Glove Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
