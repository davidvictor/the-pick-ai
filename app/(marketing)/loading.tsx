'use client';

import { Loader2 } from 'lucide-react';

/**
 * Loading state for the marketing route group
 * This provides a branded loading experience for public pages
 */
export default function MarketingLoading() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-background"></div>
          </div>
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
