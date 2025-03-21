'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Create a new URLSearchParams object with the current parameters
    const params = new URLSearchParams(searchParams.toString());
    
    // Add mode=signin parameter
    params.set('mode', 'signin');
    
    // Redirect to the auth page with all parameters
    router.replace(`/auth?${params.toString()}`);
  }, [router, searchParams]);
  
  // Return a simple loading state while redirecting
  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
