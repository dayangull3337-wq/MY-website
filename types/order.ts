import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'crafting' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'authorized' | 'failed' | 'refunded';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryNotes?: string;
  floorLevel?: string;
  hasElevator?: boolean;
}

export interface DeliveryMethod {
  id: string;
  title: string;
  description: string;
  price: number;
  estimatedDays: string;
  badge?: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'klarna' | 'bank_wire';
  cardLastFour?: string;
  cardBrand?: string;
  transactionId: string;
  paidAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  payment: PaymentDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  carrier: string;
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}
