import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const coupons = store.getCoupons();
    return NextResponse.json({ coupons });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve coupons' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const coupon = store.validateCoupon(code);
    if (!coupon) {
      return NextResponse.json({ valid: false, message: 'Invalid or expired coupon' }, { status: 404 });
    }

    return NextResponse.json({ valid: true, coupon });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}
