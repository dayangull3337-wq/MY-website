'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassModal } from '@/components/ui/GlassModal';
import {
  User,
  Package,
  MapPin,
  Heart,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
  Sparkles,
} from 'lucide-react';

export default function AccountPage() {
  const { user, updateProfile, addAddress, removeAddress, setDefaultAddress, logout } =
    useAuth();
  const { success } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Address Modal Fields
  const [addrFullName, setAddrFullName] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrApartment, setAddrApartment] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('CA');
  const [addrZip, setAddrZip] = useState('');
  const [addrFloor, setAddrFloor] = useState('1');
  const [addrElevator, setAddrElevator] = useState(true);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
    success('Profile Saved', 'Your atelier account details have been updated.');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      label: addrStreet ? `${addrStreet.slice(0, 20)} Residence` : 'Primary Residence',
      fullName: addrFullName || user?.name || 'Valued Client',
      addressLine1: addrStreet,
      addressLine2: addrApartment,
      city: addrCity,
      state: addrState,
      postalCode: addrZip,
      country: 'United States',
      isDefault: (user?.addresses.length || 0) === 0,
      floorLevel: `Floor ${addrFloor || 1}`,
      hasElevator: addrElevator,
    });

    setIsAddressModalOpen(false);
    setAddrStreet('');
    setAddrApartment('');
    setAddrCity('');
    setAddrZip('');
    success('Address Added', 'New residential address saved to your address book.');
  };

  return (
    <div className="py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Account Hero Bar */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-stone-200/80 bg-white/90 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center text-xl font-bold font-serif shadow-sm">
            {user?.name ? user.name[0] : 'V'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-950">
                {user?.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-600" /> VIP Atelier Member
              </span>
            </div>
            <p className="text-xs text-stone-500">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/account/orders">
            <GlassButton variant="secondary" size="sm" leftIcon={<Package className="w-3.5 h-3.5" />}>
              Order History
            </GlassButton>
          </Link>
          <GlassButton
            variant="outline"
            size="sm"
            onClick={logout}
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
          >
            Sign Out
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Personal Profile (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-200/60">
            <User className="w-4 h-4 text-stone-900" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Personal Profile
            </h2>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-3">
            <GlassInput
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <GlassInput
              label="Email Address"
              type="email"
              disabled
              value={user?.email || ''}
              helperText="Managed by Atelier security"
            />
            <GlassInput
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="pt-2">
              <GlassButton type="submit" variant="primary" size="md" className="w-full">
                Save Profile Changes
              </GlassButton>
            </div>
          </form>
        </div>

        {/* Right Column: Address Book (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-900" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Residential Address Book
              </h2>
            </div>
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddressModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Address
            </GlassButton>
          </div>

          {/* Addresses List */}
          <div className="space-y-3">
            {user?.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    addr.isDefault
                      ? 'border-stone-950 bg-stone-50/80 ring-1 ring-stone-950/15'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-950">
                          {addr.label || 'Residence'}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Primary Residence
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        {addr.addressLine1} {addr.addressLine2 && `· ${addr.addressLine2}`}<br />
                        {addr.city}, {addr.state} {addr.postalCode}<br />
                        {addr.floorLevel || 'Ground'} {addr.hasElevator ? '· Elevator' : '· Staircase'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[11px] font-semibold text-stone-600 hover:text-stone-950 underline cursor-pointer"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        aria-label="Delete address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-500 italic py-4 text-center">
                No residential addresses saved yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <GlassModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add Residential Delivery Address"
        subtitle="For seamless white-glove in-room installation"
      >
        <form onSubmit={handleCreateAddress} className="space-y-3">
          <GlassInput
            label="Recipient Full Name"
            required
            value={addrFullName}
            onChange={(e) => setAddrFullName(e.target.value)}
            placeholder="Eleanor Vanderbilt"
          />

          <GlassInput
            label="Street Address"
            required
            value={addrStreet}
            onChange={(e) => setAddrStreet(e.target.value)}
            placeholder="742 Pacific Heights Blvd"
          />

          <div className="grid grid-cols-3 gap-2">
            <GlassInput
              label="Apt/Suite"
              value={addrApartment}
              onChange={(e) => setAddrApartment(e.target.value)}
              placeholder="Unit 8"
            />
            <GlassInput
              label="City"
              required
              value={addrCity}
              onChange={(e) => setAddrCity(e.target.value)}
              placeholder="San Francisco"
            />
            <GlassInput
              label="ZIP"
              required
              value={addrZip}
              onChange={(e) => setAddrZip(e.target.value)}
              placeholder="94109"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
            <GlassButton
              type="button"
              variant="outline"
              onClick={() => setIsAddressModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton type="submit" variant="primary">
              Save Address
            </GlassButton>
          </div>
        </form>
      </GlassModal>
    </div>
  );
}
