import { withDynamicRendering } from '@/lib/hoc/with-dynamic-rendering';

/**
 * Layout wrapper for contact page
 * Applies dynamic rendering to prevent static generation issues
 */
function ContactLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}

// Apply dynamic rendering to ensure the page doesn't try to access
// headers or cookies during static generation
export default withDynamicRendering(ContactLayout);
