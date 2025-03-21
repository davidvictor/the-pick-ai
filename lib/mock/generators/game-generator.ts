import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { mockDataConfig } from "../config";
import { Bet } from "@/lib/bet-types";
import { IGameGenerator, GameStatus, NetworkName, Timezone, TeamData, IMockDataConfig } from "../types";

/**
 * Abstract base class for game generators
 * This class provides common functionality for generating mock games
 */
export abstract class GameGenerator implements IGameGenerator {
  /**
   * Configuration for the mock data generation
   */
  protected config: IMockDataConfig;
  
  /**
   * Constructor
   * @param config Optional custom configuration
   */
  constructor(config?: IMockDataConfig) {
    this.config = config || mockDataConfig;
  }
  
  /**
   * Generate a specified number of games for a league
   * @param count Number of games to generate
   * @returns Array of game data
   */
  abstract generateGames(count: number): GameCardProps[];
  
  /**
   * Generates random teams for a game from a provided list
   * @param teamsList List of teams to choose from
   * @returns Object containing home and away teams
   */
  protected selectRandomTeams(teamsList: TeamData[]): { homeTeam: TeamData, awayTeam: TeamData } {
    // Create a copy of the array to avoid modifying the original
    const teams = [...teamsList];
    
    // Select a random home team
    const homeIndex = Math.floor(Math.random() * teams.length);
    const homeTeam = teams[homeIndex];
    
    // Remove home team to avoid duplicates
    teams.splice(homeIndex, 1);
    
    // Select a random away team
    const awayIndex = Math.floor(Math.random() * teams.length);
    const awayTeam = teams[awayIndex];
    
    return { homeTeam, awayTeam };
  }
  
  /**
   * Determines if a game should have best bets based on configuration
   * @returns Boolean indicating if the game should have best bets
   */
  protected shouldHaveBestBets(): boolean {
    return Math.random() >= this.config.emptyBetsProbability;
  }
  
  /**
   * Generate a unique game ID
   * @param league League identifier
   * @param index Game index
   * @returns Unique game ID
   */
  protected generateGameId(league: League, index: number): string {
    return `${league.toLowerCase()}-${index + 1}`;
  }
  
  /**
   * Generate a random date within a specified range
   * @param startDate Start date string (YYYY-MM-DD)
   * @param endDate End date string (YYYY-MM-DD)
   * @returns Formatted date string (e.g., "Jan 16, 2025")
   */
  protected generateRandomDate(startDate: string, endDate: string): string {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
  
  /**
   * Generate a random time
   * @returns Formatted time string (e.g., "1:00 PM")
   */
  protected generateRandomTime(): string {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    const period = Math.random() > 0.5 ? "AM" : "PM";
    return `${hours}:${minutes} ${period}`;
  }
  
  /**
   * Generate a random spread value
   * @param min Minimum spread value (default: 1)
   * @param max Maximum spread value (default: 14)
   * @returns Spread value (e.g., 3.5)
   */
  protected generateRandomSpread(min: number = 1, max: number = 14): number {
    // Generate a random spread between min and max, with 0.5 increments
    const range = (max - min) * 2;
    return (Math.floor(Math.random() * range) + min * 2) / 2;
  }
  
  /**
   * Generate a random over/under value
   * @param league League identifier
   * @returns Over/under value
   */
  protected generateRandomOverUnder(league: League): number {
    // Different ranges for different leagues
    const leagueRanges: Record<League, { min: number, max: number }> = {
      "NFL": { min: 40, max: 60 },
      "NBA": { min: 200, max: 240 },
      "MLB": { min: 7, max: 12 },
      "NHL": { min: 5, max: 7 },
      "MLS": { min: 2, max: 5 },
      "NCAAF": { min: 40, max: 65 },
      "NCAAB": { min: 120, max: 160 }
    };
    
    const { min, max } = leagueRanges[league] || { min: 40, max: 60 };
    
    // Generate a random over/under with 0.5 increments
    return (Math.floor(Math.random() * ((max - min) * 2)) + min * 2) / 2;
  }
  
  /**
   * Generate a random money line value
   * @param isFavorite Whether this is for the favorite team
   * @param minValue Minimum absolute value (default: 100)
   * @param maxValue Maximum absolute value (default: 400)
   * @returns Money line value (e.g., -150 or +130)
   */
  protected generateRandomMoneyLine(
    isFavorite: boolean, 
    minValue: number = 100, 
    maxValue: number = 400
  ): number {
    const value = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    return isFavorite ? -value : value;
  }
  
  /**
   * Generate a random network
   * @param league League identifier
   * @returns Network name
   */
  protected generateRandomNetwork(league: League): NetworkName {
    const networks: Record<League, NetworkName[]> = {
      "NFL": ["CBS", "FOX", "NBC", "ESPN", "NFL Network"],
      "NBA": ["ESPN", "TNT", "ABC", "NBA TV"],
      "MLB": ["ESPN", "FOX", "MLB Network", "TBS"],
      "NHL": ["ESPN", "TNT", "NHL Network"],
      "MLS": ["ESPN", "FOX", "FS1", "MLS Season Pass"],
      "NCAAF": ["ESPN", "ABC", "CBS", "FOX", "NBC"],
      "NCAAB": ["ESPN", "CBS", "TNT", "TBS", "FOX"]
    };
    
    const leagueNetworks = networks[league] || ["ESPN"];
    return leagueNetworks[Math.floor(Math.random() * leagueNetworks.length)];
  }
  
  /**
   * Generate a random timezone
   * @returns Timezone string (e.g., "EST")
   */
  protected generateRandomTimezone(): Timezone {
    const timezones: Timezone[] = ["EST", "CST", "MST", "PST"];
    return timezones[Math.floor(Math.random() * timezones.length)];
  }
  
  /**
   * Generate a random game status
   * @returns Game status
   */
  protected generateRandomStatus(): GameStatus {
    // Weighted distribution: 70% Upcoming, 15% Live, 15% Complete
    const rand = Math.random();
    if (rand < 0.7) {
      return "Upcoming";
    } else if (rand < 0.85) {
      return "Live";
    } else {
      return "Complete";
    }
  }
}
