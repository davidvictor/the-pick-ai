'use client';

import { Suspense } from 'react';
import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';

/**
 * Layout wrapper for sign-in page 
 * Provides suspense boundary for useSearchParams() and applies dynamic rendering
 */
function SignInLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Suspense fallback={
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      {children}
    </Suspense>
  );
}

// Apply dynamic rendering to ensure the page doesn't try to access
// headers or cookies during static generation
export default withDynamicRendering(SignInLayout);
