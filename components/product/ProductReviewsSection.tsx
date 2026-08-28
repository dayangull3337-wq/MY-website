'use client';

import React, { useState } from 'react';
import { SofaReview, Product } from '@/types/product';
import { INITIAL_REVIEWS } from '@/data/reviews';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassModal } from '@/components/ui/GlassModal';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassSelect } from '@/components/ui/GlassSelect';
import { useToast } from '@/context/ToastContext';
import { Star, ThumbsUp, CheckCircle2, MessageSquare, Plus, Filter } from 'lucide-react';

export interface ProductReviewsSectionProps {
  product: Product;
}

export function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const initialList = INITIAL_REVIEWS[product.slug] || [
    {
      id: `rev-default-${product.id}`,
      userName: 'Camilla Montgomery',
      rating: 5,
      title: 'Flawless proportions and incredible fabric depth',
      comment: `The ${product.name} surpassed our expectations. The tailoring along the piping is immaculate and the white-glove setup team was prompt and meticulous.`,
      date: '2026-02-18',
      verifiedPurchase: true,
      selectedColor: product.variants[0].colorName,
      helpfulCount: 12,
      userLocation: 'San Francisco, CA',
    },
  ];

  const [reviews, setReviews] = useState<SofaReview[]>(initialList);
  const [selectedFilterRating, setSelectedFilterRating] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const { success } = useToast();

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.variants[0].colorName);
  const [userLocation, setUserLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helpful vote
  const handleVoteHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    success('Thank you!', 'Your feedback helps other atelier clients.');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: SofaReview = {
        id: `rev-${Date.now()}`,
        userName: name.trim(),
        rating: Number(rating),
        title: title.trim() || 'Exceptional Atelier Piece',
        comment: comment.trim(),
        date: new Date().toISOString().split('T')[0],
        verifiedPurchase: true,
        selectedColor,
        helpfulCount: 0,
        userLocation: userLocation.trim() || 'Verified Client',
      };

      setReviews((prev) => [newReview, ...prev]);
      setIsSubmitting(false);
      setIsWriteModalOpen(false);
      setName('');
      setTitle('');
      setComment('');
      setUserLocation('');
      success('Review Published', 'Thank you for sharing your experience with the atelier community.');
    }, 400);
  };

  // Rating breakdown stats
  const totalCount = reviews.length;
  const avgRating =
    totalCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
      : product.rating.toString();

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage:
      totalCount > 0
        ? Math.round((reviews.filter((r) => r.rating === stars).length / totalCount) * 100)
        : 0,
  }));

  const filteredReviews =
    selectedFilterRating === 'all'
      ? reviews
      : reviews.filter((r) => r.rating === selectedFilterRating);

  return (
    <section id="customer-reviews" className="pt-16 pb-12 border-t border-stone-200/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            Client Reviews & Living Testimonials
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real feedback from verified purchasers of the {product.name}.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="md"
          onClick={() => setIsWriteModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Write a Review
        </GlassButton>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70">
        {/* Left: Overall Score (4 cols) */}
        <div className="md:col-span-4 flex flex-col justify-center items-center text-center p-4 border-b md:border-b-0 md:border-r border-stone-200/60">
          <span className="font-serif text-5xl font-black text-stone-950">{avgRating}</span>
          <div className="flex items-center gap-1 my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(Number(avgRating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Based on {totalCount} verified residential reviews
          </span>
        </div>

        {/* Right: Star Bar breakdown (8 cols) */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2">
          {ratingCounts.map(({ stars, count, percentage }) => (
            <button
              key={stars}
              onClick={() => setSelectedFilterRating(selectedFilterRating === stars ? 'all' : stars)}
              className="flex items-center gap-3 text-xs text-stone-600 hover:text-stone-950 transition-colors w-full group cursor-pointer"
            >
              <span className="w-12 text-left font-medium">{stars} Stars</span>
              <div className="flex-1 h-2 bg-stone-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 group-hover:bg-amber-500 transition-all rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-right text-stone-400 group-hover:text-stone-900 font-medium">
                {count} ({percentage}%)
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl glass-panel border border-stone-200/70 space-y-3 bg-white/80"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-stone-950">{rev.title}</h4>
              </div>

              <span className="text-[11px] text-stone-400">{rev.date}</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{rev.comment}</p>

            <div className="pt-3 border-t border-stone-200/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-stone-500">
                <span className="font-bold text-stone-900">{rev.userName}</span>
                <span>·</span>
                <span>{rev.userLocation}</span>
                {rev.verifiedPurchase && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                    </span>
                  </>
                )}
                {rev.selectedColor && (
                  <>
                    <span>·</span>
                    <span className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                      {rev.selectedColor}
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={() => handleVoteHelpful(rev.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-panel-subtle border border-stone-200 hover:bg-white text-stone-600 hover:text-stone-950 transition-all text-xs font-medium cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      <GlassModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        title={`Review ${product.name}`}
        subtitle="Share your living room experience with other clients"
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassInput
              label="Your Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Charlotte Davis"
            />
            <GlassInput
              label="City & State"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="e.g. Boston, MA"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassSelect
              label="Overall Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              options={[
                { label: '5 Stars - Flawless Atelier Perfection', value: '5' },
                { label: '4 Stars - High Quality & Very Comfortable', value: '4' },
                { label: '3 Stars - Standard / Good', value: '3' },
                { label: '2 Stars - Below Expectations', value: '2' },
                { label: '1 Star - Unsatisfactory', value: '1' },
              ]}
            />

            <GlassSelect
              label="Purchased Fabric Color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              options={product.variants.map((v) => ({
                label: `${v.colorName} (${v.material})`,
                value: v.colorName,
              }))}
            />
          </div>

          <GlassInput
            label="Review Headline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The bouclé texture and down support are remarkable"
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
              Your Detailed Feedback
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the fabric feel, down sink, delivery experience, and how it anchors your living room..."
              className="w-full rounded-2xl glass-input px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-stone-200/60">
            <GlassButton
              type="button"
              variant="outline"
              onClick={() => setIsWriteModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Submit Verified Review
            </GlassButton>
          </div>
        </form>
      </GlassModal>
    </section>
  );
}
