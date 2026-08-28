'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlassButton } from '@/components/ui/GlassButton';
import { ShieldCheck, Truck, RotateCcw, Feather, Layers, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Manifesto Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-panel-subtle border border-stone-300 text-stone-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>The Veloura Craftsmanship Manifesto</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
          We believe the sofa is the grounding anchor of the home.
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Veloura was founded on a singular obsession: to eliminate compromise in residential seating. We combine old-world benchcrafted joinery with cloudlike ergonomic calibration and Italian tactile textiles.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-stone-200/80 shadow-2xl">
        <Image
          src="https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
          alt="Veloura Master Upholstery Atelier"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-950">
            Kiln-Dried European Beechwood
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every frame is precision milled from sustainably harvested European timber, dried down to 8% internal moisture to eliminate seasonal warping or joint creaking for life.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
            <Feather className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-950">
            80/20 White Goose Down Loft
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We encase certified hypoallergenic goose down over multi-density foam cores, delivering that signature initial cloud-sink feeling with deep supportive recovery.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-950">
            Complimentary White-Glove In-Room
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We never leave a heavy crate on your driveway. Two specialists bring your sofa into your chosen room, assemble modules, laser level, and haul away all debris.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white text-center space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold">
          Ready to experience Veloura in your residence?
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
          Explore our complete collection or order a complimentary custom fabric swatch box today.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/sofas">
            <GlassButton
              variant="primary"
              size="lg"
              className="bg-white text-stone-950 hover:bg-stone-100"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Collection (20)
            </GlassButton>
          </Link>
          <Link href="/swatches">
            <GlassButton
              variant="outline"
              size="lg"
              className="border-stone-700 text-white hover:bg-stone-800"
            >
              Order Free Swatches
            </GlassButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
