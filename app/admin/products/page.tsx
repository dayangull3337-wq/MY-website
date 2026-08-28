'use client';

import React, { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';
import { GlassButton } from '@/components/ui/GlassButton';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          setProducts(data.products || []);
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-stone-900">Products</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your luxury catalog.</p>
        </div>
        <GlassButton variant="primary">Add Product</GlassButton>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-stone-50/50">
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {product.name}
                    <div className="text-xs text-stone-400 font-normal">{product.id}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-600 capitalize">
                    {product.categoryName || product.categorySlug}
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900">
                    {formatPrice(product.salePrice ?? product.basePrice)}
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <GlassButton size="sm" variant="outline">Edit</GlassButton>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-stone-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
