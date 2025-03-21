# Next.js Routing Compatibility: App Router and Pages Router

This document outlines the architectural changes made to support both routing paradigms (App Router in the app/ directory and Pages Router in the pages/ directory) within a single Next.js application.

## Background

Next.js provides two routing systems:

1. **Pages Router** - The traditional routing system using the pages/ directory
2. **App Router** - The newer routing system using the app/ directory with React Server Components

The challenge is that certain Next.js features are specific to each routing paradigm:
- `next/headers` API is only available in Server Components (App Router)
- Server Components are not supported in the Pages Router

To support both simultaneously, we needed to refactor several key areas.

## Authentication System Changes

### 1. Session Handling (`lib/auth/session.ts`)

We split the session handling into router-specific implementations:

```typescript
// For Pages Router (pages/ directory)
export async function getSession(req?: any, res?: any) {
  const sessionValue = getCookie('session', { req, res });
  if (!sessionValue) return null;
  return verifyToken(String(sessionValue));
}

export async function setSession(user: NewUser, req?: any, res?: any) {
  // Implementation that works in Pages Router
}

// For App Router (app/ directory with Server Components)
export async function getAppRouterSession() {
  try {
    if (!appCookies) {
      const { cookies } = require('next/headers');
      appCookies = cookies;
    }
    
    const sessionValue = appCookies().get('session')?.value;
    if (!sessionValue) return null;
    return verifyToken(sessionValue);
  } catch (error) {
    throw new Error('getAppRouterSession must only be used in Server Components in app/ directory');
  }
}

export async function setAppRouterSession(user: NewUser) {
  // Implementation using next/headers
}
```

### 2. Database Queries (`lib/db/queries.ts`)

We created router-specific user retrieval functions:

```typescript
// Pages Router compatible
export async function getUser(req?: any, res?: any) {
  const sessionData = await getSession(req, res);
  // Continue with retrieving user data...
}

// App Router compatible (for Server Components)
export async function getUserForAppRouter() {
  try {
    const { cookies } = await import('next/headers');
    const cookiesStore = await cookies();
    
    const sessionCookie = cookiesStore.get('session');
    // Continue with retrieving user data...
  } catch (error) {
    throw new Error('getUserForAppRouter must only be used in Server Components in app/ directory');
  }
}
```

### 3. Auth Middleware (`lib/auth/middleware.ts`)

Created a unified approach that attempts both methods:

```typescript
async function getCurrentUser() {
  try {
    // First try with App Router method
    const user = await getUserForAppRouter();
    if (user) return user;
  } catch (error) {
    // App Router method failed, try Pages Router method
  }
  
  // Fallback to Pages Router method
  return getUser();
}
```

### 4. Edge Middleware (`middleware.ts`)

Updated to access cookies directly without depending on next/headers:

```typescript
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
```

## Server Component Updates

All Server Components were updated to use the App Router compatible functions:

1. `app/layout.tsx` - Changed to use `getUserForAppRouter()`
2. `app/(dashboard)/app/page.tsx` - Changed to use `getUserForAppRouter()`
3. `app/(dashboard)/app/account/page.tsx` - Changed to use `getUserForAppRouter()`
4. `app/(dashboard)/app/account/notifications/page.tsx` - Changed to use `getUserForAppRouter()`
5. `app/(dashboard)/app/account/billing/page.tsx` - Changed to use `getUserForAppRouter()`

## Benefits of This Approach

1. **Compatibility** - Works with both routing systems simultaneously
2. **Progressive Migration** - Allows gradual migration from Pages to App Router
3. **Feature Access** - Enables use of the latest Next.js features in App Router while maintaining support for Pages Router
4. **Type Safety** - Provides type-safe APIs for both environments

## Usage Guidelines

### When to Use Each Function

- In Server Components (app/ directory): Use `getAppRouterSession()` and `getUserForAppRouter()`
- In Pages Router (pages/ directory): Use `getSession()` and `getUser()`
- In middleware: Use direct cookie access and `verifyToken()`
- In components that could be used in either: Use the helper `getCurrentUser()` from auth middleware

### Error Handling

Functions specifically designed for App Router will throw errors when used in Pages Router to prevent subtle bugs. Always use the appropriate function for the context.
