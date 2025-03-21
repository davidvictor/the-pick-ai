import { headers } from 'next/headers';

// Auth state header name - must match the one set in middleware.ts
const AUTH_STATE_HEADER = 'x-auth-state';

/**
 * Interface for authentication state from headers
 */
export interface AuthStateFromHeaders {
  isAuthenticated: boolean;
  userId: number | null;
}

/**
 * Gets authentication state from headers rather than cookies
 * This function is safe to use during static site generation
 * since it doesn't rely on cookies which aren't available during build
 * 
 * @returns The authentication state from headers
 */
export function getAuthStateFromHeaders(): AuthStateFromHeaders {
  try {
    // headers() returns HeadersInit, not a promise
    const headersList = headers();
    
    // Using type conversion since Next.js types may be out of sync
    const headersObj = headersList as unknown as Headers;
    
    // Safely extract the auth header
    let authHeaderValue: string | null = null;
    try {
      authHeaderValue = headersObj.get(AUTH_STATE_HEADER);
    } catch (e) {
      // Handle case where get() is not available
      // Fall back to iterating over headers
      for (const [key, value] of Array.from(headersObj.entries())) {
        if (key.toLowerCase() === AUTH_STATE_HEADER.toLowerCase()) {
          authHeaderValue = value;
          break;
        }
      }
    }
    
    if (!authHeaderValue) {
      return { isAuthenticated: false, userId: null };
    }
    
    try {
      return JSON.parse(authHeaderValue) as AuthStateFromHeaders;
    } catch (e) {
      console.error('Failed to parse auth header JSON:', e);
      return { isAuthenticated: false, userId: null };
    }
  } catch (error) {
    // Handle header access errors (e.g. during static build)
    if (process.env.NODE_ENV === 'development') {
      console.warn('Could not access headers for auth state, defaulting to not authenticated:', error);
    }
    return { isAuthenticated: false, userId: null };
  }
}

/**
 * Check if the current request is authenticated based on headers
 * Safe to use during static site generation
 * 
 * @returns boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  const authState = getAuthStateFromHeaders();
  return authState.isAuthenticated;
}

/**
 * Get the authenticated user ID from headers
 * Safe to use during static site generation
 * 
 * @returns User ID if authenticated, null otherwise
 */
export function getAuthenticatedUserId(): number | null {
  const authState = getAuthStateFromHeaders();
  return authState.userId;
}
