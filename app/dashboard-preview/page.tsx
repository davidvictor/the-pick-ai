"use client";

import { PerformanceSummary } from '@/components/dashboard/performance-summary';
import { TopPicks } from '@/components/dashboard/top-picks';
import { UpcomingGames } from '@/components/dashboard/upcoming-games';
import { LeaguesAccess } from '@/components/dashboard/leagues-access';
import { InsightsTrends } from '@/components/dashboard/insights-trends';
import { AppHeader } from '@/components/ui/app-header';
import { AppSidebar } from '@/components/nav/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarContent } from '@/components/ui/sidebar-content';
import { HeaderProvider } from "@/lib/context/header-context";
import { GameServiceProvider } from "@/services/game-service-context";

/**
 * Dashboard Preview Page
 * This is a public, non-authenticated version of the dashboard for preview purposes
 */
export default function DashboardPreviewPage() {
  return (
    <GameServiceProvider useMockData={true} initialLeague="NFL">
      <HeaderProvider>
        <section className="flex flex-col min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarContent>
              <AppHeader 
                breadcrumbItems={[
                  { label: 'Dashboard', href: '/dashboard-preview' }
                ]}
              />
              <main>
                <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
                  <div className="bg-orange-100 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 border p-4 rounded-lg mb-6">
                    <p className="text-orange-800 dark:text-orange-300 text-sm">
                      <strong>Preview Mode:</strong> This is a preview of the dashboard. In a real implementation, this would require authentication.
                    </p>
                  </div>
                  
                  <PerformanceSummary />
                  <TopPicks />
                  <UpcomingGames />
                  <LeaguesAccess />
                  <InsightsTrends />
                </div>
              </main>
            </SidebarContent>
          </SidebarProvider>
        </section>
      </HeaderProvider>
    </GameServiceProvider>
  );
}
