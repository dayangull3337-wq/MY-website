'use client';

import React, { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { Order, OrderStatus } from '@/types/order';
import { GlassButton } from '@/components/ui/GlassButton';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/orders')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          setOrders(data.orders || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-stone-900">Orders</h1>
        <p className="text-sm text-stone-500 mt-1">Manage customer orders and logistics.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50/50">
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {order.orderNumber}
                    <div className="text-xs text-stone-500 font-normal">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    <div>{order.customer.firstName} {order.customer.lastName}</div>
                    <div className="text-xs text-stone-400">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-xs font-bold uppercase tracking-wider rounded-lg border border-stone-200 px-2 py-1 bg-stone-50 outline-none focus:ring-2 focus:ring-stone-900"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_production">In Production</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <GlassButton size="sm" variant="outline">View Details</GlassButton>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-stone-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
