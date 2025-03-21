'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Create a new URLSearchParams object with the current parameters
    const params = new URLSearchParams(searchParams.toString());
    
    // Add mode=signup parameter
    params.set('mode', 'signup');
    
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
