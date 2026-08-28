'use client';

import React, { useEffect } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';
import { RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Atelier Notice</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Something went wrong
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          An unexpected error occurred while loading this section of the atelier.
        </p>
        <div className="pt-2">
          <GlassButton variant="primary" onClick={() => reset()} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Try Again
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
