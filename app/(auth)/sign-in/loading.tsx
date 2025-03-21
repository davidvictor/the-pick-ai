'use client';

import { Loader2 } from 'lucide-react';

/**
 * Loading state specifically for the sign-in page
 */
export default function SignInLoading() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Preparing sign-in...</p>
      </div>
    </div>
  );
}
