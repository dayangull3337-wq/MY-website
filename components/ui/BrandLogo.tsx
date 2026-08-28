'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  href?: string;
}

export function BrandLogo({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
  href = '/',
}: BrandLogoProps) {
  const isLight = variant === 'light';

  const sizeConfig = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[8px]', ring: 28 },
    md: { icon: 'w-9 h-9', text: 'text-xl sm:text-2xl', sub: 'text-[9px]', ring: 36 },
    lg: { icon: 'w-12 h-12', text: 'text-2xl sm:text-3xl', sub: 'text-[10px]', ring: 48 },
    xl: { icon: 'w-16 h-16', text: 'text-3xl sm:text-4xl', sub: 'text-xs', ring: 64 },
  }[size];

  const content = (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      className={`inline-flex items-center gap-3 group cursor-pointer select-none ${className}`}
    >
      {/* Animated Monogram Crest */}
      <div className={`relative ${sizeConfig.icon} flex items-center justify-center`}>
        {/* Animated Rotating Ambient Aura */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-600/30 via-stone-400/20 to-amber-200/40 blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
        />

        {/* Outer Orbit Ring with glowing node */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 40 40"
          variants={{
            hover: { rotate: 90, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke={isLight ? 'rgba(255,255,255,0.3)' : 'rgba(202,168,124,0.45)'}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <motion.circle
            cx="20"
            cy="2"
            r="1.8"
            fill={isLight ? '#ffffff' : '#c59f60'}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>

        {/* Central Luxury Crest Badge */}
        <motion.div
          variants={{
            hover: { scale: 1.08, rotate: [0, -3, 3, 0] },
          }}
          transition={{ duration: 0.4 }}
          className={`relative z-10 w-full h-full rounded-full flex items-center justify-center shadow-md overflow-hidden ${
            isLight
              ? 'bg-white text-stone-950 border border-white/80 shadow-white/10'
              : 'bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#141210] text-[#f5ecd8] border border-amber-500/30 shadow-amber-950/20'
          }`}
        >
          {/* Subtle Inner Sheen */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Monogram 'V' with custom handcrafted serif lines */}
          <span className="font-serif italic font-bold tracking-tighter leading-none relative z-10 text-amber-100 drop-shadow-sm">
            V
          </span>
        </motion.div>
      </div>

      {/* Brand Typographic Wordmark with Smooth Letter-Spacing Animation */}
      <div className="flex flex-col text-left">
        <motion.div className="flex items-center gap-1.5 overflow-hidden">
          <motion.span
            variants={{
              hover: { letterSpacing: '0.04em' },
            }}
            transition={{ duration: 0.3 }}
            className={`font-serif italic font-light tracking-tight leading-none ${sizeConfig.text} ${
              isLight ? 'text-white' : 'text-[#1a1a1a]'
            }`}
          >
            Veloura
          </motion.span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block mb-1"
          />
        </motion.div>

        {showSubtitle && (
          <motion.div
            variants={{
              hover: { x: 1 },
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 mt-0.5"
          >
            <span
              className={`uppercase tracking-[0.26em] font-sans font-semibold leading-none ${sizeConfig.sub} ${
                isLight ? 'text-amber-300' : 'text-[#8f6e4d]'
              }`}
            >
              London • Atelier
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Veloura London Luxury Sofas Homepage">
        {content}
      </Link>
    );
  }

  return content;
}
