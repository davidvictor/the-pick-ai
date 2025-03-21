# Authentication Architecture

This document outlines the authentication architecture for protected routes in the application.

## Layered Protection Strategy

The application implements a layered approach to route protection:

1. **Edge Middleware (First Layer)**
   - Runs in the Edge runtime using `middleware.ts`
   - Intercepts all requests to `/app/*` routes
   - Checks for valid session cookies
   - Redirects unauthenticated users to the login page
   - Includes the original URL as a return path parameter

2. **Server Component Layout (Second Layer)**
   - The app layout (`app/(dashboard)/app/layout-server.tsx`) is a server component
   - It uses `protectServerPage()` to verify authentication on the server
   - Provides a fallback in case middleware is bypassed
   - Returns the authenticated user session data

3. **Section-Specific Protection (Third Layer)**
   - Sensitive sections like account settings have additional protection
   - The account layout (`app/(dashboard)/app/account/layout.tsx`) implements an additional auth check
   - This ensures highly sensitive information is protected by multiple mechanisms

4. **Client Components (UI Layer)**
   - Client components like `layout-client.tsx` handle UI rendering
   - They assume that authentication has been verified by previous layers
   - Focus on presentation rather than authentication logic
   - This separation of concerns keeps the codebase clean and maintainable
## Authentication Flow

1. User requests a protected page under `/app/*`
2. Edge middleware intercepts and checks for a valid session cookie
3. If no valid session exists, user is redirected to login with a return path
4. If session exists, the request proceeds to the server component layout
5. Server component performs a secondary authentication check
6. If the auth check passes, the page renders with the client layout
7. If any check fails, the user is redirected to the login page
## Example Code

```typescript
// Middleware auth check (Edge runtime)
if (PROTECTED_ROUTES.test(pathname)) {
  const session = await getSession();
  
  if (!session) {
    // Redirect to login with return path
    const url = new URL('/login', request.url);
    url.searchParams.set('returnTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

// Server component auth check (Node.js runtime)
await protectServerPage({ 
  returnTo: '/app/account'
});
```
