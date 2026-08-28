'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Bot, ArrowRight, MessageSquare, Compass, Palette } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';

const SAMPLE_PROMPTS = [
  'Best pet-friendly bouclé sectional under $3,500',
  'Curved velvet sofa for an open-concept living space',
  'Modular cloud pit for family movie nights & sleepovers',
  'Cognac Italian leather 3-seater with motorized recline',
];

export function AIStylistTeaserSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleStartConsultation = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customQuery || query || 'Help me select the best sofa for my living room';
    router.push(`/ai-assistant?prompt=${encodeURIComponent(promptToSend)}`);
  };

  return (
    <section className="py-16 md:py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>Powered by Gemini 3.7 Flash</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-50">
            Meet the Veloura AI Sofa Concierge
          </h2>
          <p className="text-sm sm:text-base text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Need guidance on room scale, walking clearance, fabric durability, or down-fill firmness? Our AI Interior Architect analyzes your residence in seconds.
          </p>
        </div>

        {/* Interactive Query Launcher */}
        <form
          onSubmit={(e) => handleStartConsultation(e)}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2.5 p-2 rounded-3xl bg-stone-950/80 border border-stone-800 shadow-2xl backdrop-blur-md"
        >
          <div className="flex-1 flex items-center px-4 py-2">
            <Sparkles className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. '14x18 living room with dog, looking for plush sectional'..."
              className="w-full bg-transparent text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none"
            />
          </div>
          <GlassButton
            type="submit"
            size="md"
            variant="primary"
            className="bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold border-none shadow-lg px-6"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Start Styling
          </GlassButton>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="space-y-2 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
            Or select a curated prompt:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleStartConsultation(undefined, prompt)}
                className="px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs border border-stone-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3 h-3 text-amber-400" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
