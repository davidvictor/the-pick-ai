"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect component for the dashboard root page
 * This redirects users to the root marketing page
 * The authenticated content has been moved to /authenticated
 */
export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirecting to home page...</p>
      </div>
    </div>
  );
}
