import AppLayout from './layout-client';
import { withAuthentication } from '@/lib/hoc/with-authentication';

/**
 * Server component wrapper for app routes
 * This provides the server-side authentication protection
 * for all routes under /app/*
 * 
 * We use the withAuthentication HOC which:
 * 1. Applies authentication protection
 * 2. Ensures dynamic rendering for cookie access
 */
function AppServerLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // The authentication check is now handled by the HOC
  return <AppLayout>{children}</AppLayout>;
}

// Apply authentication and dynamic rendering in one step
export default withAuthentication(AppServerLayout, {
  returnTo: '/app' // Return to app dashboard after login
});
