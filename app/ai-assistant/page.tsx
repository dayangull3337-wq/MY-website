'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassSelect } from '@/components/ui/GlassSelect';
import { formatPrice } from '@/lib/utils';
import { RichAIMessage } from '@/components/ai/RichAIMessage';
import {
  Sparkles,
  Send,
  User,
  RotateCcw,
  ArrowRight,
  Sliders,
  Compass,
  Layers,
  Ruler,
  ShieldCheck,
  Truck,
  CheckCircle2,
  X,
  Eye,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  recommendedSlugs?: string[];
  timestamp: string;
}

// Veloura Animated Luxury Logo Avatar with Starlight Orbital Pulse
function AIAvatar({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const isSm = size === 'sm';
  return (
    <div className={`relative ${isSm ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center shrink-0`}>
      {/* Animated Ambient Gold Aura */}
      <motion.div
        animate={{ rotate: [0, 360], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-600/50 via-stone-400/20 to-amber-300/60 blur-[3px] opacity-80"
      />

      {/* Orbit Ring with revolving gold jewel */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="rgba(217, 169, 102, 0.6)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <motion.circle
          cx="20"
          cy="2"
          r="2.5"
          fill="#d4af37"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Central Crest Badge */}
      <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#141210] border border-amber-400/60 shadow-lg flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-200/30 to-transparent skew-x-12 pointer-events-none"
        />
        <span className="font-serif italic font-extrabold text-amber-100 text-sm sm:text-base leading-none drop-shadow-sm">
          V
        </span>
      </div>
    </div>
  );
}

const QUICK_INQUIRY_PILLS = [
  { label: '🛋️ 4-Seater L-Shape Sofas', prompt: 'Show me your genuine 4-seater L-shape sectionals with full dimensions and chaise specifications.' },
  { label: '📐 Exact Spatial Dimensions', prompt: 'What are the exact width, seat depth, and room clearance requirements for Veloura sectionals?' },
  { label: '✨ Pet & Child Friendly Fabrics', prompt: 'Which sofa fabrics are best for homes with pets and kids? Explain the Martindale rub count and stain resistance.' },
  { label: '⚖️ Compare Mayfair vs Chelsea', prompt: 'Please provide a detailed direct comparison between the Mayfair 4-Seater L-Shape and the Chelsea 4-Seater Corner Sofa.' },
  { label: '🚚 Complimentary UK Delivery', prompt: 'How does your UK White-Glove in-room installation, 100-day trial, and 10-year beechwood guarantee work?' },
];

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: `Hello and welcome to Veloura London! I am your personal interior architect, design helper, and sofa stylist.\n\nHow are you doing today? Whether you're looking for a bespoke **4-seater L-shape sectional**, down cushion firmness, pet-friendly fabrics, or custom room dimensions in **£ GBP**, I'm here to assist you like a true friend.\n\nWhat kind of sofa or living room design would you like to explore today?`,
      recommendedSlugs: ['mayfair-4-seater-l-shape-chaise-sectional', 'chelsea-4-seater-l-shape-corner-sofa', 'aurelia-grand-sectional'],
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roomSize, setRoomSize] = useState('Standard (14ft × 18ft)');
  const [stylePref, setStylePref] = useState('Organic Modern');
  const [seatingNeeds, setSeatingNeeds] = useState('4 Persons (L-Shape Sectional)');
  const [hasPets, setHasPets] = useState(true);
  const [budget, setBudget] = useState('£2,500 – £3,500');
  const [selectedProductSpec, setSelectedProductSpec] = useState<Product | null>(null);

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (messageText?: string) => {
      const textToSend = messageText || input;
      if (!textToSend.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: textToSend.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);
      if (!messageText) setInput('');
      setIsLoading(true);

      try {
        const conversationHistory = messages.map((m) => ({
          role: m.role,
          text: m.text,
        }));

        const res = await fetch('/api/ai/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            history: conversationHistory,
            preferences: {
              roomSize,
              style: stylePref,
              seating: seatingNeeds,
              hasPets,
              budget,
            },
          }),
        });

        const data = await res.json();

        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: data.text || 'I recommend exploring our bespoke sectionals for timeless comfort.',
          recommendedSlugs: data.recommendedProductSlugs || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('AI error:', error);
        const fallbackMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: 'Main aapke liye hamare **Mayfair 4-Seater L-Shape Chaise Sectional** (£2,850) aur **Chelsea 4-Seater L-Shape Corner Sofa** (£3,490) recommend karta hoon. Dono models mein premium European beechwood frame aur complimentary UK White-Glove delivery shamil hai.',
          recommendedSlugs: ['mayfair-4-seater-l-shape-chaise-sectional', 'chelsea-4-seater-l-shape-corner-sofa'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, roomSize, stylePref, seatingNeeds, hasPets, budget]
  );

  const hasTriggeredInitialPrompt = useRef(false);

  useEffect(() => {
    if (initialPrompt && !hasTriggeredInitialPrompt.current) {
      hasTriggeredInitialPrompt.current = true;
      const timer = setTimeout(() => {
        sendMessage(initialPrompt);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialPrompt, sendMessage]);

  const getRecommendedProducts = (slugs: string[] = []): Product[] => {
    return INITIAL_PRODUCTS.filter((p) => slugs.includes(p.slug));
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Veloura Intelligence Concierge & Architect</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-950">
            Veloura AI Sofa Concierge & Room Stylist
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Your personal design companion for bespoke 4-seater L-shape sectionals, room spatial geometry, and fabric recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setMessages([messages[0]]);
            }}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer self-start md:self-auto px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Inquiry Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 shrink-0">
          Suggested:
        </span>
        {QUICK_INQUIRY_PILLS.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(pill.prompt)}
            className="shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full bg-stone-50 hover:bg-amber-50/80 border border-stone-200/80 hover:border-amber-400 text-stone-700 hover:text-amber-950 transition-all cursor-pointer shadow-2xs"
          >
            {pill.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Room & Preference Configurator */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-stone-200/80 bg-white/80 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-200/60">
            <Sliders className="w-4 h-4 text-stone-900" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              Living Room Parameters
            </h2>
          </div>

          <GlassSelect
            label="Room Scale & Dimensions"
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
            options={[
              { label: 'Compact / Apartment (10ft × 12ft)', value: 'Compact (10ft × 12ft)' },
              { label: 'Standard Living Room (14ft × 18ft)', value: 'Standard (14ft × 18ft)' },
              { label: 'Grand Great Room (20ft × 26ft+)', value: 'Grand (20ft × 26ft+)' },
              { label: 'Open-Concept Townhouse Loft', value: 'Open-Concept Townhouse Loft' },
            ]}
          />

          <GlassSelect
            label="Aesthetic Architectural Style"
            value={stylePref}
            onChange={(e) => setStylePref(e.target.value)}
            options={[
              { label: 'Organic Modern (Warm Bouclés, Curves)', value: 'Organic Modern' },
              { label: 'Italian Contemporary (Low-Profile, Leather)', value: 'Italian Contemporary' },
              { label: 'Modern British Luxury (Tailored Linen, Plush)', value: 'Modern British Luxury' },
              { label: 'Scandinavian Minimal (Clean Lines, Light Oak)', value: 'Scandinavian Minimal' },
            ]}
          />

          <GlassSelect
            label="Seating Capacity Goal"
            value={seatingNeeds}
            onChange={(e) => setSeatingNeeds(e.target.value)}
            options={[
              { label: '4 Persons (L-Shape Chaise Sectional)', value: '4 Persons (L-Shape Sectional)' },
              { label: '2–3 Persons (Intimate Lounge)', value: '2–3 Persons' },
              { label: '5–6 Persons (Grand Modular Pit)', value: '5–6 Persons' },
            ]}
          />

          <GlassSelect
            label="Target Budget Tier (£)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            options={[
              { label: 'Under £2,500', value: 'Under £2,500' },
              { label: '£2,500 – £3,500', value: '£2,500 – £3,500' },
              { label: '£3,500 – £5,000+', value: '£3,500 – £5,000+' },
            ]}
          />

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                Pet & Child Friendly Fabrics
              </span>
              <span className="text-[11px] text-stone-500">
                Prioritizes Martindale 60,000+ rub counts & stain resistance
              </span>
            </div>
            <input
              type="checkbox"
              checked={hasPets}
              onChange={(e) => setHasPets(e.target.checked)}
              className="w-4 h-4 rounded text-stone-900 focus:ring-stone-900 cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <GlassButton
              variant="primary"
              size="md"
              className="w-full"
              onClick={() =>
                sendMessage(
                  `Please analyze my room (${roomSize}), style (${stylePref}), for ${seatingNeeds}, pets: ${
                    hasPets ? 'Yes' : 'No'
                  }, budget: ${budget}. What are your top recommended 4-seater L-shape sectionals?`
                )
              }
              leftIcon={<Compass className="w-4 h-4" />}
            >
              Analyze & Match Sofas
            </GlassButton>
          </div>
        </div>

        {/* Right: Conversational Dialogue Feed */}
        <div className="lg:col-span-8 flex flex-col h-[650px] rounded-3xl glass-panel border border-stone-200/80 bg-white/90 shadow-md overflow-hidden">
          {/* Messages Scroll Area - isolated scroll */}
          <div
            ref={chatScrollContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && <AIAvatar size="md" />}

                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-3xl p-4 sm:p-5 space-y-3 shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white rounded-br-sm'
                      : 'glass-panel-subtle border border-stone-200/90 text-stone-900 bg-white/95 rounded-bl-sm'
                  }`}
                >
                  {/* Rich Formatted Message with Custom Luxury Badges */}
                  <RichAIMessage content={msg.text} isUser={msg.role === 'user'} />

                  {/* Recommended Products Rich Cards */}
                  {msg.recommendedSlugs && msg.recommendedSlugs.length > 0 && (
                    <div className="pt-3.5 border-t border-stone-200/70 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900/80 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Recommended Atelier Models:</span>
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium">
                          Click card to inspect specs
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {getRecommendedProducts(msg.recommendedSlugs).map((p) => (
                          <div
                            key={p.id}
                            className="p-3 rounded-2xl bg-white border border-stone-200/80 hover:border-amber-500/80 hover:shadow-md transition-all group flex flex-col justify-between"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                                <Image
                                  src={p.variants[0].image}
                                  alt={p.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-stone-950 truncate group-hover:text-amber-900 transition-colors">
                                  {p.name}
                                </h4>
                                <span className="text-xs text-amber-900 font-bold block mt-0.5">
                                  {formatPrice(p.salePrice ?? p.basePrice)}
                                  {p.isOnSale && (
                                    <span className="line-through text-[10px] text-stone-400 font-normal ml-1.5">
                                      {formatPrice(p.basePrice)}
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-stone-500 block truncate">
                                  {p.seatingCapacity} Persons • {p.firmness}
                                </span>
                              </div>
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-stone-100">
                              <button
                                onClick={() => setSelectedProductSpec(p)}
                                className="flex-1 text-[11px] font-semibold py-1 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" /> Quick Specs
                              </button>
                              <Link
                                href={`/sofas/${p.slug}`}
                                className="flex-1 text-[11px] font-semibold py-1 px-2 rounded-lg bg-stone-900 hover:bg-amber-950 text-white text-center transition-colors flex items-center justify-center gap-1"
                              >
                                View <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="text-[10px] opacity-60 block text-right pt-1">{msg.timestamp}</span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Brand Design Animated Response Generator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3.5 justify-start items-center"
              >
                <AIAvatar size="sm" />
                <div className="p-4 rounded-3xl glass-panel border border-amber-400/40 bg-gradient-to-r from-white via-amber-50/40 to-white text-xs text-stone-800 flex items-center gap-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-amber-600"
                    />
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-amber-600"
                    />
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-amber-600"
                    />
                  </div>
                  <span className="font-serif italic font-medium text-stone-900">
                    Veloura Atelier Concierge is analyzing spatial geometry & matching fabrics...
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-4 border-t border-stone-200/70 bg-stone-50/90 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything or chat like a friend (e.g. Kaise ho dost? Show me 4-seater L-shape sofas)..."
              className="flex-1 rounded-2xl glass-input px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none placeholder:text-stone-400"
            />
            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading || !input.trim()}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send
            </GlassButton>
          </form>
        </div>
      </div>

      {/* Quick Specs Inspector Modal */}
      <AnimatePresence>
        {selectedProductSpec && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-stone-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProductSpec(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={selectedProductSpec.variants[0].image}
                    alt={selectedProductSpec.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-block mb-1">
                    {selectedProductSpec.categoryName} • {selectedProductSpec.seatingCapacity} Persons
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-950">
                    {selectedProductSpec.name}
                  </h3>
                  <span className="text-sm font-bold text-amber-900">
                    {formatPrice(selectedProductSpec.salePrice ?? selectedProductSpec.basePrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-200 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-2xl">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Width × Depth × Height</span>
                    <span className="font-semibold text-stone-900">{selectedProductSpec.dimensions.width} × {selectedProductSpec.dimensions.depth}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Seat Depth & Height</span>
                    <span className="font-semibold text-stone-900">{selectedProductSpec.dimensions.seatDepth} (Depth) • {selectedProductSpec.dimensions.seatHeight} (Height)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Frame & Foundation</span>
                  <p className="font-medium text-stone-800">{selectedProductSpec.frameMaterial}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Cushion Core & Fill</span>
                  <p className="font-medium text-stone-800">{selectedProductSpec.cushionFill}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Key Bespoke Features</span>
                  <ul className="space-y-1">
                    {selectedProductSpec.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <Link
                  href={`/sofas/${selectedProductSpec.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-amber-950 transition-colors"
                >
                  Explore Full Atelier Page
                </Link>
                <button
                  onClick={() => {
                    setSelectedProductSpec(null);
                    sendMessage(`Tell me more about the ${selectedProductSpec.name} materials, swatches, and customization options.`);
                  }}
                  className="flex-1 text-center py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Ask AI About This Model
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Loading Veloura Atelier Concierge...
          </p>
        </div>
      }
    >
      <AIAssistantContent />
    </Suspense>
  );
}
