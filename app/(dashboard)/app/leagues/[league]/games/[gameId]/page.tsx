"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { GameDetailsSkeleton } from "@/components/game-card/game-details-skeleton";
import { useCurrentLeague } from "@/services/game-service-context";
import { useGameDetails } from "@/hooks/use-game-details";
import { League } from "@/services/api-types";
import { useTeamWithLogo } from "@/hooks/use-team-with-logo";
import { ROUTES } from "@/lib/routes";
import { useHeader } from "@/lib/context/header-context";
import {
  GameHeaderCard,
  BestBetsSection,
  GameAnalysis
} from "@/components/game-details";

// Valid leagues
const validLeagues: League[] = ["NFL", "NBA", "MLB", "NHL", "MLS", "NCAAF", "NCAAB"];

export default function GameDetailsPage() {
  const params = useParams();
  const leagueParam = params.league as string;
  const gameId = params.gameId as string;
  
  // Get header context for updating title and back navigation
  const { setGameTitle, setBackRoute } = useHeader();
  
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
  
  // Set back route to the league page
  useEffect(() => {
    setBackRoute(ROUTES.LEAGUES.DETAIL(league));
    
    // Clean up on unmount
    return () => setBackRoute(null);
  }, [league, setBackRoute]);
  
  // Update the game title when data is loaded
  useEffect(() => {
    if (game) {
      setGameTitle(`${game.awayTeam.name} @ ${game.homeTeam.name}`);
    } else if (isLoading) {
      setGameTitle("Loading...");
    } else if (error) {
      setGameTitle("Error");
    }
    
    // Clean up on unmount
    return () => setGameTitle(null);
  }, [game, isLoading, error, setGameTitle]);

  // Use our hook to get teams with logos
  const homeTeamWithLogo = useTeamWithLogo(game?.homeTeam || null, league);
  const awayTeamWithLogo = useTeamWithLogo(game?.awayTeam || null, league);
  
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-lg text-red-500">Error loading game: {error.message}</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {isLoading ? (
        <GameDetailsSkeleton />
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
          
          <BestBetsSection 
            bets={game.bestBets}
            gameId={gameId}
            league={league}
            teams={{ home: game.homeTeam.name, away: game.awayTeam.name }}
          />
          
          <GameAnalysis content={game.agents[0]?.content || ""} />
        </div>
      )}
    </div>
  );
}
