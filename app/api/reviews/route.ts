import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
    }
    const reviews = store.getReviewsByProductSlug(slug);
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, userName, rating, title, comment, selectedColor, userLocation } = body;

    if (!slug || !userName || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const newReview = store.addReview(slug, {
      userName,
      rating: Number(rating),
      title: title || 'Atelier Experience',
      comment,
      selectedColor: selectedColor || 'Oatmeal Bouclé',
      userLocation: userLocation || 'Verified Client',
      verifiedPurchase: true,
      helpfulCount: 0,
    });

    return NextResponse.json({ review: newReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { slug, reviewId } = await req.json();
    if (!slug || !reviewId) {
      return NextResponse.json({ error: 'Missing slug or reviewId' }, { status: 400 });
    }

    const success = store.markReviewHelpful(slug, reviewId);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
