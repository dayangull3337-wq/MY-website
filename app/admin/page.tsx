'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, Package, Users } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types/order';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Overview of your atelier&apos;s performance.</p>
      </div>

      {loading ? (
        <div className="text-sm text-stone-500">Loading metrics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-stone-900">{formatPrice(totalRevenue)}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-stone-100 text-stone-800 rounded-xl flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-stone-900">{totalOrders}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Pending Orders</p>
              <p className="text-2xl font-bold text-stone-900">{orders.filter(o => o.status !== 'delivered').length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">Unique Customers</p>
              <p className="text-2xl font-bold text-stone-900">
                {new Set(orders.map(o => o.customer.email)).size}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200">
          <h2 className="text-lg font-bold text-stone-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-stone-50/50">
                  <td className="px-6 py-4 font-medium text-stone-900">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-stone-600">{order.customer.firstName} {order.customer.lastName}</td>
                  <td className="px-6 py-4 text-stone-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
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
