import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { mockDataConfig } from "../config";
import { Bet } from "@/lib/bet-types";

/**
 * Abstract base class for game generators
 * This class provides common functionality for generating mock games
 */
export abstract class GameGenerator {
  /**
   * Configuration for the mock data generation
   */
  protected config = mockDataConfig;
  
  /**
   * Generate a specified number of games for a league
   * @param count Number of games to generate
   * @returns Array of game data
   */
  abstract generateGames(count: number): GameCardProps[];
  
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
   * @returns Spread value (e.g., 3.5)
   */
  protected generateRandomSpread(): number {
    // Generate a random spread between 1 and 14, with 0.5 increments
    return (Math.floor(Math.random() * 27) + 2) / 2;
  }
  
  /**
   * Generate a random over/under value
   * @param league League identifier
   * @returns Over/under value
   */
  protected generateRandomOverUnder(league: League): number {
    // Different ranges for different leagues
    let min = 40;
    let max = 60;
    
    switch (league) {
      case "NFL":
        min = 40;
        max = 60;
        break;
      case "NBA":
        min = 200;
        max = 240;
        break;
      case "MLB":
        min = 7;
        max = 12;
        break;
      case "NHL":
        min = 5;
        max = 7;
        break;
      default:
        min = 40;
        max = 60;
    }
    
    // Generate a random over/under with 0.5 increments
    return (Math.floor(Math.random() * ((max - min) * 2)) + min * 2) / 2;
  }
  
  /**
   * Generate a random money line value
   * @param isFavorite Whether this is for the favorite team
   * @returns Money line value (e.g., -150 or +130)
   */
  protected generateRandomMoneyLine(isFavorite: boolean): number {
    if (isFavorite) {
      // Negative money line for favorites (e.g., -110, -150, -200)
      return -(Math.floor(Math.random() * 300) + 100);
    } else {
      // Positive money line for underdogs (e.g., +110, +150, +200)
      return Math.floor(Math.random() * 300) + 100;
    }
  }
  
  /**
   * Generate a random network
   * @param league League identifier
   * @returns Network name
   */
  protected generateRandomNetwork(league: League): string {
    const networks: Record<League, string[]> = {
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
  protected generateRandomTimezone(): string {
    const timezones = ["EST", "CST", "MST", "PST"];
    return timezones[Math.floor(Math.random() * timezones.length)];
  }
  
  /**
   * Generate a random game status
   * @returns Game status string ("Upcoming", "Live", or "Complete")
   */
  protected generateRandomStatus(): string {
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
