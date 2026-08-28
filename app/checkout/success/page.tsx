'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types/order';
import { INITIAL_ORDERS } from '@/data/initialOrders';
import { formatPrice } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import {
  CheckCircle2,
  Truck,
  Package,
  Calendar,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
} from 'lucide-react';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (orderId) {
        try {
          const res = await fetch(`/api/orders/${orderId}`);
          if (res.ok) {
            const data = await res.json();
            setOrder(data.order);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Fallback to recent sample order
      setOrder(INITIAL_ORDERS[0]);
      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
          Retrieving White-Glove Order Dispatch...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-950">Order Not Found</h2>
        <Link href="/sofas">
          <GlassButton variant="primary" size="md">
            Return to Atelier Catalog
          </GlassButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-stone-200/80 bg-white/90 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Confirmed & Assigned to Tailoring</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-950">
            Thank you for choosing Veloura.
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-lg mx-auto leading-relaxed">
            Your order <strong>{order.orderNumber}</strong> has been logged with our master atelier. A logistics specialist will coordinate white-glove delivery to your residence.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl glass-panel-subtle border border-stone-300 text-stone-700 hover:text-stone-950 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Atelier Receipt</span>
          </button>

          <Link href="/account/orders">
            <GlassButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Track Order in Client Portal
            </GlassButton>
          </Link>
        </div>
      </div>

      {/* White-Glove Dispatch Timeline Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200/60">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-950">
              White-Glove In-Room Logistics Tracker
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Carrier: {order.carrier} · Tracking ID: {order.trackingNumber}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
            <Calendar className="w-4 h-4 text-stone-700" />
            <span>Target Delivery: {order.estimatedDeliveryDate}</span>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-6">
          {order.timeline.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.completed
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-400 border border-stone-200'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < order.timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-12 my-1 ${
                      step.completed ? 'bg-stone-900' : 'bg-stone-200'
                    }`}
                  />
                )}
              </div>

              <div className="space-y-0.5 pt-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-stone-900">{step.title}</h4>
                  <span className="text-[11px] text-stone-400">({step.timestamp})</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Shipping Destination */}
        <div className="md:col-span-6 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
            <MapPin className="w-4 h-4 text-stone-900" />
            <span>Residential Delivery Destination</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong className="text-stone-950 font-bold block">{order.customer.firstName} {order.customer.lastName}</strong>
            {order.shippingAddress.addressLine1} {order.shippingAddress.addressLine2 && `· ${order.shippingAddress.addressLine2}`}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
            Level: {order.shippingAddress.floorLevel || 'Ground Floor'} {order.shippingAddress.hasElevator ? '(Elevator Access)' : '(Staircase Access)'}
          </p>
          {order.shippingAddress.deliveryNotes && (
            <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              Note: {order.shippingAddress.deliveryNotes}
            </p>
          )}
        </div>

        {/* Payment Summary */}
        <div className="md:col-span-6 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/70 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
            <ShieldCheck className="w-4 h-4 text-stone-900" />
            <span>Payment & Financial Summary</span>
          </div>
          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-stone-900">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Atelier Discount ({order.couponCode})</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>White-Glove Setup</span>
              <span className="font-semibold text-emerald-700">Complimentary</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span className="font-semibold text-stone-900">{formatPrice(order.tax)}</span>
            </div>
            <div className="pt-2 border-t border-stone-200/80 flex justify-between text-sm font-bold text-stone-950">
              <span>Total Paid</span>
              <span className="text-base font-black font-serif">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Loading Atelier Order Confirmation...
          </p>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
