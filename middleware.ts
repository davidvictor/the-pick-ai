import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle any legacy routes that might still be used
  if (pathname.startsWith('/dashboard/leagues/')) {
    const rest = pathname.slice('/dashboard/leagues/'.length);
    return NextResponse.redirect(new URL(`/leagues/${rest}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Specify which paths this middleware should run on
  matcher: ['/dashboard/leagues/:path*'],
};
