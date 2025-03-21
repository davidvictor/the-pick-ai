'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

/**
 * Error state for the auth route group
 */
export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Authentication error:', error);
  }, [error]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-8 py-12 space-y-6 bg-card rounded-lg shadow-lg border border-muted">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Authentication Error</h2>
          <p className="text-sm text-muted-foreground">
            {error.message || 'An error occurred during authentication'}
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={reset} 
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
