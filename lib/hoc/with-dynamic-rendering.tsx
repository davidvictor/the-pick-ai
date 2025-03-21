import { ComponentType } from 'react';

/**
 * Higher-Order Component that applies the 'force-dynamic' directive to a component.
 * 
 * This HOC should be used for pages that need to access cookies or other request-time
 * data that requires dynamic rendering. It eliminates the need to add
 * 'export const dynamic = "force-dynamic"' to each individual page.
 * 
 * @example
 * // In a page component:
 * import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';
 * 
 * function MyPage() {
 *   // Page content
 * }
 * 
 * export default withDynamicRendering(MyPage);
 * 
 * @param Component The component to wrap with dynamic rendering
 * @returns The component with dynamic rendering applied
 */
export function withDynamicRendering<T>(Component: ComponentType<T>): ComponentType<T> {
  // Set dynamic property on the component
  // This is equivalent to 'export const dynamic = "force-dynamic"'
  (Component as any).dynamic = 'force-dynamic';
  
  // Return the component unchanged, but with the dynamic property set
  return Component;
}
