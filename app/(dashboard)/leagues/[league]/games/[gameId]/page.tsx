"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { useGameDetails } from "@/hooks/use-game-details";
import { 
  GameHeaderCard,
  BestBetsSection, 
  BetDetailsGrid,
  GameAnalysis 
} from "@/components/game-details";
import { League } from "@/services/api-types";
import { ROUTES } from "@/lib/routes";
import { useHeader } from "@/lib/context/header-context";
import { getTeamLogo } from "@/lib/team-utils";

export default function GameDetailsPage() {
  // Get route parameters
  const params = useParams();
  
  // Extract and validate league and gameId
  const leagueParam = params.league as string;
  const gameId = params.gameId as string;
  
  // Type assertion after validation
  const league = leagueParam as League;
  
  // Get header context
  const { setGameTitle, setBackRoute } = useHeader();
  
  // Set back route to the league page
  useEffect(() => {
    setBackRoute(ROUTES.LEAGUES.DETAIL(league));
    
    // Clean up on unmount
    return () => setBackRoute(null);
  }, [league, setBackRoute]);
  
  // Fetch game details using our custom hook
  const { game, isLoading, error } = useGameDetails(league, gameId);
  
  // Handle 404 when game not found (after loading completes)
  useEffect(() => {
    if (!isLoading && !game && !error) {
      notFound();
    }
  }, [game, isLoading, error]);
  
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
  
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-lg text-red-500">Error loading game: {error.message}</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6 p-4">
      {isLoading ? (
        <>
          <div className="h-48 bg-muted/10 rounded-lg animate-pulse" />
          <div className="h-64 bg-muted/10 rounded-lg animate-pulse" />
          <div className="h-96 bg-muted/10 rounded-lg animate-pulse" />
        </>
      ) : game ? (
        <>
          {/* Add logos to the team objects */}
          <GameHeaderCard
            homeTeam={{
              ...game.homeTeam,
              logo: game.homeTeam.logo || getTeamLogo(game.homeTeam.name, league, game.homeTeam.city)
            }}
            awayTeam={{
              ...game.awayTeam,
              logo: game.awayTeam.logo || getTeamLogo(game.awayTeam.name, league, game.awayTeam.city)
            }}
            date={game.date}
            time={game.time}
            timezone={game.timezone}
            network={game.network}
            status={game.status}
            stadium={game.stadium}
            location={game.location || ""}
            weather={game.weather}
          />
          
          <BestBetsSection
            bets={game.bestBets || []}
            gameId={gameId}
            league={league}
            teams={{ home: game.homeTeam.name, away: game.awayTeam.name }}
          />
          
          {/* Use the first agent's content if there is one */}
          <GameAnalysis content={game.agents && game.agents.length > 0 ? game.agents[0].content : ""} />
        </>
      ) : null}
    </div>
  );
}
