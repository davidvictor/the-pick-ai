import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/session';

// Define pattern for protected routes
const PROTECTED_ROUTES = /^\/app\/.*/;

// Public files pattern (don't check auth for static assets)
const PUBLIC_FILE = /\.(.*)$/;

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
    
    // Authentication check for protected routes
    if (PROTECTED_ROUTES.test(pathname)) {
      try {
        // Get session directly from the request cookies (Edge runtime)
        const sessionCookie = request.cookies.get('session')?.value;
        
        let session = null;
        if (sessionCookie) {
          // Verify the session token
          try {
            session = await verifyToken(sessionCookie);
          } catch (tokenError) {
            console.error('Token verification error:', tokenError);
          }
        }
        
        if (!session) {
          // Create a login URL with return path
          const url = new URL('/sign-in', request.url);
          url.searchParams.set('returnTo', request.nextUrl.pathname);
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.error('Authentication error in middleware:', error);
        // Redirect to login on auth error
        const url = new URL('/sign-in', request.url);
        return NextResponse.redirect(url);
      }
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Unhandled middleware error:', error);
    // Fallback - allow the request to continue to be handled by the app
    return NextResponse.next();
  }
}

export const config = {
  // Specify which paths this middleware should run on
  matcher: [
    // Route group patterns
    '/leagues/:path*',
    '/app/:path*',
    '/authenticated/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/ui-kit'
  ],
};
