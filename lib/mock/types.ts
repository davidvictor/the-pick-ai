import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { Bet, BetLeg, BetType, LegType, RiskLevel } from "@/lib/bet-types";

/**
 * Game generator interface
 * All game generators must implement this interface
 */
export interface IGameGenerator {
  /**
   * Generate a specified number of games for a league
   * @param count Number of games to generate
   * @returns Array of game data
   */
  generateGames(count: number): GameCardProps[];
}

/**
 * Bet generator interface
 * Defines the methods required for generating bets
 * 
 * Note: This interface is actually now a subset of the BetGenerator class,
 * but we keep it for compatibility and potential future implementations.
 */
export interface IBetGenerator {
  /**
   * Generate a bet of the specified type
   * @param gameId Game ID
   * @param league League identifier
   * @param teams Team names
   * @param betType Type of bet to generate
   * @param rating Rating for the bet (1-10)
   * @returns Generated bet
   */
  generateBet(
    gameId: string,
    league: League,
    teams: { home: string; away: string },
    betType?: BetType,
    rating?: number
  ): Bet;
}

/**
 * Bet generator implementation
 * This matches the concrete BetGenerator class
 */
export interface IBetGeneratorImpl extends IBetGenerator {
  generateStraightBet(
    gameId: string,
    league: League,
    teams: { home: string; away: string },
    rating: number
  ): Bet;
  
  generateParlayBet(
    gameId: string,
    league: League,
    teams: { home: string; away: string },
    rating: number
  ): Bet;
  
  generateTeaserBet(
    gameId: string,
    league: League,
    teams: { home: string; away: string },
    rating: number
  ): Bet;
  
  generateLeg(
    legType: LegType,
    gameId: string,
    league: League,
    teams: { home: string; away: string }
  ): BetLeg;
  
  generateBetId(gameId: string, betType: BetType, legType?: LegType): string;
  getCurrentDate(): string;
  getRandomUnits(): number;
  generateExpectedValue(rating: number): string;
  calculateRiskScore(rating: number): RiskLevel;
  generateRationale(leg: BetLeg, rating: number): string;
}

/**
 * Mock data configuration interface
 */
export interface IMockDataConfig {
  /**
   * Number of games to generate per league
   */
  gamesPerLeague: Record<League, number>;
  
  /**
   * Maximum number of bets to generate per game
   */
  maxBetsPerGame: number;
  
  /**
   * Probability of a game having no best bets (0-1)
   */
  emptyBetsProbability: number;
  
  /**
   * Probability of different bet types
   */
  betTypeProbabilities: {
    straight: number;
    parlay: number;
    teaser: number;
  };
  
  /**
   * Default values for various properties
   */
  defaults: {
    unitSize: number;
    defaultOdds: number;
    defaultRating: number;
  };
  
  /**
   * Date ranges for generating games
   */
  dateRanges: Record<League, { start: string; end: string }>;
}

/**
 * Team data interface
 */
export interface TeamData {
  name: string;
  city: string;
  abbreviation: string;
  colors: {
    primary: string;
    secondary: string;
  };
  // Additional optional fields for richer team data
  conference?: string;
  division?: string;
  stadium?: string;
  location?: string;
}

/**
 * Game status type
 */
export type GameStatus = "Upcoming" | "Live" | "Complete";

/**
 * Network type
 */
export type NetworkName = "CBS" | "FOX" | "NBC" | "ESPN" | "NFL Network" | "TNT" | 
                         "ABC" | "NBA TV" | "MLB Network" | "TBS" | "NHL Network" | 
                         "FS1" | "MLS Season Pass";

/**
 * Timezone type
 */
export type Timezone = "EST" | "CST" | "MST" | "PST";
