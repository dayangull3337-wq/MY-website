import { Product } from '@/types/product';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sofa-1',
    name: 'Mayfair 4-Seater L-Shape Chaise Sectional',
    slug: 'mayfair-4-seater-l-shape-chaise-sectional',
    tagline: 'Sculptural low-slung 4-seater with deep chaise lounger',
    description: 'The Mayfair is our signature 4-seater L-shape sectional, handcrafted with tactile Italian Alpine bouclé and generous cloud-loft goose down cushioning.',
    longDescription: 'Engineered for modern open-plan residences, the Mayfair 4-Seater L-Shape Chaise Sectional combines generous 4-adult seating with a dedicated extended chaise. Built on an FSC-certified European beechwood chassis with 8-way hand-tied sinuous suspension.',
    categorySlug: 'sectional',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3450,
    salePrice: 2950,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.96,
    reviewCount: 142,
    seatingCapacity: 4,
    style: 'Organic Modern',
    firmness: 'Plush & Cloudlike',
    configurations: ['Left-Facing L-Chaise (4-Seater)', 'Right-Facing L-Chaise (4-Seater)', '4-Seater L-Shape with Storage Footstool'],
    primaryMaterial: 'Italian Alpine Bouclé & Goose Down',
    frameMaterial: 'Kiln-Dried European Beechwood Frame',
    cushionFill: '80/20 Hypoallergenic White Goose Down + High-Resilience Bio-Core',
    legFinish: 'Concealed Smoked Oak Plinth Base',
    features: [
      'Genuine 4-person seating with dedicated deep lounge chaise',
      'Stain-resistant Crypton® 60,000+ Martindale rub count fabric',
      'Hand-tied 8-way spring foundation preventing cushion sagging',
      'Dual hidden USB-C fast-charging ports inside arm crevice'
    ],
    dimensions: {
      width: '112" (284 cm)',
      depth: '68" (172 cm chaise) / 38" (96 cm sofa)',
      height: '31" (79 cm)',
      seatDepth: '27" (68 cm)',
      seatHeight: '17.5" (44 cm)',
      armWidth: '9" (23 cm)',
      weight: '235 lbs (106 kg)',
      boxCount: 2
    },
    defaultVariantId: 'mayfair-sandstone',
    variants: [
      {
        id: 'mayfair-sandstone',
        colorName: 'Earthen Sandstone Bouclé',
        colorHex: '#7E5245',
        material: 'Italian Alpine Bouclé (95% Wool / 5% Silk)',
        image: 'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7045712/pexels-photo-7045712.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/31737854/pexels-photo-31737854.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/37110858/pexels-photo-37110858.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-MAY-SND-4L',
        priceModifier: 0,
        stock: 8,
        isPopular: true
      },
      {
        id: 'mayfair-forest',
        colorName: 'Deep Forest Italian Velvet',
        colorHex: '#25382B',
        material: 'High-Density Italian Cotton-Silk Velvet',
        image: 'https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/13793273/pexels-photo-13793273.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-MAY-FOR-4L',
        priceModifier: 150,
        stock: 5
      }
    ],
    careInstructions: [
      'Vacuum regularly with soft upholstery brush attachment',
      'Blot spills immediately with clean dry cloth',
      'Professional upholstery cleaning every 2 years'
    ],
    warranty: '10-Year European Beechwood Frame & Spring Guarantee',
    shippingInfo: 'Complimentary UK White-Glove In-Room Delivery & Assembly.',
    inStock: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'sofa-2',
    name: 'Chelsea 4-Seater Tuscan Leather Corner Lounge',
    slug: 'chelsea-4-seater-tuscan-leather-corner-lounge',
    tagline: 'Full-grain Italian saddle leather with matching ottoman footstool',
    description: 'A grand 4-seater L-shape corner suite hand-upholstered in natural aniline Tuscan leather that develops a magnificent patina over time.',
    longDescription: 'The Chelsea 4-Seater L-Shape Corner Sofa balances architectural lines with unmatched tactile comfort. Featuring 100% full-grain aniline hide, high-resilience memory foam wrap, and an included matching tufted ottoman.',
    categorySlug: 'sectional',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3890,
    salePrice: 3490,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.95,
    reviewCount: 98,
    seatingCapacity: 4,
    style: 'Contemporary Italian',
    firmness: 'Medium Balanced',
    configurations: ['Left L-Corner (4-Seater)', 'Right L-Corner (4-Seater)', '4-Seater L-Corner with Footstool'],
    primaryMaterial: 'Full-Grain Tuscan Saddle Leather',
    frameMaterial: 'Kiln-Dried European Beechwood Frame',
    cushionFill: 'Pocket Spring Core with High-Density Bio-Foam Wrap',
    legFinish: 'Brushed Gunmetal Steel Angular Feet',
    features: [
      'Full-grain natural aniline leather with rich pull-up effect',
      'Includes matching square luxury leather ottoman / footstool',
      'Anti-sag sinuous suspension base and reinforced joints',
      'Hand-stitched French seam detailing throughout'
    ],
    dimensions: {
      width: '108" (274 cm)',
      depth: '72" (183 cm return) / 36" (91 cm depth)',
      height: '30" (76 cm)',
      seatDepth: '26" (66 cm)',
      seatHeight: '17" (43 cm)',
      armWidth: '9" (23 cm)',
      weight: '240 lbs (109 kg)',
      boxCount: 2
    },
    defaultVariantId: 'chelsea-cognac',
    variants: [
      {
        id: 'chelsea-cognac',
        colorName: 'Cognac Amber Saddle Leather',
        colorHex: '#B5A291',
        material: '100% Full-Grain Aniline Tuscan Leather',
        image: 'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/6510974/pexels-photo-6510974.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/6510974/pexels-photo-6510974.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-CHE-COG-4L',
        priceModifier: 0,
        stock: 6,
        isPopular: true
      },
      {
        id: 'chelsea-charcoal',
        colorName: 'Charcoal Belgian Linen',
        colorHex: '#353538',
        material: 'Heavyweight Washed Belgian Linen',
        image: 'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/12498613/pexels-photo-12498613.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/8082330/pexels-photo-8082330.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-CHE-CHR-4L',
        priceModifier: -300,
        stock: 7
      }
    ],
    careInstructions: [
      'Wipe with clean dry microfiber cloth',
      'Apply natural beeswax leather balsam every 6 months'
    ],
    warranty: '10-Year Beechwood Frame Warranty; 5-Year Leather Guarantee',
    shippingInfo: 'Complimentary UK White-Glove in-room installation included.',
    inStock: true,
    createdAt: '2026-01-20'
  },
  {
    id: 'sofa-3',
    name: 'Køben 4-Seater Modular L-Shape Pit Lounge',
    slug: 'koben-4-seater-modular-l-shape-pit-lounge',
    tagline: 'Deep 4-seater modular L-shape with movable plush footstool',
    description: 'Designed in Copenhagen, the Køben combines low-profile modular modules into an ultra-deep 4-seater L-shape pit lounge with natural linen upholstery.',
    longDescription: 'The Køben 4-Seater Modular L-Shape Pit Lounge allows effortless reconfiguration. Magnetic docking brackets lock the modules securely in place, while pure Belgian washed linen provides breathable year-round comfort.',
    categorySlug: 'modular',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3590,
    salePrice: 3190,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.92,
    reviewCount: 118,
    seatingCapacity: 4,
    style: 'Scandinavian',
    firmness: 'Plush & Cloudlike',
    configurations: ['Left 4-Seater L-Shape + Ottoman', 'Right 4-Seater L-Shape + Ottoman', 'Daybed Pit Configuration'],
    primaryMaterial: 'Washed Belgian Linen & Micro-Down',
    frameMaterial: 'Solid Nordic Pine & Beech Reinforcements',
    cushionFill: 'Channel-Stitched Feather & Microfiber Blend over Memory Foam',
    legFinish: 'Low-Profile Brushed Nickel Concealed Glides',
    features: [
      'Concealed magnetic module connectors for flexible layouts',
      'Deep 28-inch sink-in seat with matching plush footstool',
      'Fully removable and machine-washable slipcovers',
      'Hypoallergenic OEKO-TEX certified fillings'
    ],
    dimensions: {
      width: '114" (290 cm)',
      depth: '70" (178 cm chaise) / 40" (102 cm depth)',
      height: '29" (74 cm)',
      seatDepth: '28" (71 cm)',
      seatHeight: '16.5" (42 cm)',
      armWidth: '10" (25 cm)',
      weight: '220 lbs (100 kg)',
      boxCount: 3
    },
    defaultVariantId: 'koben-sandstone',
    variants: [
      {
        id: 'koben-sandstone',
        colorName: 'Earthen Sandstone Linen',
        colorHex: '#A69B89',
        material: '100% Belgian Washed Linen (480 g/m²)',
        image: 'https://images.pexels.com/photos/31737854/pexels-photo-31737854.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/8082330/pexels-photo-8082330.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/8082306/pexels-photo-8082306.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/7598130/pexels-photo-7598130.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-KOB-SND-4L',
        priceModifier: 0,
        stock: 9,
        isPopular: true
      },
      {
        id: 'koben-charcoal',
        colorName: 'Charcoal Fog Slub',
        colorHex: '#6E6A64',
        material: 'Heavy Textured Linen-Cotton Slub',
        image: 'https://images.pexels.com/photos/8082330/pexels-photo-8082330.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-KOB-CHR-4L',
        priceModifier: 120,
        stock: 4
      }
    ],
    careInstructions: [
      'Slipcovers are machine washable on cold delicate cycle',
      'Line dry in shade to preserve natural linen texture',
      'Fluff down cushions weekly to maintain loft'
    ],
    warranty: '10-Year Frame & Spring Guarantee; 3-Year Cover Guarantee',
    shippingInfo: 'Complimentary White-Glove In-Room Delivery & Module Alignment.',
    inStock: true,
    createdAt: '2026-01-25'
  },
  {
    id: 'sofa-4',
    name: 'Seraphina 4-Seater Sculpted Curved L-Sectional',
    slug: 'seraphina-4-seater-sculpted-curved-l-sectional',
    tagline: 'Artisanal crescent 4-seater with round velvet footstool',
    description: 'An organic modernist masterpiece. The Seraphina 4-Seater curves smoothly into an L-lounge silhouette wrapped in stain-shield alpaca velvet.',
    longDescription: 'Created for elevated entertaining spaces, the Seraphina 4-Seater Sculpted Curved L-Sectional features a continuous backrest contour and high-density latex foam cushioning with an included round matching footstool.',
    categorySlug: 'curved',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3690,
    salePrice: 3290,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.93,
    reviewCount: 89,
    seatingCapacity: 4,
    style: 'Organic Modern',
    firmness: 'Medium Balanced',
    configurations: ['Left Curved L-Shape + Round Ottoman', 'Right Curved L-Shape + Round Ottoman'],
    primaryMaterial: 'Stain-Shield Alpaca Velvet',
    frameMaterial: 'Reinforced Kiln-Dried Beechwood & Engineered Arc Ribs',
    cushionFill: 'Molded Ergonomic Latex Foam with Dacron Wrap',
    legFinish: 'Recessed Brushed Champagne Brass Plinth',
    features: [
      'Seamless fluid curved L-shape construction',
      'Includes matching sculpted circular velvet footstool',
      'Nano-sealed stain-resistant velvet upholstery',
      '360-degree finished back suitable for central room placement'
    ],
    dimensions: {
      width: '116" (295 cm)',
      depth: '66" (168 cm arc return) / 38" (96 cm depth)',
      height: '32" (81 cm)',
      seatDepth: '26" (66 cm)',
      seatHeight: '17.5" (44 cm)',
      armWidth: '8" (20 cm)',
      weight: '228 lbs (103 kg)',
      boxCount: 2
    },
    defaultVariantId: 'seraphina-charcoal',
    variants: [
      {
        id: 'seraphina-charcoal',
        colorName: 'Charcoal Fog Velvet',
        colorHex: '#807166',
        material: 'Stain-Shield Italian Alpaca Velvet',
        image: 'https://images.pexels.com/photos/7045712/pexels-photo-7045712.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/39134566/pexels-photo-39134566.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-SER-CHR-4L',
        priceModifier: 0,
        stock: 5,
        isPopular: true
      },
      {
        id: 'seraphina-cream',
        colorName: 'Cream Bouclé Arc',
        colorHex: '#F2EDE4',
        material: 'Italian Alpine Bouclé (92% Wool / 8% Cotton)',
        image: 'https://images.pexels.com/photos/39134566/pexels-photo-39134566.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/3935315/pexels-photo-3935315.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/2029663/pexels-photo-2029663.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-SER-CRM-4L',
        priceModifier: 180,
        stock: 6
      }
    ],
    careInstructions: [
      'Gently brush with soft velvet brush in direction of nap',
      'Spot clean with mild water-free solvent',
      'Avoid placing in direct prolonged sunlight'
    ],
    warranty: '10-Year European Beechwood Frame Guarantee',
    shippingInfo: 'Complimentary UK White-Glove Delivery with Room Placement.',
    inStock: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'sofa-5',
    name: 'Aurelia 4-Seater Cloud L-Sectional with Center Ottoman',
    slug: 'aurelia-4-seater-cloud-l-sectional-center-ottoman',
    tagline: 'Ultra-wide 4-seater L-lounge with low-profile matching ottoman',
    description: 'The Aurelia 4-Seater Cloud Sectional features deep sink-in goose down cushioning, textured Alpine melange fabric, and a versatile center ottoman footstool.',
    longDescription: 'Crafted for relaxed family evenings and sophisticated hosting, the Aurelia 4-Seater Cloud L-Sectional incorporates low-slung proportions with oversized box cushions that offer unmatched plushness.',
    categorySlug: 'sectional',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3750,
    salePrice: 3350,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.97,
    reviewCount: 165,
    seatingCapacity: 4,
    style: 'Contemporary Italian',
    firmness: 'Plush & Cloudlike',
    configurations: ['Left L-Sectional (4-Seater) + Ottoman', 'Right L-Sectional (4-Seater) + Ottoman'],
    primaryMaterial: 'Textured Alpine Melange & Down Loft',
    frameMaterial: 'Kiln-Dried European Beechwood Frame',
    cushionFill: '85/15 Hypoallergenic European Duck Down + HR Foam Core',
    legFinish: 'Concealed Matte Espresso Ash Plinth',
    features: [
      'Includes large matching movable center ottoman / footstool',
      'Double-stitched stress points with reinforced steel corner brackets',
      'Stain-resistant Crypton® performance fabric',
      'Deep 27-inch seating platform'
    ],
    dimensions: {
      width: '118" (300 cm)',
      depth: '68" (172 cm chaise) / 39" (99 cm depth)',
      height: '31" (79 cm)',
      seatDepth: '27" (68 cm)',
      seatHeight: '17" (43 cm)',
      armWidth: '10" (25 cm)',
      weight: '245 lbs (111 kg)',
      boxCount: 2
    },
    defaultVariantId: 'aurelia-amber',
    variants: [
      {
        id: 'aurelia-amber',
        colorName: 'Cognac Amber Melange',
        colorHex: '#837665',
        material: 'Textured Alpine Melange (80% Wool / 20% Linen)',
        image: 'https://images.pexels.com/photos/37110858/pexels-photo-37110858.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/31737854/pexels-photo-31737854.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-AUR-AMB-4L',
        priceModifier: 0,
        stock: 7,
        isPopular: true
      },
      {
        id: 'aurelia-charcoal',
        colorName: 'Charcoal Belgian Linen',
        colorHex: '#3A3A3C',
        material: 'Belgian Washed Linen Blend',
        image: 'https://images.pexels.com/photos/12498613/pexels-photo-12498613.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-AUR-CHR-4L',
        priceModifier: 150,
        stock: 4
      }
    ],
    careInstructions: [
      'Vacuum regularly with upholstery nozzle',
      'Blot liquid spills instantly with absorbent cloth',
      'Professional dry cleaning recommended'
    ],
    warranty: '10-Year Beechwood Frame Guarantee; 5-Year Cushion Guarantee',
    shippingInfo: 'Complimentary UK White-Glove In-Room Delivery & Setup.',
    inStock: true,
    createdAt: '2026-01-28'
  },
  {
    id: 'sofa-6',
    name: 'Verona 4-Seater Motorized L-Recliner Sectional',
    slug: 'verona-4-seater-motorized-l-recliner-sectional',
    tagline: 'Whisper-quiet motorized ergonomic 4-seater L-lounge with footrest',
    description: 'The Verona integrates whisper-quiet German motorized reclining seats into a contemporary 4-seater L-shape leather lounge with built-in footrest extension.',
    longDescription: 'Crafted with top-grain Italian aniline leather, the Verona 4-Seater Motorized L-Recliner Sectional offers independently adjustable headrests and leg rests that glide smoothly at the touch of a concealed sensor.',
    categorySlug: 'reclining',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 4250,
    salePrice: 3790,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: true,
    rating: 4.91,
    reviewCount: 64,
    seatingCapacity: 4,
    style: 'Contemporary Italian',
    firmness: 'Medium Balanced',
    configurations: ['Left Motorized L-Shape (4-Seater)', 'Right Motorized L-Shape (4-Seater)'],
    primaryMaterial: 'Top-Grain Italian Aniline Leather',
    frameMaterial: 'High-Tensile Steel Recline Chassis & Hardwood Frame',
    cushionFill: 'High-Resilience Cold-Cure Foam & Memory Lumbar Layer',
    legFinish: 'Concealed Matte Black Powder-Coated Steel',
    features: [
      'Dual whisper-quiet German motors with smooth zero-gravity recline',
      'Integrated motorized footrest extension for full ergonomic support',
      'Concealed touch controls and USB-C fast charging ports',
      'Top-grain Italian aniline leather upholstery'
    ],
    dimensions: {
      width: '112" (284 cm)',
      depth: '68" (172 cm chaise) / 38" (96 cm upright) / 62" (157 cm reclined)',
      height: '32" (81 cm)',
      seatDepth: '25" (63 cm)',
      seatHeight: '18" (46 cm)',
      armWidth: '9" (23 cm)',
      weight: '275 lbs (125 kg)',
      boxCount: 2
    },
    defaultVariantId: 'verona-charcoal',
    variants: [
      {
        id: 'verona-charcoal',
        colorName: 'Charcoal Fog Leather',
        colorHex: '#AFADAE',
        material: 'Top-Grain Italian Aniline Leather',
        image: 'https://images.pexels.com/photos/12498613/pexels-photo-12498613.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/6758512/pexels-photo-6758512.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/6510974/pexels-photo-6510974.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-VER-CHR-4L',
        priceModifier: 0,
        stock: 4,
        isPopular: true
      },
      {
        id: 'verona-cognac',
        colorName: 'Tuscan Cognac Leather',
        colorHex: '#8B4E2B',
        material: '100% Full-Grain Tuscan Saddle Leather',
        image: 'https://images.pexels.com/photos/6510974/pexels-photo-6510974.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7045702/pexels-photo-7045702.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-VER-COG-4L',
        priceModifier: 250,
        stock: 3
      }
    ],
    careInstructions: [
      'Wipe down with soft leather cloth',
      'Keep mechanism free of dust and debris',
      'Apply leather conditioner every 6–12 months'
    ],
    warranty: '10-Year Frame Warranty; 5-Year German Motor & Mechanism Warranty',
    shippingInfo: 'Complimentary UK White-Glove In-Room Delivery & Motor Calibration.',
    inStock: true,
    createdAt: '2026-02-05'
  },
  {
    id: 'sofa-7',
    name: 'Montauk 4-Seater Convertible L-Shape Sleeper Sofa',
    slug: 'montauk-4-seater-convertible-l-shape-sleeper-sofa',
    tagline: '4-seater L-lounge converting effortlessly with movable footstool',
    description: 'An ingenious 4-seater L-shape sleeper sofa that transforms into a luxurious Queen gel-infused bed, complete with a tufted matching footstool.',
    longDescription: 'The Montauk 4-Seater Convertible L-Shape Sleeper Sofa brings Japandi serenity to modern spaces. Combining plush cotton velvet upholstery with a silent Italian folding sleeper mechanism and dedicated storage chaise.',
    categorySlug: 'sofa-bed',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3650,
    salePrice: 3150,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.89,
    reviewCount: 92,
    seatingCapacity: 4,
    style: 'Modern Minimalist',
    firmness: 'Medium Balanced',
    configurations: ['Left Storage Chaise (4-Seater)', 'Right Storage Chaise (4-Seater)', '4-Seater Sleeper + Footstool'],
    primaryMaterial: 'Royal Cotton Velvet & Pocket Sprung Core',
    frameMaterial: 'Solid Kiln-Dried European Beechwood & Steel Linkage',
    cushionFill: 'Gel-Infused Bio-Foam Mattress + Down-Wrap Back Pillows',
    legFinish: 'Natural Scandinavian Light Oak Block Feet',
    features: [
      'Seamless 2-second pull-out Queen sleeper mechanism',
      'Includes matching tufted plush footstool with hidden storage',
      'Deep under-chaise storage compartment for linens and pillows',
      'Heavy-duty Martindale 50,000+ rub count velvet'
    ],
    dimensions: {
      width: '110" (279 cm)',
      depth: '68" (172 cm chaise) / 38" (96 cm sofa) / 88" (224 cm open bed)',
      height: '31" (79 cm)',
      seatDepth: '26" (66 cm)',
      seatHeight: '17.5" (44 cm)',
      armWidth: '8" (20 cm)',
      weight: '255 lbs (116 kg)',
      boxCount: 2
    },
    defaultVariantId: 'montauk-sandstone',
    variants: [
      {
        id: 'montauk-sandstone',
        colorName: 'Earthen Sandstone Velvet',
        colorHex: '#6D5E4B',
        material: 'Royal Cotton-Silk Velvet',
        image: 'https://images.pexels.com/photos/37110860/pexels-photo-37110860.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/37110858/pexels-photo-37110858.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/7045712/pexels-photo-7045712.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-MON-SND-4L',
        priceModifier: 0,
        stock: 7,
        isPopular: true
      },
      {
        id: 'montauk-charcoal',
        colorName: 'Charcoal Belgian Linen',
        colorHex: '#353538',
        material: 'Heavyweight Belgian Washed Linen',
        image: 'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/8082330/pexels-photo-8082330.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-MON-CHR-4L',
        priceModifier: -100,
        stock: 5
      }
    ],
    careInstructions: [
      'Spot clean with mild damp cloth',
      'Rotate mattress topper every 6 months for even wear',
      'Vacuum crevices and mechanism track periodically'
    ],
    warranty: '10-Year Frame Warranty; 5-Year Sleeper Mechanism Warranty',
    shippingInfo: 'Complimentary UK White-Glove In-Room Delivery & Assembly.',
    inStock: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'sofa-8',
    name: 'Belgravia 4-Seater L-Shape Penthouse Sectional',
    slug: 'belgravia-4-seater-l-shape-penthouse-sectional',
    tagline: 'Monolithic 4-seater L-lounge in Charcoal Fog alpaca velvet',
    description: 'Designed for expansive penthouse residences, the Belgravia 4-Seater L-Shape features deep seating, clean architectural contours, and ultra-luxurious velvet.',
    longDescription: 'The Belgravia 4-Seater L-Shape Penthouse Sectional makes a commanding design statement. Handcrafted in London with high-density bio-foam cushioning wrapped in hypo-allergenic duck down.',
    categorySlug: 'sectional',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3950,
    salePrice: 3490,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: true,
    rating: 4.94,
    reviewCount: 78,
    seatingCapacity: 4,
    style: 'Contemporary Italian',
    firmness: 'Supportive Tailored',
    configurations: ['Left Penthouse L-Shape (4-Seater)', 'Right Penthouse L-Shape (4-Seater)'],
    primaryMaterial: 'Stain-Shield Alpaca Velvet & Down Wrap',
    frameMaterial: 'Kiln-Dried European Beechwood & Steel Reinforced Corners',
    cushionFill: 'High-Density 45kg/m³ Bio-Foam Core with Down Wrap',
    legFinish: 'Polished Black Nickel Recessed Plinth',
    features: [
      'Deep 27-inch seating platform comfortably seating 4 adults',
      'Stain-resistant Crypton® nanotechnology coating',
      'Continuous uninterrupted backrest silhouette',
      'Concealed wireless phone charging pad embedded in armrest'
    ],
    dimensions: {
      width: '115" (292 cm)',
      depth: '72" (183 cm return) / 38" (96 cm depth)',
      height: '30" (76 cm)',
      seatDepth: '27" (68 cm)',
      seatHeight: '17" (43 cm)',
      armWidth: '10" (25 cm)',
      weight: '240 lbs (109 kg)',
      boxCount: 2
    },
    defaultVariantId: 'belgravia-charcoal',
    variants: [
      {
        id: 'belgravia-charcoal',
        colorName: 'Charcoal Fog Velvet',
        colorHex: '#353538',
        material: 'Stain-Shield Alpaca Velvet',
        image: 'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7045712/pexels-photo-7045712.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/12498613/pexels-photo-12498613.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-BEL-CHR-4L',
        priceModifier: 0,
        stock: 5,
        isPopular: true
      },
      {
        id: 'belgravia-sandstone',
        colorName: 'Earthen Sandstone Bouclé',
        colorHex: '#7E5245',
        material: 'Italian Alpine Bouclé',
        image: 'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/31737854/pexels-photo-31737854.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/37110858/pexels-photo-37110858.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-BEL-SND-4L',
        priceModifier: 100,
        stock: 6
      }
    ],
    careInstructions: [
      'Vacuum with soft brush attachment monthly',
      'Blot stains immediately with clean cotton cloth',
      'Professional cleaning recommended every 2 years'
    ],
    warranty: '10-Year Beechwood Frame Guarantee',
    shippingInfo: 'Complimentary UK White-Glove Delivery with Packaging Removal.',
    inStock: true,
    createdAt: '2026-02-15'
  },
  {
    id: 'sofa-9',
    name: 'Windsor 4-Seater L-Shape Chaise in Olive Melange',
    slug: 'windsor-4-seater-l-shape-chaise-olive-melange',
    tagline: 'Refined 4-seater L-lounge with tufted matching footstool',
    description: 'The Windsor brings modern British luxury with a tailored 4-seater L-shape layout, rich olive melange weave, and a versatile matching tufted footstool.',
    longDescription: 'Engineered with hand-finished French piped seams and solid FSC-certified European beechwood, the Windsor 4-Seater L-Shape Chaise provides sublime sink-in comfort for four adults.',
    categorySlug: 'sectional',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3550,
    salePrice: 3100,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.93,
    reviewCount: 84,
    seatingCapacity: 4,
    style: 'Contemporary Italian',
    firmness: 'Medium Balanced',
    configurations: ['Left Chaise (4-Seater) + Footstool', 'Right Chaise (4-Seater) + Footstool'],
    primaryMaterial: 'Textured Melange Weave & Down Core',
    frameMaterial: 'Kiln-Dried European Beechwood Frame',
    cushionFill: 'Pocket Springs with Feather-Blend Cloud Top',
    legFinish: 'Tapered Natural Smoked Walnut Timber',
    features: [
      'Includes matching tailored tufted footstool / ottoman',
      'Genuine 4-seater spacious L-chaise arrangement',
      'Commercial-grade 65,000 rub count durability',
      'Concealed USB-C fast charging in armrest'
    ],
    dimensions: {
      width: '112" (284 cm)',
      depth: '68" (172 cm chaise) / 37" (94 cm depth)',
      height: '31" (79 cm)',
      seatDepth: '26" (66 cm)',
      seatHeight: '17.5" (44 cm)',
      armWidth: '8.5" (22 cm)',
      weight: '225 lbs (102 kg)',
      boxCount: 2
    },
    defaultVariantId: 'windsor-olive',
    variants: [
      {
        id: 'windsor-olive',
        colorName: 'Olive Melange Weave',
        colorHex: '#424C36',
        material: 'Heavy Textured Melange (75% Wool / 25% Linen)',
        image: 'https://images.pexels.com/photos/13793273/pexels-photo-13793273.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-WIN-OLV-4L',
        priceModifier: 0,
        stock: 6,
        isPopular: true
      },
      {
        id: 'windsor-forest',
        colorName: 'Deep Forest Velvet',
        colorHex: '#25382B',
        material: 'Italian Cotton-Silk Velvet',
        image: 'https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/13793273/pexels-photo-13793273.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-WIN-FOR-4L',
        priceModifier: 150,
        stock: 4
      }
    ],
    careInstructions: [
      'Vacuum with brush attachment regularly',
      'Blot spills with dry cloth',
      'Professional dry cleaning recommended'
    ],
    warranty: '10-Year Beechwood Frame & Spring Guarantee',
    shippingInfo: 'Complimentary UK White-Glove In-Room Delivery & Setup.',
    inStock: true,
    createdAt: '2026-02-18'
  },
  {
    id: 'sofa-10',
    name: 'Cloudsink 4-Seater Modular L-Shape with Dual Ottomans',
    slug: 'cloudsink-4-seater-modular-l-shape-dual-ottomans',
    tagline: 'Ultra-deep 4-seater cloud lounge with dual matching magnetic footstools',
    description: 'The ultimate sink-in sanctuary. Featuring 4 generous modular seats, tactile cream bouclé, and dual movable magnetic footstools for full lounging freedom.',
    longDescription: 'The Cloudsink 4-Seater Modular L-Shape Lounge is filled with multi-density goose down over responsive bio-foam. Move the dual ottomans to convert from an L-shape into a massive pit daybed or double chaise lounge.',
    categorySlug: 'modular',
    categoryName: '4-Seater L-Shape Sectionals',
    basePrice: 3890,
    salePrice: 3450,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: true,
    rating: 4.98,
    reviewCount: 198,
    seatingCapacity: 4,
    style: 'Organic Modern',
    firmness: 'Plush & Cloudlike',
    configurations: ['Left 4-Seater L-Shape + Dual Ottomans', 'Right 4-Seater L-Shape + Dual Ottomans', 'Expansive 4-Person Pit Lounge'],
    primaryMaterial: 'Italian Alpine Bouclé & Down Loft',
    frameMaterial: 'Solid Kiln-Dried European Beechwood Frame',
    cushionFill: '85/15 White Goose Down over 40kg/m³ HR Core',
    legFinish: 'Concealed Low-Profile Glides',
    features: [
      'Includes dual matching magnetic modular footstools / ottomans',
      'Concealed magnetic docking locks modules seamlessly',
      'Ultra-deep 28-inch sink-in seats with cloud lofting',
      'Removable, dry-cleanable tailored slipcovers'
    ],
    dimensions: {
      width: '120" (305 cm)',
      depth: '72" (183 cm chaise) / 40" (102 cm depth)',
      height: '30" (76 cm)',
      seatDepth: '28" (71 cm)',
      seatHeight: '16.5" (42 cm)',
      armWidth: '10" (25 cm)',
      weight: '260 lbs (118 kg)',
      boxCount: 3
    },
    defaultVariantId: 'cloudsink-cream',
    variants: [
      {
        id: 'cloudsink-cream',
        colorName: 'Cream Alpine Bouclé',
        colorHex: '#F5EFEB',
        material: 'Italian Alpine Bouclé (90% Wool / 10% Linen)',
        image: 'https://images.pexels.com/photos/7598130/pexels-photo-7598130.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/3935315/pexels-photo-3935315.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/31737854/pexels-photo-31737854.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
          'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-CLD-CRM-4L',
        priceModifier: 0,
        stock: 8,
        isPopular: true
      },
      {
        id: 'cloudsink-charcoal',
        colorName: 'Charcoal Belgian Linen',
        colorHex: '#353538',
        material: 'Heavyweight Belgian Washed Linen',
        image: 'https://images.pexels.com/photos/39134615/pexels-photo-39134615.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        hoverImage: 'https://images.pexels.com/photos/8082330/pexels-photo-8082330.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85',
        galleryImages: [
          'https://images.pexels.com/photos/7546213/pexels-photo-7546213.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85'
        ],
        sku: 'VEL-CLD-CHR-4L',
        priceModifier: 100,
        stock: 5
      }
    ],
    careInstructions: [
      'Fluff down cushions regularly to redistribute air loft',
      'Dry clean slipcovers when necessary',
      'Vacuum with soft brush attachment'
    ],
    warranty: '10-Year Beechwood Frame & Spring Guarantee',
    shippingInfo: 'Complimentary UK White-Glove Delivery & Custom Module Setup.',
    inStock: true,
    createdAt: '2026-02-22'
  }
];
