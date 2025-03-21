import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';

/**
 * Layout wrapper for the root page
 * Applies dynamic rendering to prevent static generation issues
 */
function HomeLayoutWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}

// Apply dynamic rendering to ensure the page doesn't try to access
// headers or cookies during static generation
export default withDynamicRendering(HomeLayoutWrapper);
