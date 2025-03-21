'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Error state for the marketing route group
 * This provides a user-friendly error experience for public pages
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Marketing route error:', error);
  }, [error]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="max-w-md p-8 rounded-lg border border-muted shadow-sm">
        <div className="flex flex-col items-center space-y-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-muted-foreground">
              We apologize for the inconvenience. Please try again or contact support if the problem persists.
            </p>
            {error.message && process.env.NODE_ENV === 'development' && (
              <div className="p-4 my-4 bg-muted/50 rounded-md text-sm text-left overflow-auto">
                <code>{error.message}</code>
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go Home
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
