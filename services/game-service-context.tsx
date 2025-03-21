"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { GameService, League } from "./api-types";
import { MockGameService } from "./mock-game-service";
import { ApiGameService } from "./api-game-service";

// Create a context for the game service
const GameServiceContext = createContext<GameService | undefined>(undefined);

// Create a context for the current league
const CurrentLeagueContext = createContext<{
  currentLeague: League;
  setCurrentLeague: (league: League) => void;
  isOnBestBetsPage: boolean;
  setIsOnBestBetsPage: (isOnBestBetsPage: boolean) => void;
} | undefined>(undefined);

// Props for the GameServiceProvider component
interface GameServiceProviderProps {
  children: ReactNode;
  useMockData?: boolean;
  initialLeague?: League;
}

/**
 * Provider component that makes the game service available to all child components
 */
export function GameServiceProvider({
  children,
  useMockData = true,
  initialLeague = "NFL",
}: GameServiceProviderProps) {
  // Create the appropriate service instance
  const gameService: GameService = React.useMemo(() => {
    if (useMockData) {
      return new MockGameService();
    } else {
      return new ApiGameService();
    }
  }, [useMockData]);

  // State for the current league and best bets page
  const [currentLeague, setCurrentLeague] = React.useState<League>(initialLeague);
  const [isOnBestBetsPage, setIsOnBestBetsPage] = React.useState<boolean>(false);

  return (
    <GameServiceContext.Provider value={gameService}>
      <CurrentLeagueContext.Provider value={{ currentLeague, setCurrentLeague, isOnBestBetsPage, setIsOnBestBetsPage }}>
        {children}
      </CurrentLeagueContext.Provider>
    </GameServiceContext.Provider>
  );
}

/**
 * Hook to access the game service
 * @returns The game service instance
 */
export function useGameService(): GameService {
  const context = useContext(GameServiceContext);
  if (context === undefined) {
    throw new Error("useGameService must be used within a GameServiceProvider");
  }
  return context;
}

/**
 * Hook to access and update the current league
 * @returns Object with currentLeague and setCurrentLeague
 */
export function useCurrentLeague() {
  const context = useContext(CurrentLeagueContext);
  if (context === undefined) {
    throw new Error("useCurrentLeague must be used within a GameServiceProvider");
  }
  return context;
}
