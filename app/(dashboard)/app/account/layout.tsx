import { protectServerPage } from '@/lib/auth/protect';
import AccountLayoutClient from './layout-client';

/**
 * Main account layout with layered protection:
 * 1. Middleware checks authentication first (Edge runtime)
 * 2. Authenticated layout provides second layer of protection (Server runtime)
 * 3. This server component provides a third layer specifically for account pages
 * 4. The client layout component handles UI and navigation concerns
 */
export default async function AccountLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // This will redirect if not authenticated - extra protection for sensitive account section
  await protectServerPage({ 
    returnTo: '/app/account' // Return to account after login
  });
  
  // If we get here, the user is authenticated, render the client UI layout
  return <AccountLayoutClient>{children}</AccountLayoutClient>; 
}
