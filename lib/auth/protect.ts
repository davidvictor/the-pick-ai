import { redirect } from 'next/navigation';
import { isAuthenticated } from './headers';

/**
 * Protects server components by checking for authentication using headers.
 * This approach avoids cookie access during SSG/prerendering.
 * If not authenticated, redirects to the login page.
 * 
 * IMPORTANT: This function is for use in Server Components only (app/ directory).
 * It will not work in the pages/ directory.
 * 
 * @param options Optional configuration for protection behavior
 */
export function protectServerPage(options?: { 
  redirectTo?: string, 
  returnTo?: string
}) {
  try {
    // Get auth state from headers (set by middleware) rather than cookies
    // This avoids issues with cookie access during static generation
    const authenticated = isAuthenticated();
    
    if (!authenticated) {
      // Default to sign-in, but allow custom redirect destination
      const redirectPath = options?.redirectTo || '/sign-in';
      
      // If returnTo is specified, add it as a query param
      const redirectUrl = options?.returnTo 
        ? `${redirectPath}?returnTo=${encodeURIComponent(options.returnTo)}`
        : redirectPath;
      
      redirect(redirectUrl);
    }
    
    // No longer return a session object since we're not using cookies
    return { isAuthenticated: true };
  } catch (error) {
    console.error('Protection error:', error);
    // Still redirect on error for security
    redirect(options?.redirectTo || '/sign-in');
  }
}
