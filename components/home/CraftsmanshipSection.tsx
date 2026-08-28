'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlassButton } from '@/components/ui/GlassButton';
import { ShieldCheck, Sparkles, Feather, Compass, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function CraftsmanshipSection() {
  const craftPillars = [
    {
      icon: <Layers className="w-5 h-5 text-stone-900" />,
      title: 'Kiln-Dried European Hardwood',
      description:
        'Sustainably sourced beechwood frames dried to 8% internal moisture content, reinforced with double-doweled corner blocks for generations of wobble-free resilience.',
    },
    {
      icon: <Feather className="w-5 h-5 text-stone-900" />,
      title: '80/20 White Goose Down Loft',
      description:
        'Certified hypoallergenic goose down encased in channel-quilted, feather-proof ticking over high-resiliency memory core for instant cloud-sink comfort.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-stone-900" />,
      title: 'Tactile European Upholstery',
      description:
        'Italian alpine bouclés with 60,000+ Martindale rub counts, liquid-repelling velvet, and semi-aniline Tuscan hides that develop a rich organic patina over decades.',
    },
    {
      icon: <Compass className="w-5 h-5 text-stone-900" />,
      title: 'Engineered Ergonomic Geometry',
      description:
        'Precision 28" seat depths, 17" loft heights, and sinuous spring suspension arrays calibrated specifically for conversational relaxation and deep reclining.',
    },
  ];

  return (
    <section id="atelier-craftsmanship" className="py-20 md:py-28 bg-stone-950 text-stone-100 relative overflow-hidden">
      {/* Background visual accents */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-stone-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Architecture of Pure Comfort</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-50 leading-[1.15]">
                Meticulously crafted to be the center of your residence.
              </h2>
              <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed max-w-xl">
                We believe a sofa is not merely furniture—it is the grounding architectural foundation of your home. Every curve, stitch, and spring is resolved to architectural standards.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {craftPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: 'rgba(217, 119, 6, 0.4)' }}
                  className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800/90 space-y-2.5 backdrop-blur-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="text-sm font-bold text-stone-100 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/swatches">
                <GlassButton
                  variant="secondary"
                  size="lg"
                  className="bg-stone-100 text-stone-950 hover:bg-white shadow-xl"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Order Free Swatches (UK Delivery 2–3 Days)
                </GlassButton>
              </Link>

              <Link
                href="/about"
                className="text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-white underline underline-offset-4"
              >
                Read Our Craftsmanship Manifesto →
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Editorial Imagery Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85"
                alt="Veloura Handcrafted Seating Atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-700/60">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>10-Year Atelier Frame Warranty</span>
                </div>
                <p className="text-[11px] text-stone-300">
                  Every timber frame is serialized, inspected, and guaranteed against sagging or structural fatigue.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
