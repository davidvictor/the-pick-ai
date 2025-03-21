'use client';

import { usePathname, useParams, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { AppHeader } from "@/components/ui/app-header";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar-content";
import { getBreadcrumbsForRoute } from "@/lib/routes";
import { HeaderProvider, useHeader } from "@/lib/context/header-context";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { gameTitle, backRoute } = useHeader();
  
  // Determine if this is a game detail page
  const isGameDetail = pathname.includes('/games/');
  
  // Generate dynamic breadcrumbs based on current route
  let breadcrumbItems = getBreadcrumbsForRoute(pathname, params as Record<string, string>);
  
  // If we have a game title and are on a game detail page, replace the last breadcrumb
  if (gameTitle && isGameDetail) {
    breadcrumbItems = [
      ...breadcrumbItems.slice(0, -1),
      { ...breadcrumbItems[breadcrumbItems.length - 1], label: gameTitle }
    ];
  }
  
  // Handle navigation back
  const handleBack = () => {
    if (backRoute) {
      router.push(backRoute);
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarContent>
          <AppHeader 
            breadcrumbItems={breadcrumbItems}
            showBackButton={isGameDetail}
            onBack={handleBack}
          />
          <main>{children}</main>
        </SidebarContent>
      </SidebarProvider>
    </section>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </HeaderProvider>
  );
}
