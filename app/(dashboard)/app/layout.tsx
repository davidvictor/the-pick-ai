import AppServerLayout from './layout-server';

/**
 * Main entry point for app routes
 * This redirects to the server layout which checks authentication
 * before rendering the client UI components
 * 
 * In Next.js App Router, the layout.tsx file is the entry point
 * for route groups, so this file serves as the connector to our
 * authentication layer
 */
export default function AppLayout(props: {
  children: React.ReactNode;
}) {
  return <AppServerLayout {...props} />;
}
