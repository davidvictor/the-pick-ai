'use client';

import { Loader2 } from 'lucide-react';

/**
 * Loading state for the dashboard route group
 * This provides a contextual loading experience for authenticated dashboard pages
 */
export default function DashboardLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-background"></div>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">Loading dashboard...</p>
      </div>
    </div>
  );
}
