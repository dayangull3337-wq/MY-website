'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { GlassButton } from '@/components/ui/GlassButton';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'aurelia-grand',
    title: 'The Aurelia Grand',
    subtitle: 'Sculptural 4-Seater Deep Down Sectional',
    badge: 'London Atelier Exclusive',
    image: 'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=3840&q=95',
  },
  {
    id: 'seraphina-curved',
    title: 'The Seraphina Curved',
    subtitle: 'Architectural Crescent 4-Seater Lounge',
    badge: 'Bespoke Italian Velvet',
    image: 'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=3840&q=95',
  },
  {
    id: 'montauk-modular',
    title: 'The Montauk Modular',
    subtitle: 'Spacious 5-Piece Cloud Sink Sectional',
    badge: 'Organic Belgian Linen',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=3840&q=95',
  },
  {
    id: 'kensington-leather',
    title: 'The Kensington Aniline',
    subtitle: 'Hand-Tufted 4-Seater Saddle Leather Suite',
    badge: 'Full-Grain Tuscan Hide',
    image: 'https://images.pexels.com/photos/6758512/pexels-photo-6758512.jpeg?auto=compress&cs=tinysrgb&w=3840&q=95',
  },
];

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const activeSlide = HERO_SLIDES[activeSlideIndex];

  // Auto slide rotation every 7 seconds if not manually paused
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center overflow-hidden bg-stone-950 text-white"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* 1. Full-Bleed Ultra-HD Background Visual with Cinematic Motion */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeSlide.image}
              alt={`${activeSlide.title} luxury living room scene`}
              fill
              priority
              sizes="100vw"
              quality={95}
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft, Clean Gradient (Keeps photos bright and unobstructed while ensuring crisp text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-stone-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/40 to-transparent w-full md:w-2/3" />
      </div>

      {/* 2. Main Hero Content Container (Ultra Clean Editorial Layout) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl space-y-6">
          
          {/* Subtle London Atelier Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Veloura London • 2026 Collection
            </span>
          </motion.div>

          {/* Grand Typography Headline */}
          <motion.div
            key={`title-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] drop-shadow-md">
              Designed for the way you <span className="font-normal not-italic text-amber-100 underline decoration-amber-400/40 decoration-1 underline-offset-8">live.</span>
            </h1>
            <p className="text-stone-200 font-sans text-base sm:text-lg font-normal max-w-lg leading-relaxed pt-1 drop-shadow-xs">
              Bespoke 4-seater & sectional sofas handcrafted with solid European hardwood frames and certified cloud-sink down.
            </p>
          </motion.div>

          {/* Clean Primary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 pt-3"
          >
            <Link href="/sofas">
              <GlassButton
                id="hero-explore-collection-btn"
                variant="primary"
                size="xl"
                className="bg-amber-100 text-stone-950 hover:bg-white hover:text-black border-transparent shadow-xl font-bold px-7"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Collection
              </GlassButton>
            </Link>

            <Link href="/swatches">
              <GlassButton
                id="hero-free-swatches-btn"
                variant="glass"
                size="xl"
                className="bg-black/30 hover:bg-black/50 text-stone-100 border-white/20 backdrop-blur-md px-6"
              >
                Order Free Swatches
              </GlassButton>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 3. Subtle & Clean Slide Navigation Controls (Bottom Right / Corner) */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-3">
        {/* Slide Indicator Dots/Lines */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/15">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeSlideIndex === idx
                  ? 'w-6 bg-amber-300'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Minimal Prev / Next Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
