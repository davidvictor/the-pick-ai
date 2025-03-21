import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/session';

// Route group aware approach to protected routes
const isProtectedRoute = (pathname: string): boolean => {
  // Dashboard route group is protected
  if (pathname.startsWith('/app/')) return true;
  
  // Any additional protected routes that aren't in the dashboard group
  // For example, if we have specific (marketing) routes that require auth:
  // if (pathname === '/pricing/enterprise') return true;
  
  return false;
};

// Public files pattern (don't check auth for static assets)
const PUBLIC_FILE = /\.(.*)$/;

// Auth state header for passing to server components
const AUTH_STATE_HEADER = 'x-auth-state';

/**
 * Middleware for handling authentication and redirects
 * This runs at the edge before any page or layout code
 */
export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    
    // Skip middleware for public files (images, etc.)
    if (PUBLIC_FILE.test(pathname)) {
      return NextResponse.next();
    }
    
    // Handle legacy redirects first
    if (pathname.startsWith('/leagues/')) {
      const rest = pathname.slice('/leagues/'.length);
      return NextResponse.redirect(new URL(`/app/leagues/${rest}`, request.url));
    }
    
    // Redirect /dashboard to /app - handle legacy URLs
    if (pathname === '/dashboard') {
      return NextResponse.redirect(new URL(`/app`, request.url));
    }
    
    // Redirect /dashboard/* paths to /app/* paths
    if (pathname.startsWith('/dashboard/') && !pathname.startsWith('/dashboard/leagues/')) {
      const rest = pathname.slice('/dashboard/'.length);
      return NextResponse.redirect(new URL(`/app/${rest}`, request.url));
    }
    
    // Redirect /authenticated/* paths to /app/* paths (for any bookmarks using recent authenticated paths)
    if (pathname.startsWith('/authenticated/')) {
      const rest = pathname.slice('/authenticated/'.length);
      return NextResponse.redirect(new URL(`/app/${rest}`, request.url));
    }
    
    // Redirect old UI Kit path to the new location
    if (pathname === '/ui-kit') {
      return NextResponse.redirect(new URL('/app/ui-kit', request.url));
    }
    
    // Redirect legacy sign-in/sign-up paths to the auth route group
    if (pathname === '/sign-in' || pathname === '/sign-up') {
      const mode = pathname === '/sign-in' ? 'signin' : 'signup';
      const url = new URL('/auth', request.url);
      url.searchParams.set('mode', mode);
      
      // Preserve any query parameters
      for (const [key, value] of request.nextUrl.searchParams.entries()) {
        if (key !== 'mode') { // Don't duplicate mode parameter
          url.searchParams.set(key, value);
        }
      }
      
      return NextResponse.redirect(url);
    }
    
    // Redirect history path to marketing route group
    if (pathname === '/history') {
      return NextResponse.redirect(new URL('/history', request.url));
    }
    
    // Create a base response that we'll modify as needed
    const response = NextResponse.next();
    
    // Default auth state (not authenticated)
    let authState: {
      isAuthenticated: boolean;
      userId: number | null;
    } = {
      isAuthenticated: false,
      userId: null
    };
    
    // Get session cookie regardless of route
    const sessionCookie = request.cookies.get('session')?.value;
    let session = null;
    let userId = null;
    
    if (sessionCookie) {
      try {
        // Verify the session token
        session = await verifyToken(sessionCookie);
        userId = session?.user?.id;
        
        if (session) {
          // Update auth state if we have a valid session
          authState = {
            isAuthenticated: true,
            userId
          };
        }
      } catch (tokenError) {
        console.error('Token verification error:', tokenError);
        // Don't throw - just continue with unauthenticated state
      }
    }
    
    // For protected routes, check authentication and redirect if needed
    if (isProtectedRoute(pathname) && !session) {
      // Create a login URL with return path - using auth route group
      const url = new URL('/auth', request.url);
      url.searchParams.set('mode', 'signin');
      url.searchParams.set('returnTo', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // Always set auth state in headers for all routes
    // This makes it available to all route groups for conditional UI
    response.headers.set(AUTH_STATE_HEADER, JSON.stringify(authState));
    
    return response;
  } catch (error) {
    console.error('Unhandled middleware error:', error);
    // Fallback - allow the request to continue to be handled by the app
    return NextResponse.next();
  }
}

export const config = {
  // Specify which paths this middleware should run on - organized by route groups
  matcher: [
    // Route groups and their paths
    '/(marketing)/:path*',  // Marketing routes may need auth state for personalization
    '/(auth)/:path*',       // Auth routes for login and signup
    '/(dashboard)/:path*',  // Dashboard routes (all protected)
    
    // Primary app pages
    '/app/:path*',
    '/sign-in',
    '/sign-up',
    '/auth',
    
    // Legacy redirects
    '/authenticated/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/leagues/:path*',
    '/ui-kit',
    
    // Legacy sign-in/up paths that should redirect to auth route group
    '/sign-in',
    '/sign-up',
    '/history'
  ],
};
