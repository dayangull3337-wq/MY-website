'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, Sparkles, Maximize2, X } from 'lucide-react';

interface ProductImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  zoomScale?: number;
  showLensHint?: boolean;
}

export function ProductImageZoom({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  zoomScale = 2.4,
  showLensHint = true,
}: ProductImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomPos({ x: 50, y: 50 });
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative ${aspectRatio} rounded-3xl overflow-hidden glass-panel border border-stone-200/80 bg-stone-100 shadow-md cursor-crosshair group select-none ${className}`}
      >
        {/* Main Base Image with Dynamic Transform Origin */}
        <div
          className="w-full h-full relative transition-transform duration-150 ease-out will-change-transform"
          style={{
            transform: isHovered ? `scale(${zoomScale})` : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hover Precision Reticle / Focal Node */}
        {isHovered && (
          <div
            className="absolute pointer-events-none w-16 h-16 rounded-full border border-amber-400/80 bg-amber-500/10 shadow-lg -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[0.5px]"
            style={{
              left: `${zoomPos.x}%`,
              top: `${zoomPos.y}%`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
          </div>
        )}

        {/* Floating Zoom Indicator Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto">
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1 shadow-lg border border-amber-500/30"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{zoomScale}× Fabric Micro-Zoom</span>
            </motion.div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-stone-950 hover:text-white text-stone-800 backdrop-blur-md shadow-md border border-stone-200 transition-all cursor-pointer"
            title="Inspect in 4K Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Left Hint */}
        {showLensHint && !isHovered && (
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-stone-950/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-md pointer-events-none opacity-90 transition-opacity group-hover:opacity-0">
            <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            <span>Hover cursor anywhere to auto-zoom fabric & texture</span>
          </div>
        )}
      </div>

      {/* Fullscreen 4K Inspection Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              title="Close Fullscreen View"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-xs font-semibold">
                {alt} • Ultra-HD Atelier Master Capture
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
