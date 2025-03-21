"use client";

import { useState, useEffect } from "react";
import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { useGameService } from "@/services/game-service-context";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { appConfig } from "@/lib/app-config";

interface UseLeagueGamesResult {
  games: GameCardProps[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch games for a specific league
 * @param league The league to fetch games for
 * @returns Object with games, loading state, error, and refetch function
 */
export function useLeagueGames(league: League): UseLeagueGamesResult {
  const gameService = useGameService();
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch games
  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await gameService.getGamesByLeague(league);
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch games when the league changes
  useEffect(() => {
    fetchGames();
  }, [league]);

  return {
    games,
    isLoading,
    error,
    refetch: fetchGames
  };
}
