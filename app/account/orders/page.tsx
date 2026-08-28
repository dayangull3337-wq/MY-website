'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Order } from '@/types/order';
import { INITIAL_ORDERS } from '@/data/initialOrders';
import { formatPrice } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { Package, Truck, Calendar, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || INITIAL_ORDERS);
        } else {
          setOrders(INITIAL_ORDERS);
        }
      } catch {
        setOrders(INITIAL_ORDERS);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/60">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <Link href="/account" className="hover:text-stone-900">
              Account
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-stone-900 font-semibold">Orders</span>
          </nav>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950">
            Atelier Order History & Logistics Tracking
          </h1>
        </div>

        <Link href="/sofas">
          <GlassButton variant="secondary" size="sm">
            Browse Catalog
          </GlassButton>
        </Link>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/85 shadow-sm space-y-4"
            >
              {/* Top Order Metadata Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/60">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base text-stone-950">
                      Order {order.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'in_transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className="text-sm font-extrabold text-stone-950 font-serif">
                    {formatPrice(order.total)}
                  </span>
                  <Link href={`/checkout/success?orderId=${order.id}`}>
                    <GlassButton
                      variant="outline"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Track Dispatch
                    </GlassButton>
                  </Link>
                </div>
              </div>

              {/* Items in order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/60 flex items-center gap-3"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                      <Image
                        src={item.variant?.image || item.product?.variants?.[0]?.image || '/placeholder.png'}
                        alt={item.product?.name || 'Sofa'}
                        fill
                        sizes="56px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-950 truncate">
                        {item.product?.name || 'Veloura Sofa'}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        {item.variant?.colorName || 'Bespoke'} · Qty {item.quantity}
                      </p>
                      <span className="text-[11px] font-bold text-stone-800">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* In-Home Delivery Info */}
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-700" />
                <span>
                  Delivery: <strong>{order.deliveryMethod.title}</strong> · Est. Arrival: <strong>{order.estimatedDeliveryDate}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h2 className="font-serif text-lg font-bold text-stone-900">No Orders Yet</h2>
          <p className="text-xs text-stone-500">Your bespoke living room orders will be logged here.</p>
        </div>
      )}
    </div>
  );
}
