'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      id="announcement-bar"
      className="bg-stone-950 text-stone-100 text-[11px] sm:text-xs py-2.5 px-4 relative z-40 flex items-center justify-between border-b border-stone-800"
    >
      <div className="flex-1 flex items-center justify-center gap-2 text-center">
        <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          Veloura London Atelier
        </span>
        <span className="hidden sm:inline text-stone-500">|</span>
        <span className="text-stone-300 font-normal">
          Complimentary White-Glove In-Room UK Delivery on all atelier orders over £1,500.
        </span>
        <Link
          href="/swatches"
          className="inline-flex items-center gap-0.5 text-amber-200 underline hover:text-white font-medium ml-1.5 transition-colors"
        >
          Free UK Swatch Kit <ArrowRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>

      <button
        id="dismiss-announcement-btn"
        onClick={() => setIsVisible(false)}
        className="text-stone-400 hover:text-stone-100 p-1 transition-colors cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
