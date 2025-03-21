import { redirect } from 'next/navigation';
import { getUserForAppRouter } from '@/lib/db/queries';
import { PerformanceSummary } from '@/components/dashboard/performance-summary';
import { TopPicks } from '@/components/dashboard/top-picks';
import { UpcomingGames } from '@/components/dashboard/upcoming-games';
import { LeaguesAccess } from '@/components/dashboard/leagues-access';
//import { InsightsTrends } from '@/components/dashboard/insights-trends';
import { GameServiceProvider } from "@/services/game-service-context";

export default async function DashboardPage() {
  const user = await getUserForAppRouter();

  if (!user) {
    redirect('/auth?sign-in');
  }

  return (
    <GameServiceProvider useMockData={true} initialLeague="NFL">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* <PerformanceSummary /> */}
        <TopPicks />
        <UpcomingGames />
        <LeaguesAccess />
        {/* <InsightsTrends /> */}
      </div>
    </GameServiceProvider>
  ) 
}
