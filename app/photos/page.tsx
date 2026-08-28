'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { SofaPhoto, HD_SOFA_COLLECTION } from '@/lib/photosData';
import { ProductImageZoom } from '@/components/product/ProductImageZoom';
import {
  Search,
  Download,
  Copy,
  Check,
  Maximize2,
  Sparkles,
  Layers,
  Filter,
  Camera,
  X,
  Footprints,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PhotosStudioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [onlyWithFootstool, setOnlyWithFootstool] = useState(false);
  const [photos, setPhotos] = useState<SofaPhoto[]>(HD_SOFA_COLLECTION);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<SofaPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { label: 'All Silhouettes', value: 'all' },
    { label: '4-Seaters & Grand', value: '4-seater' },
    { label: 'Sectionals (Corner / L-Shape)', value: 'sectional' },
    { label: 'Curved & Sculptural', value: 'curved' },
    { label: 'Modular Pit Lounges', value: 'modular' },
    { label: '3-Seaters', value: '3-seater' },
    { label: 'Loveseats', value: 'loveseat' },
    { label: 'Recliners', value: 'reclining' },
    { label: 'Sleeper Daybeds', value: 'sofa-bed' },
    { label: 'Chaises', value: 'chaise' },
  ];

  const materials = [
    { label: 'All Materials', value: 'all' },
    { label: 'Italian Bouclé', value: 'bouclé' },
    { label: 'Tuscan Leather', value: 'leather' },
    { label: 'Stain-Shield Velvet', value: 'velvet' },
    { label: 'Belgian Linen', value: 'linen' },
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (selectedCategory !== 'all') params.set('category', selectedCategory);
        if (selectedMaterial !== 'all') params.set('material', selectedMaterial);

        const res = await fetch(`/api/photos?${params.toString()}`);
        const data = await res.json();
        if (data.success && data.photos) {
          setPhotos(data.photos);
        }
      } catch (err) {
        console.error('Error fetching photos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPhotos();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedMaterial]);

  // Client-side footstool filter
  const filteredPhotos = useMemo(() => {
    if (!onlyWithFootstool) return photos;
    return photos.filter((p) => p.hasFootstool || p.tags?.some(t => t.includes('footstool') || t.includes('ottoman')));
  }, [photos, onlyWithFootstool]);

  const handleCopyUrl = (photo: SofaPhoto) => {
    navigator.clipboard.writeText(photo.url);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header & Description */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-panel-subtle border border-stone-300 text-stone-800 text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 text-amber-600" />
          <span>Atelier Full HD & 4K Photo Studio</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
          Curated Luxury Sofa Gallery & Photography
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Explore genuine silhouettes, 4-seater L-shapes, and modular sectionals with matching footstools / ottomans. Hover anywhere on a photo to trigger auto-zoom micro-texture inspection.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-stone-200/80 bg-white/80 shadow-sm space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            id="sofa-photo-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, silhouette, or material (e.g., 'Mayfair 4-seater', 'footstool', 'bouclé', 'leather sectional')..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter: With Footstool / Ottoman Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            onClick={() => setOnlyWithFootstool(!onlyWithFootstool)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
              onlyWithFootstool
                ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-500/20'
                : 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200/80'
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span>Show Only Sofas with Matching Footstool / Ottoman</span>
            {onlyWithFootstool && <Check className="w-3.5 h-3.5 ml-1" />}
          </button>

          <span className="text-xs text-stone-500">
            {filteredPhotos.length} high-resolution photograph{filteredPhotos.length === 1 ? '' : 's'} available
          </span>
        </div>

        {/* Filter Categories Chips */}
        <div className="space-y-2 pt-2 border-t border-stone-200/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Silhouette</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-stone-900 text-white shadow-xs font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Materials Chips */}
        <div className="space-y-2 pt-2 border-t border-stone-200/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
            <Layers className="w-3.5 h-3.5" />
            <span>Filter by Material</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {materials.map((mat) => (
              <button
                key={mat.value}
                onClick={() => setSelectedMaterial(mat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedMaterial === mat.value
                    ? 'bg-stone-900 text-white shadow-xs font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of HD Sofa Photos */}
      <div className="space-y-4">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-stone-200/80 bg-white/50 space-y-3">
            <p className="font-serif text-lg font-bold text-stone-900">No photos match your filter combination</p>
            <p className="text-xs text-stone-500">Try clearing the search or disabling the footstool filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedMaterial('all');
                setOnlyWithFootstool(false);
              }}
              className="mt-2 text-xs font-bold uppercase text-stone-900 underline underline-offset-4 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="group flex flex-col rounded-3xl glass-panel border border-stone-200/80 bg-white/95 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Photo Preview with Interactive Auto-Zoom */}
                <div className="relative">
                  <ProductImageZoom
                    src={photo.url}
                    alt={photo.title}
                    aspectRatio="aspect-[16/10]"
                    zoomScale={2.2}
                    showLensHint={false}
                  />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {photo.category}
                    </span>
                    {(photo.hasFootstool || photo.tags?.some(t => t.includes('footstool') || t.includes('ottoman'))) && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-md text-stone-950 text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                        <Footprints className="w-3 h-3" />
                        Includes Footstool
                      </span>
                    )}
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-stone-950 line-clamp-2 leading-snug">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-600 mt-1.5 flex-wrap">
                      <span
                        className="w-3 h-3 rounded-full border border-stone-300 flex-shrink-0"
                        style={{ backgroundColor: photo.colorHex }}
                      />
                      <span className="font-medium text-stone-800">{photo.color}</span>
                      <span>•</span>
                      <span className="text-stone-500">{photo.material}</span>
                      <span>•</span>
                      <span className="text-stone-400 font-mono text-[10px]">{photo.style}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-stone-200/60 flex items-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(photo)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
                      title="Copy Full HD Image URL to Clipboard"
                    >
                      {copiedId === photo.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy HD URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActivePhoto(photo)}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 transition-colors cursor-pointer"
                      title="Inspect Full Specs & 4K Preview"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    <a
                      href={photo.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 transition-colors"
                      title="Download Full HD Master"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl text-stone-100 flex flex-col"
            >
              {/* Top Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-800">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                    <span>{activePhoto.material}</span>
                    <span>•</span>
                    <span>{activePhoto.color}</span>
                    <span>•</span>
                    <span>{activePhoto.style}</span>
                    {activePhoto.hasFootstool && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                        Includes Footstool
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image View with Interactive Zoom */}
              <div className="relative p-2 sm:p-4 bg-black">
                <ProductImageZoom
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  aspectRatio="aspect-[16/10]"
                  zoomScale={2.6}
                />
              </div>

              {/* Bottom Actions */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-900 border-t border-stone-800">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono text-[11px]">
                    4K Master: 3840 × 2560
                  </span>
                  <span>Hover to auto-zoom fabric weave</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleCopyUrl(activePhoto)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedId === activePhoto.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied Full HD Link</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Full HD Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activePhoto.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-stone-950 hover:bg-stone-100 text-xs font-bold transition-colors shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Original Master</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
