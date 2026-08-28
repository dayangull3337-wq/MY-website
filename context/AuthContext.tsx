'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserAddress } from '@/types/user';
import { store } from '@/lib/store';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: (UserProfile & { name?: string; phone?: string }) | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile> & { name?: string; phone?: string }) => void;
  addAddress: (address: Omit<UserAddress, 'id'> | any) => void;
  deleteAddress: (id: string) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'veloura_auth_user';

const DEFAULT_USER_DATA: UserProfile = {
  id: 'u-123',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '+1 (555) 234-5678',
  role: 'admin',
  membershipTier: 'Atelier Private Client',
  addresses: [
    {
      id: 'addr-1',
      label: 'Primary Penthouse',
      addressLine1: '740 Park Avenue',
      addressLine2: 'Penthouse B',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States',
      isDefault: true,
      floorLevel: 'Floor 18',
      hasElevator: true,
      deliveryNotes: 'White-glove elevator access arranged with concierge.',
    },
  ],
  preferences: {
    newsletter: true,
    smsAlerts: false,
    currency: 'USD',
    preferredFabric: 'Oatmeal Bouclé',
  },
  createdAt: '2023-01-01',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(UserProfile & { name?: string; phone?: string }) | null>(() => {
    const initial = DEFAULT_USER_DATA;
    return {
      ...initial,
      name: `${initial.firstName} ${initial.lastName}`,
    };
  });
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const { success, info } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user, isHydrated]);

  const login = useCallback(
    (email?: string) => {
      const u: UserProfile = {
        ...DEFAULT_USER_DATA,
        email: email || DEFAULT_USER_DATA.email,
      };
      const fullUser = { ...u, name: `${u.firstName} ${u.lastName}` };
      setUser(fullUser);
      success('Welcome back', `Signed in as ${fullUser.name}`);
    },
    [success]
  );

  const logout = useCallback(() => {
    setUser(null);
    info('Signed Out', 'You have been safely signed out of your Atelier account.');
  }, [info]);

  const updateProfile = useCallback(
    (updates: Partial<UserProfile> & { name?: string; phone?: string }) => {
      if (!user) return;
      let firstName = user.firstName;
      let lastName = user.lastName;
      if (updates.name) {
        const parts = updates.name.trim().split(' ');
        firstName = parts[0] || 'Valued';
        lastName = parts.slice(1).join(' ') || 'Client';
      }
      const updated = { ...user, ...updates, firstName, lastName };
      setUser(updated);
      success('Profile Updated', 'Your atelier preferences have been saved.');
    },
    [user, success]
  );

  const addAddress = useCallback(
    (addr: any) => {
      if (!user) return;
      const formatted: Omit<UserAddress, 'id'> = {
        label: addr.label || 'Residence',
        addressLine1: addr.addressLine1 || addr.street || '',
        addressLine2: addr.addressLine2 || addr.apartment || '',
        city: addr.city || '',
        state: addr.state || '',
        postalCode: addr.postalCode || addr.zipCode || '',
        country: addr.country || 'United States',
        isDefault: addr.isDefault || user.addresses.length === 0,
        deliveryNotes: addr.deliveryNotes || '',
        floorLevel: addr.floorLevel || `Floor ${addr.floorNumber || 1}`,
        hasElevator: addr.hasElevator ?? true,
      };

      const newAddress = { ...formatted, id: `add-${Date.now()}` };
      setUser({ ...user, addresses: [...user.addresses, newAddress as UserAddress], name: `${user.firstName} ${user.lastName}` });
      success('Address Added', `${newAddress.label} saved to your address book.`);
    },
    [user, success]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      if (!user) return;
      const remaining = user.addresses.filter(a => a.id !== id);
      setUser({ ...user, addresses: remaining, name: `${user.firstName} ${user.lastName}` });
      info('Address Removed', 'The address was removed from your account.');
    },
    [user, info]
  );

  const removeAddress = deleteAddress;

  const setDefaultAddress = useCallback(
    (id: string) => {
      if (!user) return;
      const updated = user.addresses.map(a => ({ ...a, isDefault: a.id === id }));
      setUser({ ...user, addresses: updated, name: `${user.firstName} ${user.lastName}` });
      success('Default Residence Set', 'Primary delivery destination updated.');
    },
    [user, success]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

