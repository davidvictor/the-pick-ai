# Dynamic Rendering Strategy

## Background

The application requires access to cookies for authentication in server components, which is done through the App Router's `next/headers` API. This API is only available in dynamic rendering mode, not in static rendering mode.

Previously, we had to add the following directive to every server component that needed to access cookies:

```typescript
// Force dynamic rendering since we need to access cookies
export const dynamic = 'force-dynamic';
```

This approach was problematic because:
1. It required manual addition to every relevant file
2. It was easy to forget, causing production build issues
3. It added maintenance overhead

## Solution: Higher-Order Component (HOC)

Instead of adding the directive to individual components, we've created a reusable Higher-Order Component that can be used to apply dynamic rendering to any component:

```typescript
// lib/hoc/with-dynamic-rendering.tsx
import { ComponentType } from 'react';

export function withDynamicRendering<T>(Component: ComponentType<T>): ComponentType<T> {
  // Set dynamic property on the component
  (Component as any).dynamic = 'force-dynamic';
  
  // Return the component unchanged, but with the dynamic property set
  return Component;
}
```

This HOC can be used to wrap any page or layout component that needs dynamic rendering:

```typescript
// Example usage in a page component
import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';

function MyPage() {
  // Page content
}

// Apply dynamic rendering
export default withDynamicRendering(MyPage);
```

```typescript
// Example usage in a layout component (as in app/(dashboard)/app/layout-server.tsx)
import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';

async function AppServerLayout({ children }) {
  // Layout content
  return <>{children}</>;
}

// Apply dynamic rendering
export default withDynamicRendering(AppServerLayout);
```

### Benefits

1. **Reusable Pattern**: The same HOC can be used across your entire application
2. **Better DevX**: The need for dynamic rendering is explicit in the component's code 
3. **Type Safety**: The HOC is properly typed with TypeScript for better developer experience
4. **Performance Control**: Only apply dynamic rendering to components that need it
5. **Compatible**: Works with all versions of Next.js App Router
6. **Easier Testing**: Makes component testing easier as the dynamic rendering is separated from component logic

### Where to Use

This HOC should be applied to:

1. Layout components that need access to cookies or authentication state
2. Page components that need to access `cookies()` from `next/headers`
3. API routes that need to read cookies directly

When adding new components that need cookie access, simply wrap them with the `withDynamicRendering` HOC instead of manually adding the dynamic export.
