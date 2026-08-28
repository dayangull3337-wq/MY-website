import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Veloura — Luxury Sofa Atelier | Bespoke Seating Architecture',
  description:
    'Handcrafted premium sectionals, curved silhouettes, and modular sofa architecture in Italian bouclé, velvet, and full-grain leather. Complimentary white-glove in-room delivery & 100-day in-home trial.',
  openGraph: {
    title: 'Veloura — Luxury Sofa Atelier',
    description:
      'Handcrafted premium sectionals, curved silhouettes, and modular sofa architecture.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="antialiased bg-[#fdfcfb] text-[#1a1a1a] min-h-screen">
        <div className="hero-gradient" aria-hidden="true" />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

