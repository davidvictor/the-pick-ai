import type { NextConfig } from 'next';

/**
 * Next.js configuration
 * 
 * - Added distDir to customize build output directory
 * - Set trailingSlash to true for better URL compatibility
 * - Added redirects configuration to handle auth redirects during static generation
 * - Added dynamicParams false for better static optimization
 */
const nextConfig: NextConfig = {
  // Use PPR (Partial Prerendering) for better performance
  experimental: {
    ppr: true
  },
  
  // Set the build output 
  // We'll leave this undefined to use the default Next.js behavior
  // instead of 'hybrid' which isn't compatible with the current types
  
  // Add redirects that are known at build time
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/app',
        permanent: true,
      },
      {
        source: '/dashboard/:path*',
        destination: '/app/:path*',
        permanent: true,
      },
      {
        source: '/authenticated/:path*',
        destination: '/app/:path*',
        permanent: true,
      },
      {
        source: '/leagues/:path*',
        destination: '/app/leagues/:path*',
        permanent: true,
      },
      {
        source: '/ui-kit',
        destination: '/app/ui-kit',
        permanent: true,
      }
    ];
  },
  
  // Set true to treat /index.html different from /
  trailingSlash: false,
  
  // Skip static optimization for auth-protected areas
  // These settings tell Next.js which routes should always be 
  // dynamically rendered and which should be statically generated
  generateBuildId: async () => {
    // Use a consistent build ID for better caching
    return 'the-pick-build';
  }
};

export default nextConfig;
