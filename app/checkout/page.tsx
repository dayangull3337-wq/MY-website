'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/utils';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassSelect } from '@/components/ui/GlassSelect';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  RotateCcw,
  ShoppingBag,
  Tag,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    discount,
    coupon,
    shippingFee,
    tax,
    total,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Customer & Address
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('');
  const [floorNumber, setFloorNumber] = useState('1');
  const [hasElevator, setHasElevator] = useState(true);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Step 2: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'white_glove' | 'express'>('white_glove');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'affirm'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('');

  // Coupon input
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    setIsApplyingCoupon(true);
    const ok = await applyCoupon(couponCodeInput.trim());
    setIsApplyingCoupon(false);
    if (ok) {
      setCouponCodeInput('');
    }
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toastError('Empty Bag', 'Your shopping bag is empty.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        customer: {
          name: `${firstName} ${lastName}`.trim() || 'Valued Atelier Client',
          email: email || 'client@veloura-atelier.co.uk',
          phone: phone || '+44 20 7946 0892',
        },
        shippingAddress: {
          fullName: `${firstName} ${lastName}`.trim() || 'Valued Atelier Client',
          street: street || '14 Grosvenor Square',
          apartment: apartment || 'Flat 4B',
          city: city || 'London',
          state: state || 'Greater London',
          zipCode: zipCode || 'W1K 6LD',
          country: 'United Kingdom',
          floorNumber: Number(floorNumber) || 1,
          hasElevator,
          deliveryNotes,
        },
        deliveryMethod: {
          id: deliveryMethod,
          title:
            deliveryMethod === 'white_glove'
              ? 'Complimentary White-Glove UK In-Room Installation'
              : 'Express UK White-Glove Dispatch',
          description: 'Two-person placement, uncrating, leveling & packaging removal across Great Britain',
          price: deliveryMethod === 'white_glove' ? 0 : 85,
          estimatedDays: '2–4 Business Days',
          badge: deliveryMethod === 'white_glove' ? 'Complimentary VIP' : 'Express Tier',
        },
        payment: {
          method: paymentMethod,
          cardLastFour: paymentMethod === 'card' ? '4242' : undefined,
          cardBrand: paymentMethod === 'card' ? 'Visa Infinite Luxury' : undefined,
          transactionId: `txn_uk_${Date.now()}`,
          paidAt: new Date().toISOString(),
        },
        items,
        subtotal,
        discount,
        couponCode: coupon?.code || null,
        shippingFee: deliveryMethod === 'white_glove' ? 0 : 85,
        tax,
        total: total + (deliveryMethod === 'white_glove' ? 0 : 85),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok && data.order) {
        clearCart();
        success('Order Confirmed!', `Order ${data.order.orderNumber} placed successfully.`);
        router.push(`/checkout/success?orderId=${data.order.id}`);
      } else {
        throw new Error(data.error || 'Failed to place order');
      }
    } catch (err: any) {
      console.error(err);
      toastError('Checkout Error', err.message || 'Please verify your billing details.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full glass-panel-subtle flex items-center justify-center mx-auto text-stone-400 border border-stone-200">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-950">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Explore our handcrafted sofa collection to begin configuring your bespoke living space.
        </p>
        <Link href="/sofas">
          <GlassButton variant="primary" size="lg" className="mt-4">
            Explore All Sofas (20)
          </GlassButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-stone-200/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            <Lock className="w-3.5 h-3.5 text-stone-700" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950">
            Veloura White-Glove Checkout
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold">
          <span className={`px-3 py-1 rounded-full ${currentStep === 1 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>
            1. Residence & Setup
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className={`px-3 py-1 rounded-full ${currentStep === 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>
            2. Logistics
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className={`px-3 py-1 rounded-full ${currentStep === 3 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'}`}>
            3. Payment
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Form Area (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: RESIDENCE & IN-ROOM DETAILS */}
          <div className={`p-6 rounded-3xl glass-panel border transition-all ${currentStep === 1 ? 'border-stone-900 ring-2 ring-stone-900/10 shadow-md bg-white' : 'border-stone-200/80 bg-white/70'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h2 className="font-serif text-lg font-bold text-stone-950">
                  Residential Destination & White-Glove In-Room Placement
                </h2>
              </div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <GlassInput
                    label="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Eleanor"
                  />
                  <GlassInput
                    label="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vanderbilt"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <GlassInput
                    label="Email Address for Tracking"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@residence.com"
                  />
                  <GlassInput
                    label="Mobile Phone (for delivery call)"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(415) 890-2345"
                  />
                </div>

                <GlassInput
                  label="Street Address"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="742 Pacific Heights Boulevard"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <GlassInput
                    label="Apt / Suite / Floor"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Penthouse 8B"
                  />
                  <GlassInput
                    label="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                  />
                  <GlassInput
                    label="Postal ZIP Code"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="94109"
                  />
                </div>

                {/* White-Glove Delivery Access Details */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                    <Truck className="w-4 h-4 text-stone-900" />
                    <span>In-Room Delivery Logistics Clearance</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <GlassSelect
                      label="Delivery Floor"
                      value={floorNumber}
                      onChange={(e) => setFloorNumber(e.target.value)}
                      options={[
                        { label: 'Ground Floor / Level 1', value: '1' },
                        { label: 'Floor 2 (Stairs or Elevator)', value: '2' },
                        { label: 'Floor 3 (Stairs or Elevator)', value: '3' },
                        { label: 'Floor 4+ (Freight Elevator Available)', value: '4' },
                      ]}
                    />

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/60 mt-5">
                      <span className="text-xs font-semibold text-stone-800">
                        Elevator / Service Lift Available?
                      </span>
                      <input
                        type="checkbox"
                        checked={hasElevator}
                        onChange={(e) => setHasElevator(e.target.checked)}
                        className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <GlassInput
                    label="Gate Codes, Parking Instructions, or Hallway Width Notes"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Call at gate #402, use freight elevator on west corridor..."
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue to Logistics Tier
                  </GlassButton>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-600">
                {firstName} {lastName} · {street} {apartment}, {city}, {state} {zipCode} (Floor {floorNumber})
              </p>
            )}
          </div>

          {/* STEP 2: LOGISTICS & WHITE-GLOVE METHOD */}
          <div className={`p-6 rounded-3xl glass-panel border transition-all ${currentStep === 2 ? 'border-stone-900 ring-2 ring-stone-900/10 shadow-md bg-white' : 'border-stone-200/80 bg-white/70'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h2 className="font-serif text-lg font-bold text-stone-950">
                  White-Glove Delivery Experience
                </h2>
              </div>
              {currentStep > 2 && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 2 ? (
              <div className="space-y-3">
                {/* Method 1: Complimentary VIP */}
                <label
                  onClick={() => setDeliveryMethod('white_glove')}
                  className={`p-4 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'white_glove'
                      ? 'border-stone-950 bg-stone-50 ring-1 ring-stone-950'
                      : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'white_glove'}
                      onChange={() => setDeliveryMethod('white_glove')}
                      className="mt-1 text-stone-950 focus:ring-stone-950"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">
                          Complimentary White-Glove In-Room Installation
                        </span>
                        <span className="text-[10px] font-bold bg-stone-900 text-white px-2 py-0.5 rounded-full">
                          Complimentary
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        Two-person delivery team carries into your selected room, uncrates, joins modules, inspects seams, and recycles all packaging debris.
                      </p>
                      <span className="text-[11px] text-stone-700 font-semibold block mt-1">
                        Est. Delivery: 3–5 Business Days
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-800">$0.00</span>
                </label>

                {/* Method 2: Express VIP */}
                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-stone-950 bg-stone-50 ring-1 ring-stone-950'
                      : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="mt-1 text-stone-950 focus:ring-stone-950"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">
                          Priority Expedited Dispatch & White-Glove
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        Priority queue in our atelier crating facility with direct dedicated freight routing.
                      </p>
                      <span className="text-[11px] text-stone-700 font-semibold block mt-1">
                        Est. Delivery: 1–2 Business Days
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-stone-900">$150.00</span>
                </label>

                <div className="pt-3 flex justify-between items-center">
                  <GlassButton
                    variant="outline"
                    size="md"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={() => setCurrentStep(3)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Payment
                  </GlassButton>
                </div>
              </div>
            ) : (
              currentStep > 2 && (
                <p className="text-xs text-stone-600">
                  {deliveryMethod === 'white_glove'
                    ? 'Complimentary White-Glove In-Room Placement ($0.00)'
                    : 'Expedited Priority Dispatch ($150.00)'}
                </p>
              )
            )}
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className={`p-6 rounded-3xl glass-panel border transition-all ${currentStep === 3 ? 'border-stone-900 ring-2 ring-stone-900/10 shadow-md bg-white' : 'border-stone-200/80 bg-white/70'}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <h2 className="font-serif text-lg font-bold text-stone-950">
                Payment & Billing Authorization
              </h2>
            </div>

            {currentStep === 3 && (
              <div className="space-y-4">
                {/* Method Switcher */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'glass-panel text-stone-700 hover:bg-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'glass-panel text-stone-700 hover:bg-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('affirm')}
                    className={`p-3 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'affirm'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'glass-panel text-stone-700 hover:bg-white'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    <span>0% APR Affirm</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <GlassInput
                      label="Cardholder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Eleanor Vanderbilt"
                    />

                    <GlassInput
                      label="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      leftIcon={<CreditCard className="w-4 h-4 text-stone-400" />}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <GlassInput
                        label="Expiry Date"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                      />
                      <GlassInput
                        label="Security CVC"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        leftIcon={<Lock className="w-3.5 h-3.5 text-stone-400" />}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="p-6 rounded-2xl bg-stone-950 text-white text-center space-y-2">
                    <span className="font-serif text-lg font-bold">Apple Pay / Google Express Ready</span>
                    <p className="text-xs text-stone-400">
                      Biometric authorization will prompt automatically upon tapping Place Order.
                    </p>
                  </div>
                )}

                {paymentMethod === 'affirm' && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-2">
                    <span className="text-xs font-bold block">
                      Pay as low as {formatPrice(Math.round(total / 12))}/month with 0% APR via Affirm
                    </span>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Instant pre-qualification without affecting your credit score. Zero hidden fees.
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <GlassButton
                    id="place-order-final-btn"
                    variant="primary"
                    size="xl"
                    className="w-full shadow-2xl"
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                    leftIcon={<Lock className="w-4 h-4" />}
                  >
                    Place Atelier Order · {formatPrice(total + (deliveryMethod === 'white_glove' ? 0 : 150))}
                  </GlassButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Sidebar (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 shadow-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-950 pb-3 border-b border-stone-200/60">
              Living Room Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                    <Image
                      src={item.variant?.image || item.product?.variants?.[0]?.image || '/placeholder.png'}
                      alt={item.product?.name || 'Sofa'}
                      fill
                      sizes="64px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product?.name || 'Veloura Sofa'}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {item.variant?.colorName || 'Bespoke'} · {item.configuration}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-stone-950">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-3 border-t border-stone-200/60">
              {coupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{coupon.code} ({coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `$${coupon.discountValue} OFF`})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="Coupon (e.g. VELOURA15)"
                    className="flex-1 rounded-xl glass-input px-3 py-2 text-xs text-stone-900 uppercase focus:outline-none"
                  />
                  <GlassButton
                    type="submit"
                    variant="secondary"
                    size="sm"
                    isLoading={isApplyingCoupon}
                  >
                    Apply
                  </GlassButton>
                </form>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-3 border-t border-stone-200/60 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Atelier Privilege Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White-Glove In-Room Setup</span>
                <span className="font-semibold text-stone-900">
                  {deliveryMethod === 'white_glove' ? (
                    <span className="text-emerald-700 font-bold">Complimentary ($0)</span>
                  ) : (
                    '$150.00'
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="font-semibold text-stone-900">{formatPrice(tax)}</span>
              </div>

              <div className="pt-3 border-t border-stone-200/80 flex justify-between items-baseline text-sm text-stone-950 font-bold">
                <span>Total Amount</span>
                <span className="text-2xl font-black font-serif">
                  {formatPrice(total + (deliveryMethod === 'white_glove' ? 0 : 150))}
                </span>
              </div>
            </div>

            {/* Trial & Warranty Guarantee */}
            <div className="pt-3 border-t border-stone-200/60 space-y-2 text-[11px] text-stone-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>100-Day In-Home Living Room Trial Included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>10-Year Kiln-Dried Hardwood Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
