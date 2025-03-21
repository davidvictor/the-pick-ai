'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Login } from '../login';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  
  return (
    <Suspense>
      <Login mode={mode} />
    </Suspense>
  );
}
