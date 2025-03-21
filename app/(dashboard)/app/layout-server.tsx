import { protectServerPage } from '@/lib/auth/protect';
import AppLayout from './layout-client';

/**
 * Server component wrapper for app routes
 * This provides the server-side authentication protection
 * for all routes under /app/*
 */
export default async function AppServerLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // This will redirect if not authenticated - server-side check
  await protectServerPage({ 
    returnTo: '/app' // Return to app dashboard after login
  });
  
  // If we get here, the user is authenticated, render the client UI layout
  return <AppLayout>{children}</AppLayout>; 
}
