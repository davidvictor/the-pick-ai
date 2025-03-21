import AppLayout from './layout-client';
import { withAuthentication } from '@/lib/hoc/with-authentication';
import { getAuthStateFromHeaders } from '@/lib/auth/headers';
import { AuthProvider } from '@/components/auth/auth-provider';

/**
 * Server component wrapper for app routes
 * This provides the server-side authentication protection
 * for all routes under /app/*
 * 
 * We use the withAuthentication HOC which now uses header-based auth
 * instead of cookie-based auth, solving the static generation issues
 */
function AppServerLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Get auth state from headers rather than cookies
  // This is safe during static generation
  const authState = getAuthStateFromHeaders();
  
  // Pass the auth state to client components via AuthProvider
  return (
    <AuthProvider initialAuth={authState}>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  );
}

// Apply authentication and dynamic rendering in one step
export default withAuthentication(AppServerLayout, {
  returnTo: '/app' // Return to app dashboard after login
});
