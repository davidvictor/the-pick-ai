"use client";

import { ReactNode } from 'react';
import { MarketingHeader } from './header';
import { MarketingFooter } from './footer';

interface MarketingLayoutWrapperProps {
  children: ReactNode;
}

/**
 * A simple layout wrapper that adds marketing header and footer
 * Can be used by both the root page and marketing pages
 */
export function MarketingLayoutWrapper({ children }: MarketingLayoutWrapperProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Marketing Header */}
      <MarketingHeader />
      
      {/* Main Content - pass through children directly */}
      {children}
      
      {/* Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
