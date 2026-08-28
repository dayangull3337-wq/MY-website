import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q')?.toLowerCase();

    let products = store.getProducts();

    if (category && category !== 'all') {
      products = products.filter((p) => p.categorySlug === category);
    }

    if (query) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.primaryMaterial.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.basePrice || !body.categorySlug) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    const newProduct = store.createProduct(body);
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
