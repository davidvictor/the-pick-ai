'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Error state for the dashboard route group
 * This provides a contextual error experience for authenticated dashboard pages
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="max-w-md p-8 rounded-lg border border-muted bg-card shadow-sm">
        <div className="flex flex-col items-center space-y-6 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Dashboard Error</h2>
            <p className="text-muted-foreground">
              We encountered an issue while loading your dashboard data.
            </p>
            {error.message && process.env.NODE_ENV === 'development' && (
              <div className="p-4 my-4 bg-muted/50 rounded-md text-sm text-left overflow-auto">
                <code>{error.message}</code>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/app'}>
              Go to Dashboard Home
            </Button>
            <Button onClick={() => reset()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
