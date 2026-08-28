export type SofaCategorySlug = 
  | 'sectional'
  | '3-seater'
  | '2-seater'
  | 'loveseat'
  | 'reclining'
  | 'sofa-bed'
  | 'modular'
  | 'curved'
  | 'chaise';

export interface SofaCategory {
  id: string;
  name: string;
  slug: SofaCategorySlug;
  description: string;
  heroImage: string;
  tagline: string;
  productCount?: number;
  startingPrice?: number;
}

export interface SofaColorVariant {
  id: string;
  colorName: string;
  colorHex: string;
  material: string;
  image: string;
  hoverImage: string;
  galleryImages: string[];
  sku: string;
  priceModifier: number; // e.g. 0 for standard, 150 for luxury cashmere/leather
  stock: number;
  isPopular?: boolean;
}

export interface SofaDimensions {
  width: string; // e.g. "112\" (284 cm)"
  depth: string; // e.g. "64\" (162 cm)"
  height: string; // e.g. "32\" (81 cm)"
  seatDepth: string; // e.g. "26\" (66 cm)"
  seatHeight: string; // e.g. "17.5\" (44 cm)"
  armWidth: string; // e.g. "9\" (23 cm)"
  weight: string; // e.g. "185 lbs (84 kg)"
  boxCount: number;
}

export interface SofaReview {
  id: string;
  userName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  selectedColor: string;
  helpfulCount: number;
  userLocation?: string;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  categorySlug: SofaCategorySlug;
  categoryName: string;
  basePrice: number;
  salePrice?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewCount: number;
  seatingCapacity: number;
  style: 'Modern Minimalist' | 'Contemporary Italian' | 'Scandinavian' | 'Bespoke Architectural' | 'Organic Modern';
  firmness: 'Plush & Cloudlike' | 'Medium Balanced' | 'Supportive Tailored';
  configurations: string[]; // e.g. ["Standard 3-Piece", "Left Chaise Sectional", "Right Chaise Sectional", "Extended Modular"]
  primaryMaterial: string;
  frameMaterial: string;
  cushionFill: string;
  legFinish: string;
  features: string[];
  dimensions: SofaDimensions;
  variants: SofaColorVariant[];
  defaultVariantId: string;
  careInstructions: string[];
  warranty: string;
  shippingInfo: string;
  inStock: boolean;
  createdAt: string;
}

export interface SofaFilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  materials?: string[];
  seatingCapacity: number[];
  firmness: string[];
  style: string[];
  styles?: string[];
  features: string[];
  inStockOnly: boolean;
  onSaleOnly?: boolean;
  newArrivalsOnly?: boolean;
  minRating?: number;
  searchQuery?: string;
}

export type FilterState = SofaFilterState;

export type SortOption = 
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'popular';

export type SofaSortOption = SortOption;
