import DashboardClientLayout from './layout-client';

/**
 * Main dashboard layout - no longer applies authentication protection
 * Authentication is now applied only in the /app route group
 * via the authenticated/layout-server.tsx component
 */
export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Render the client UI layout
  return <DashboardClientLayout>{children}</DashboardClientLayout>; 
}
