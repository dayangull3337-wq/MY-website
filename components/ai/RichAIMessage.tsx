'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface RichAIMessageProps {
  content: string;
  isUser: boolean;
}

export function RichAIMessage({ content, isUser }: RichAIMessageProps) {
  if (isUser) {
    return (
      <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-normal">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="text-xs sm:text-sm leading-relaxed text-stone-900 space-y-3"
    >
      <Markdown
        components={{
          // Render bold tags as luxury Atelier badges/pills instead of plain ugly asterisks
          strong: ({ children }) => {
            const text = String(children);
            const isPrice = text.includes('£');
            const isSofaName =
              text.toLowerCase().includes('sofa') ||
              text.toLowerCase().includes('sectional') ||
              text.toLowerCase().includes('lounge') ||
              text.toLowerCase().includes('mayfair') ||
              text.toLowerCase().includes('chelsea') ||
              text.toLowerCase().includes('aurelia') ||
              text.toLowerCase().includes('seraphina') ||
              text.toLowerCase().includes('montauk') ||
              text.toLowerCase().includes('køben') ||
              text.toLowerCase().includes('koben');

            if (isSofaName) {
              return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 my-0.5 rounded-full bg-gradient-to-r from-amber-900/10 via-amber-700/15 to-stone-900/10 border border-amber-600/30 text-amber-950 font-bold text-[12px] sm:text-xs shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>{children}</span>
                </span>
              );
            }

            if (isPrice) {
              return (
                <span className="inline-block px-2 py-0.5 rounded-md bg-stone-900 text-amber-200 font-bold font-mono text-[11px] sm:text-xs tracking-tight shadow-2xs">
                  {children}
                </span>
              );
            }

            return (
              <span className="font-bold text-stone-950 text-amber-900/90 underline decoration-amber-500/30 decoration-1 underline-offset-2">
                {children}
              </span>
            );
          },

          p: ({ children }) => (
            <p className="leading-relaxed text-stone-800 font-normal my-1.5 last:mb-0 first:mt-0">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="my-2 space-y-2 pl-1">{children}</ul>
          ),

          ol: ({ children }) => (
            <ol className="my-2 space-y-2 pl-1 counter-reset-item">{children}</ol>
          ),

          li: ({ children }) => (
            <li className="flex items-start gap-2 text-stone-800 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div className="flex-1">{children}</div>
            </li>
          ),

          h1: ({ children }) => (
            <h3 className="font-serif text-base sm:text-lg font-bold text-stone-950 mt-3 mb-1 border-b border-stone-200/80 pb-1">
              {children}
            </h3>
          ),

          h2: ({ children }) => (
            <h4 className="font-serif text-sm sm:text-base font-bold text-stone-950 mt-2.5 mb-1 text-amber-950">
              {children}
            </h4>
          ),

          h3: ({ children }) => (
            <h5 className="font-sans text-xs sm:text-sm font-bold text-stone-900 mt-2 mb-0.5 tracking-wide">
              {children}
            </h5>
          ),

          blockquote: ({ children }) => (
            <blockquote className="pl-3 border-l-2 border-amber-600/60 italic text-stone-700 my-2 bg-amber-50/40 py-1 rounded-r-lg">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </Markdown>
    </motion.div>
  );
}
