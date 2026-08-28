import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { Order } from '@/types/order';
import { generateOrderNumber, getEstimatedDeliveryDate } from '@/lib/utils';

export async function GET() {
  try {
    const orders = store.getOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.items || body.items.length === 0 || !body.customer || !body.shippingAddress) {
      return NextResponse.json({ error: 'Incomplete order payload' }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const orderId = `ord-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt,
      customer: body.customer,
      shippingAddress: body.shippingAddress,
      deliveryMethod: body.deliveryMethod || {
        id: 'white_glove_vip',
        title: 'White-Glove In-Room Installation',
        description: 'Scheduled two-person delivery, laser leveling, unpacking & debris removal',
        price: 0,
        estimatedDays: '3–5 Business Days',
        badge: 'Complimentary VIP',
      },
      payment: body.payment || {
        method: 'card',
        cardLastFour: '4242',
        cardBrand: 'Visa Black',
        transactionId: `txn_${Date.now()}`,
        paidAt: createdAt,
      },
      items: body.items,
      subtotal: body.subtotal,
      discount: body.discount || 0,
      couponCode: body.couponCode || null,
      shippingFee: body.shippingFee || 0,
      tax: body.tax || 0,
      total: body.total,
      status: 'confirmed',
      paymentStatus: 'paid',
      estimatedDeliveryDate: getEstimatedDeliveryDate(5),
      trackingNumber: `VEL-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'Veloura White-Glove Logistics Concierge',
      timeline: [
        {
          title: 'Order Confirmed & Atelier Hand-Tailoring Assigned',
          description: 'Payment authorized and verified with luxury fraud protection.',
          timestamp: new Date().toLocaleString(),
          completed: true,
        },
        {
          title: 'Quality Inspection & Protective Crate Assembly',
          description: '18-point seam inspection and down loft calibration scheduled.',
          timestamp: 'Scheduled Next Business Day',
          completed: false,
        },
        {
          title: 'Dispatched via White-Glove Regional Carrier',
          description: 'En route to regional residential logistics center.',
          timestamp: 'Pending Dispatch',
          completed: false,
        },
        {
          title: 'Scheduled In-Home White-Glove Installation',
          description: 'Delivery specialist will coordinate exact delivery appointment.',
          timestamp: getEstimatedDeliveryDate(5),
          completed: false,
        },
      ],
    };

    const savedOrder = store.createOrder(newOrder);
    return NextResponse.json({ order: savedOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
