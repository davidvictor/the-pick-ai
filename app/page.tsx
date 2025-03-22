'use client';

import { Hero } from '@/components/marketing/hero';
import { MarketingLayoutWrapper } from '@/components/marketing/layout-wrapper';

/**
 * Main homepage - uses the marketing components with the marketing layout
 * This is the primary page that handles the root URL path (/)
 */
export default function HomePage() {
  return (
    <MarketingLayoutWrapper>
      <main className="flex-grow">
        <Hero />
      </main>
    </MarketingLayoutWrapper>
  );
}
