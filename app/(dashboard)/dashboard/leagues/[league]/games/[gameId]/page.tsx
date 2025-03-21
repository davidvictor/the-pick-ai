"use client";

import { useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { GameDetailsSkeleton } from "@/components/game-card/game-details-skeleton";
import { AppSidebar } from "@/components/nav/app-sidebar";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar-content";
import { useCurrentLeague } from "@/services/game-service-context";
import { useGameDetails } from "@/hooks/use-game-details";
import { League } from "@/services/api-types";
import { useTeamWithLogo } from "@/hooks/use-team-with-logo";
import {
  GameDetailsHeader,
  GameHeaderCard,
  BestBetsSection,
  GameAnalysis
} from "@/components/game-details";

// Valid leagues
const validLeagues: League[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "NCAAF", "NCAAB"];

export default function GameDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const leagueParam = params.league as string;
  const gameId = params.gameId as string;
  
  // Validate the league parameter
  if (!validLeagues.includes(leagueParam as League)) {
    notFound();
  }
  
  const league = leagueParam as League;
  const { setCurrentLeague } = useCurrentLeague();
  const { game, isLoading, error } = useGameDetails(league, gameId);
  
  // Sync the URL parameter with the context state
  useEffect(() => {
    setCurrentLeague(league);
  }, [league, setCurrentLeague]);

  // Use our new hook to get teams with logos
  const homeTeamWithLogo = useTeamWithLogo(game?.homeTeam || null, league);
  const awayTeamWithLogo = useTeamWithLogo(game?.awayTeam || null, league);
  
  // Game title for breadcrumb
  const gameTitle = game ? `${game.awayTeam.name} @ ${game.homeTeam.name}` : null;
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarContent>
        <GameDetailsHeader 
          league={league}
          gameTitle={gameTitle}
          isLoading={isLoading}
          onBack={() => router.back()}
        />
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {isLoading ? (
            <GameDetailsSkeleton />
          ) : error ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-lg text-red-500">Error loading game: {error.message}</div>
            </div>
          ) : !game ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-lg">Game not found</div>
            </div>
          ) : (
            <div>
            <GameHeaderCard 
              homeTeam={homeTeamWithLogo} 
              awayTeam={awayTeamWithLogo}
              date={game.date}
              time={game.time}
              timezone={game.timezone}
              network={game.network}
              stadium={game.stadium}
              location={game.location}
              weather={game.weather}
              status={game.status}
            />
              
              <BestBetsSection bets={game.bestBets} />
              
              <GameAnalysis content={game.agents[0]?.content || ""} />
            </div>
          )}
        </div>
      </SidebarContent>
    </SidebarProvider>
  );
}
