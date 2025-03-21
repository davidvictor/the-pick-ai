'use client';

import { usePathname } from 'next/navigation';
import { MarketingLayoutWrapper } from '@/components/marketing/layout-wrapper';

/**
 * Layout for the marketing route group
 * This provides a consistent header and footer for all public marketing pages
 * without affecting the URL structure
 * Uses the shared MarketingLayoutWrapper for consistent styling with the root page
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <MarketingLayoutWrapper>
      <main className="flex-grow">
        {children}
      </main>
    </MarketingLayoutWrapper>
  );
}
