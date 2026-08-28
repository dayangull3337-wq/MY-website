'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Truck, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function TrustBar() {
  const trustItems = [
    {
      icon: <Truck className="w-5 h-5 text-amber-700" />,
      title: 'Free UK White-Glove Delivery',
      subtitle: 'In-room placement & uncrating over £1,500',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-amber-700" />,
      title: '100-Day In-Home Trial',
      subtitle: 'Experience comfort in your own space',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-700" />,
      title: '10-Year Frame Warranty',
      subtitle: 'Solid European kiln-dried beechwood',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-700" />,
      title: 'Free Fabric Swatches',
      subtitle: 'Up to 6 samples delivered in 2–3 days',
      link: '/swatches',
    },
  ];

  return (
    <section id="trust-pillars-bar" className="w-full bg-[#f8f6f2] border-b border-stone-200/80 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, idx) => {
            const content = (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-amber-600/40 transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 tracking-tight leading-tight group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-normal mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );

            if (item.link) {
              return (
                <Link key={idx} href={item.link} className="cursor-pointer">
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}
