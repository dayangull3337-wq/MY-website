import { ShippingAddress } from './order';

export interface UserAddress extends ShippingAddress {
  id: string;
  isDefault: boolean;
  label: string; // "Primary Penthouse", "City Apartment", "Hamptons Estate"
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'customer' | 'admin' | 'designer';
  membershipTier: 'Veloura Member' | 'Veloura Connoisseur' | 'Atelier Private Client';
  addresses: UserAddress[];
  preferences: {
    newsletter: boolean;
    smsAlerts: boolean;
    currency: 'USD' | 'EUR' | 'GBP';
    preferredFabric: string;
  };
  createdAt: string;
}
