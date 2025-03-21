"use client";
 
import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { AppSidebar } from "@/components/nav/app-sidebar";
import { getLeagueDisplayName } from "@/lib/utils";
import { AppHeader } from "@/components/ui/app-header";
import { GameCardGrid } from "@/components/game-card/game-card-grid";
import { GameCardGridSkeleton } from "@/components/game-card/game-card-grid-skeleton";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar-content";
import { useCurrentLeague } from "@/services/game-service-context";
import { useLeagueGames } from "@/hooks/use-league-games";
import { League } from "@/services/api-types";

// Valid leagues
const validLeagues: League[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "NCAAF", "NCAAB"];

export default function LeaguePage() {
  const params = useParams();
  const leagueParam = params.league as string;
  
  // Validate the league parameter
  if (!validLeagues.includes(leagueParam as League)) {
    notFound();
  }
  
  const league = leagueParam as League;
  const { setCurrentLeague } = useCurrentLeague();
  const { games, isLoading, error } = useLeagueGames(league);
  
  // Sync the URL parameter with the context state
  useEffect(() => {
    setCurrentLeague(league);
  }, [league, setCurrentLeague]);
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarContent>
        <AppHeader
          breadcrumbItems={[
            { href: "/leagues", label: "Leagues", className: "hidden md:block" },
            { label: getLeagueDisplayName(league), isCurrentPage: true }
          ]}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{getLeagueDisplayName(league)} Games</h1>
            <p className="text-muted-foreground">
              Upcoming games on {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          {isLoading ? (
            <GameCardGridSkeleton />
          ) : error ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-lg text-red-500">Error loading games: {error.message}</div>
            </div>
          ) : games.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-lg">No {getLeagueDisplayName(league)} games available</div>
            </div>
          ) : (
            <GameCardGrid games={games} />
          )}
        </div>
      </SidebarContent>
    </SidebarProvider>
  );
}
