import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { mockDataService } from "./mock";

/**
 * Generate and export mock data for the application
 * 
 * This file consolidates exports from the mock data system
 * to maintain a clean public API for other parts of the application.
 */

// Generate the mock data using the service (with caching)
const mockData = mockDataService.generateMockData();

/**
 * Games organized by league
 * This is the primary export for accessing mock game data
 */
export const gamesByLeague: Record<League, GameCardProps[]> = mockData;

/**
 * NFL games shorthand access
 * Convenient for NFL-specific pages
 */
export const nflGames: GameCardProps[] = mockData.NFL || [];

/**
 * Get games for a specific league
 * @param league League identifier
 * @returns Array of games for the league
 */
export function getGamesByLeague(league: League): GameCardProps[] {
  return mockData[league] || [];
}

/**
 * Get a specific game by ID
 * @param league League identifier
 * @param gameId Game ID
 * @returns Game data or null if not found
 */
export function getGameById(league: League, gameId: string): GameCardProps | null {
  return mockDataService.getGameById(league, gameId);
}

/**
 * Force regeneration of mock data
 * Useful for testing or refreshing data
 * @returns Updated mock data
 */
export function regenerateMockData(): Record<League, GameCardProps[]> {
  return mockDataService.regenerateMockData();
}

// ---------- Legacy/Backward Compatibility Exports ----------

/**
 * @deprecated Use gamesByLeague instead
 */
export const updatedGamesByLeague = gamesByLeague;

/**
 * @deprecated Use nflGames instead
 */
export const updatedNflGames = nflGames;

/**
 * @deprecated Use gamesByLeague instead
 */
export const updatedMockGamesByLeague = gamesByLeague;
