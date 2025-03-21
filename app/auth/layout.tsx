'use client';

import { Suspense } from 'react';
import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';
import AnimatedBackground from '@/components/ui/animated-background';

/**
 * Layout wrapper for auth pages 
 * Provides suspense boundary for useSearchParams() and applies dynamic rendering
 */
function AuthLayout({ 
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
      <div className="min-h-[100dvh] flex flex-col relative">
        {/* Animated Background */}
        <AnimatedBackground />
        {children}
      </div>
    </Suspense>
  );
}

// Apply dynamic rendering to ensure the page doesn't try to access
// headers or cookies during static generation
export default withDynamicRendering(AuthLayout);
