"use client";

import { MarketingHeader } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { AppPreview } from '@/components/marketing/app-preview';
import { LeaguesShowcase } from '@/components/marketing/leagues-showcase';
import { MarketingFooter } from '@/components/marketing/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <MarketingHeader />
      <main className="flex-grow">
        <Hero />
        <AppPreview />
        <LeaguesShowcase />
      </main>
      <MarketingFooter />
    </div>
  );
}
