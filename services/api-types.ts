import { GameCardProps } from "@/components/game-card/game-card";
import { Bet } from "@/lib/bet-types";

/**
 * Interface for detailed game information
 */
export interface GameDetailsProps {
  // Basic game info (can be derived from GameCardProps)
  id: string;
  homeTeam: {
    name: string;
    city?: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    city?: string;
    logo?: string;
  };
  date: string;
  time: string;
  timezone: string;
  network: string;
  
  // Location and weather info
  location: string;
  stadium: string;
  weather: {
    temperature: string;
    conditions: string;
    wind: string;
    type: string; // Type for Skycon (e.g., 'clear-day', 'cloudy', 'rain', etc.)
  };
  
  // Game status
  status: string; // e.g., "Upcoming"
  
  // Betting information
  spread: {
    value: number;
    team: string;
  };
  overUnder: number;
  moneyLine: number;
  
  // Accept both legacy and new bet formats
  bestBets: Array<any>;
  
  // Agent analysis
  agents: Array<{
    id: string;
    name: string;
    content: string; // Markdown content
  }>;
}

/**
 * Supported leagues in the application
 */
export type League = "NFL" | "NBA" | "MLB" | "NHL" | "MLS" | "NCAAF" | "NCAAB";

/**
 * Interface for game data services
 * This abstraction allows us to easily switch between mock data and real API data
 */
export interface GameService {
  /**
   * Get games for a specific league
   * @param league The league to get games for
   * @returns Promise resolving to an array of game data
   */
  getGamesByLeague(league: League): Promise<GameCardProps[]>;
  
  /**
   * Get all available leagues
   * @returns Promise resolving to an array of league identifiers
   */
  getAvailableLeagues(): Promise<League[]>;

  /**
   * Get a specific game by ID
   * @param league The league the game belongs to
   * @param gameId The unique identifier of the game
   * @returns Promise resolving to the game data or null if not found
   */
  getGameById(league: League, gameId: string): Promise<GameCardProps | null>;
  
  /**
   * Get detailed information for a specific game
   * @param league The league the game belongs to
   * @param gameId The unique identifier of the game
   * @returns Promise resolving to the detailed game data or null if not found
   */
  getGameDetails(league: League, gameId: string): Promise<GameDetailsProps | null>;
}
