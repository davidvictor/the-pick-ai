import React from 'react';
import { protectServerPage } from '../auth/protect';
import { withDynamicRendering } from './with-dynamic-rendering';

type ComponentProps = {
  [key: string]: any;
};

/**
 * Higher-Order Component that protects a page or layout with authentication
 * and applies dynamic rendering.
 * 
 * This HOC uses header-based authentication check instead of cookie-based checks,
 * which allows it to work properly during static site generation.
 * 
 * @example
 * // In a page component:
 * import { withAuthentication } from '@/lib/hoc/with-authentication';
 * 
 * function SecurePage() {
 *   // Page content - already authenticated
 * }
 * 
 * export default withAuthentication(SecurePage);
 * 
 * @param Component The component to wrap with authentication
 * @param options Optional configuration for the redirect behavior
 * @returns The protected component with dynamic rendering applied
 */
export function withAuthentication(
  Component: React.ComponentType<any>,
  options?: { redirectTo?: string; returnTo?: string }
) {
  // Create the authenticated wrapper component
  function AuthenticatedComponent(props: ComponentProps) {
    // This will redirect if not authenticated
    // Now synchronous since it uses headers instead of async cookie checks
    protectServerPage(options);
    
    // If we're here, user is authenticated
    return <Component {...props} />;
  }
  
  // Name the component for better debugging
  AuthenticatedComponent.displayName = `Authenticated(${Component.displayName || Component.name || 'Component'})`;
  
  // We still need dynamic rendering because we access headers
  // Headers are only available during request time, not build time
  return withDynamicRendering(AuthenticatedComponent);
}
