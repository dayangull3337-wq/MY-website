import { NextRequest, NextResponse } from 'next/server';
import { HD_SOFA_COLLECTION, SofaPhoto } from '@/lib/photosData';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || 'JE9p1POjl1xPrDTddCZ2WITwjH9FcYSO3eX6fEBDC0jKIx3HSUogpkJf';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').toLowerCase().trim();
    const category = searchParams.get('category') || 'all';
    const material = searchParams.get('material') || 'all';
    const color = searchParams.get('color') || 'all';
    const limit = parseInt(searchParams.get('limit') || '40', 10);

    let results = [...HD_SOFA_COLLECTION];

    // If query is provided, or user wants live Pexels search
    if (PEXELS_API_KEY && (query || category !== 'all')) {
      try {
        const searchQueryTerm = query 
          ? `${query} 4 seater sectional sofa luxury`
          : (category === '4-seater' ? '4 seater l shape sectional sofa luxury' : `${category} 4 seater sectional sofa luxury living room`);

        const pexelsRes = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQueryTerm)}&per_page=20&orientation=landscape`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
            next: { revalidate: 3600 }
          }
        );

        if (pexelsRes.ok) {
          const pexelsData = await pexelsRes.json();
          const livePhotos: SofaPhoto[] = (pexelsData.photos || []).map((p: any) => ({
            id: `pexels-${p.id}`,
            title: p.alt || `Veloura Luxury ${category !== 'all' ? category.toUpperCase() : 'Architectural'} Sofa`,
            category: category !== 'all' ? category : '4-seater',
            style: 'Modern Architectural',
            material: 'Luxury Upholstery',
            color: 'Curated Tone',
            colorHex: p.avg_color || '#ded5ca',
            url: p.src?.large2x || p.src?.large || p.src?.original || `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=1920`,
            downloadUrl: p.src?.original || p.src?.large2x || `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=3840`,
            width: p.width || 3840,
            height: p.height || 2560,
            tags: ['pexels-live', 'sofa', category, 'full-hd', 'luxury', '4-seater'],
            photographer: p.photographer || 'Pexels Creator',
            pexelsId: p.id,
          }));

          // Prepend live API results
          const existingIds = new Set(livePhotos.map(lp => lp.id));
          results = [...livePhotos, ...results.filter(r => !existingIds.has(r.id))];
        }
      } catch (err) {
        console.warn('Pexels live search fallback to curated library:', err);
      }
    }

    // Filter by category
    if (category && category !== 'all') {
      results = results.filter((p) => 
        p.category.toLowerCase() === category.toLowerCase() ||
        p.tags.some(t => t.toLowerCase() === category.toLowerCase()) ||
        p.title.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by material
    if (material && material !== 'all') {
      results = results.filter((p) =>
        p.material.toLowerCase().includes(material.toLowerCase()) ||
        p.title.toLowerCase().includes(material.toLowerCase())
      );
    }

    // Filter by color
    if (color && color !== 'all') {
      results = results.filter((p) =>
        p.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    // Search query filter on local items if not already matched
    if (query) {
      results = results.filter((p) => {
        const fullText = `${p.title} ${p.category} ${p.style} ${p.material} ${p.color} ${p.tags.join(' ')}`.toLowerCase();
        return query.split(' ').every((word) => fullText.includes(word));
      });
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      photos: results.slice(0, limit),
      hasPexelsKey: Boolean(PEXELS_API_KEY),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch Pexels sofa photos' },
      { status: 500 }
    );
  }
}
