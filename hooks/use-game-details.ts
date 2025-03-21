"use client";

import { useState, useEffect } from "react";
import { GameDetailsProps, League } from "@/services/api-types";
import { useGameService } from "@/services/game-service-context";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { appConfig } from "@/lib/app-config";

interface UseGameDetailsResult {
  game: GameDetailsProps | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch details for a specific game
 * @param league The league the game belongs to
 * @param gameId The unique identifier of the game
 * @returns Object with game data, loading state, error, and refetch function
 */
export function useGameDetails(league: League, gameId: string): UseGameDetailsResult {
  const gameService = useGameService();
  const [game, setGame] = useState<GameDetailsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch game details
  const fetchGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await gameService.getGameDetails(league, gameId);
      setGame(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch game when the league or gameId changes
  useEffect(() => {
    fetchGame();
  }, [league, gameId]);

  return {
    game,
    isLoading,
    error,
    refetch: fetchGame
  };
}
