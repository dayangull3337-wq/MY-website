import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = store.getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: 'Sofa not found' }, { status: 404 });
    }
    const reviews = store.getReviewsByProductSlug(slug);
    return NextResponse.json({ product, reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve sofa' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = store.getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: 'Sofa not found' }, { status: 404 });
    }

    const updates = await req.json();
    const updated = store.updateProduct(product.id, updates);
    return NextResponse.json({ product: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sofa' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = store.getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: 'Sofa not found' }, { status: 404 });
    }

    store.deleteProduct(product.id);
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sofa' }, { status: 500 });
  }
}
