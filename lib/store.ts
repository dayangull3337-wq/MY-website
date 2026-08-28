import { Product, SofaReview } from '@/types/product';
import { Order, OrderStatus } from '@/types/order';
import { Coupon } from '@/types/cart';
import { INITIAL_PRODUCTS as products } from '@/data/products';
import { INITIAL_ORDERS as initialOrders } from '@/data/initialOrders';

class VelouraStore {
  private products: Product[] = [...products];
  private orders: Order[] = [...initialOrders];
  private reviews: Record<string, SofaReview[]> = {};
  private coupons: Coupon[] = [
    {
      code: 'WELCOME10',
      discountType: 'percentage',
      discountValue: 10,
      description: '10% off your first Atelier piece',
      isActive: true,
    },
    {
      code: 'LUXURY20',
      discountType: 'percentage',
      discountValue: 20,
      description: '20% off seasonal curation',
      isActive: true,
    },
  ];

  // Products
  getProducts(): Product[] {
    return this.products;
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getProductsByCategory(categorySlug?: string): Product[] {
    if (!categorySlug || categorySlug === 'all') return this.products;
    return this.products.filter((p) => p.categorySlug === categorySlug);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: `sofa-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    if (this.products.length < initialLen) {
      return true;
    }
    return false;
  }

  duplicateProduct(id: string): Product | null {
    const original = this.getProductById(id);
    if (!original) return null;
    const duplicated: Product = {
      ...original,
      id: `sofa-${Date.now()}`,
      name: `${original.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.products.unshift(duplicated);
    return duplicated;
  }

  // Orders
  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  createOrder(order: Order): Order {
    this.orders.unshift(order);
    // update inventory
    order.items.forEach((item) => {
      const prod = this.getProductById(item.product?.id);
      if (prod) {
        const variant = prod.variants.find((v) => v.id === item.variant?.id);
        if (variant && typeof variant.stock === 'number') {
          variant.stock -= item.quantity;
          if (variant.stock <= 0) {
            prod.inStock = prod.variants.some((v) => v.stock > 0);
          }
        }
      }
    });
    return order;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    order.timeline.push({
      title: `Status updated to ${status.replace('_', ' ')}`,
      description: `Order status changed in atelier management.`,
      timestamp: new Date().toLocaleString(),
      completed: true,
    });
    return order;
  }

  // Reviews
  getReviewsByProductSlug(slug: string): SofaReview[] {
    return this.reviews[slug] || [];
  }

  addReview(slug: string, review: Omit<SofaReview, 'id' | 'date'>): SofaReview {
    if (!this.reviews[slug]) {
      this.reviews[slug] = [];
    }
    const newRev: SofaReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString(),
    };
    this.reviews[slug].unshift(newRev);

    // Update product rating
    const prod = this.getProductBySlug(slug);
    if (prod) {
      const allRevs = this.reviews[slug];
      const sum = allRevs.reduce((acc, r) => acc + r.rating, 0);
      const avg = sum / allRevs.length;
      prod.rating = Math.round(avg * 10) / 10;
      prod.reviewCount = allRevs.length;
    }
    return newRev;
  }

  markReviewHelpful(slug: string, reviewId: string): boolean {
    const revs = this.reviews[slug];
    if (!revs) return false;
    const r = revs.find((item) => item.id === reviewId);
    if (r) {
      r.helpfulCount += 1;
      return true;
    }
    return false;
  }

  // Coupons
  getCoupons(): Coupon[] {
    return this.coupons;
  }

  validateCoupon(code: string): Coupon | undefined {
    const c = this.coupons.find(
      (coupon) => coupon.code.toUpperCase() === code.trim().toUpperCase() && coupon.isActive
    );
    return c;
  }

  createCoupon(coupon: Coupon): Coupon {
    this.coupons.unshift(coupon);
    return coupon;
  }

  toggleCoupon(code: string): boolean {
    const c = this.coupons.find((coupon) => coupon.code === code);
    if (c) {
      c.isActive = !c.isActive;
      return true;
    }
    return false;
  }

  // Dashboard Stats
  getDashboardStats() {
    const totalRevenue = this.orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter((o) => o.status !== 'delivered').length;
    const uniqueCustomers = new Set(this.orders.map((o) => o.customer.email)).size;
    return { totalRevenue, totalOrders, pendingOrders, uniqueCustomers };
  }
}

// Ensure a single instance across hot reloads in dev
const globalForStore = global as unknown as { velouraStore: VelouraStore };
export const store = globalForStore.velouraStore || new VelouraStore();
if (process.env.NODE_ENV !== 'production') globalForStore.velouraStore = store;
