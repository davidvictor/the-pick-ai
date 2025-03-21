import { League } from "@/services/api-types";
import { IMockDataConfig } from "./types";

/**
 * Get the current date in YYYY-MM-DD format
 */
function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Create date ranges using the current date
 */
function createDateRanges(): Record<League, { start: string, end: string }> {
  const today = getCurrentDate();
  
  return {
    NFL: { start: today, end: today },
    NBA: { start: today, end: today },
    MLB: { start: today, end: today },
    NHL: { start: today, end: today },
    MLS: { start: today, end: today },
    NCAAF: { start: today, end: today },
    NCAAB: { start: today, end: today }
  };
}

/**
 * Configuration for the mock data generation system
 */
export const mockDataConfig: IMockDataConfig = {
  /**
   * Control number of games per league
   */
  gamesPerLeague: {
    NFL: 12,
    NBA: 16,
    MLB: 4,
    NHL: 7,
    MLS: 3,
    NCAAF: 15,
    NCAAB: 22
  },
  
  /**
   * Control number of bets per game
   */
  maxBetsPerGame: 4,
  
  /**
   * Probability of a game having no best bets (0-1)
   */
  emptyBetsProbability: 0.15,
  
  /**
   * Control probability of different bet types
   */
  betTypeProbabilities: {
    straight: 0.7,
    parlay: 0.05,
    teaser: 0.25
  },
  
  /**
   * Control default values
   */
  defaults: {
    unitSize: 100,
    defaultOdds: -110,
    defaultRating: 7
  },
  
  /**
   * Control date ranges for games
   * Uses current date by default
   */
  dateRanges: createDateRanges()
};

/**
 * Get modified configuration with custom settings
 * Useful for testing or specialized scenarios
 */
export function getCustomConfig(
  customSettings: Partial<IMockDataConfig>
): IMockDataConfig {
  return {
    ...mockDataConfig,
    ...customSettings
  };
}
