import { redirect } from 'next/navigation';
import { getAppRouterSession } from './session';

/**
 * Protects server components by checking for a valid session.
 * If no valid session is found, redirects to the login page.
 * 
 * IMPORTANT: This function is for use in Server Components only (app/ directory).
 * It will not work in the pages/ directory.
 * 
 * @param options Optional configuration for protection behavior
 * @returns The session object if authenticated
 */
export async function protectServerPage(options?: { 
  redirectTo?: string, 
  returnTo?: string
}) {
  const session = await getAppRouterSession();
  
  if (!session) {
    // Default to sign-in, but allow custom redirect destination
    const redirectPath = options?.redirectTo || '/sign-in';
    
    // If returnTo is specified, add it as a query param
    const redirectUrl = options?.returnTo 
      ? `${redirectPath}?returnTo=${encodeURIComponent(options.returnTo)}`
      : redirectPath;
    
    redirect(redirectUrl);
  }
  
  return session;
}
