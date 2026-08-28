'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { INITIAL_REVIEWS } from '@/data/reviews';

export function CustomerReviewsSection() {
  const allFlattenedReviews = Object.values(INITIAL_REVIEWS).flat().slice(0, 4);

  return (
    <section id="verified-reviews" className="py-16 md:py-24 bg-stone-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel-subtle border border-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Average Across 1,420+ Residences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950">
            Loved in Penthouses & Family Living Rooms
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Read verified owner testimonials on tactile fabric resilience, cloud-like down support, and our white-glove in-room installation.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allFlattenedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl glass-panel border border-stone-200/80 shadow-sm flex flex-col justify-between bg-white/85 transition-all hover:shadow-md"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-stone-900 leading-snug mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                {/* Comment */}
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  {rev.comment}
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-4 pt-3.5 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 block">{rev.userName}</span>
                  <span className="text-[11px] text-stone-400">{rev.userLocation}</span>
                </div>
                {rev.selectedColor && (
                  <span className="text-[10px] text-stone-500 font-medium bg-stone-100 px-2 py-0.5 rounded-md">
                    {rev.selectedColor}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
