import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { CategoryBentoSection } from '@/components/home/CategoryBentoSection';
import { FeaturedSofasSection } from '@/components/home/FeaturedSofasSection';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { CustomerReviewsSection } from '@/components/home/CustomerReviewsSection';
import { AIStylistTeaserSection } from '@/components/home/AIStylistTeaserSection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Ultra Clean Full HD Atelier Hero Section with Auto Photo Transitions */}
      <HeroSection />

      {/* 2. Standalone UK White-Glove & Frame Guarantee Trust Bar */}
      <TrustBar />

      {/* 3. Shop By Category Bento Section */}
      <CategoryBentoSection />

      {/* 4. Featured Masterpiece Sofas with Tabs */}
      <FeaturedSofasSection />

      {/* 5. Atelier Craftsmanship, Beechwood Timber & Down Loft */}
      <CraftsmanshipSection />

      {/* 6. Gemini 3.7 AI Sofa Concierge Interactive Teaser */}
      <AIStylistTeaserSection />

      {/* 7. Verified Customer Reviews & Residential Testimonials */}
      <CustomerReviewsSection />
    </div>
  );
}
