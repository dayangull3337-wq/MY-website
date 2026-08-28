import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">404 — Atelier Entry Not Found</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Piece Not Located
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          The curated sofa silhouette or collection page you are looking for has been moved or is currently being re-crafted.
        </p>
        <div className="pt-4">
          <Link href="/">
            <GlassButton variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Atelier Gallery
            </GlassButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
