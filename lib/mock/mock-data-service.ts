import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { mockDataConfig } from "./config";
import { NFLGameGenerator } from "./generators/nfl-generator";
import { NBAGameGenerator } from "./generators/nba-generator";
import { MLBGameGenerator } from "./generators/mlb-generator";
import { NHLGameGenerator } from "./generators/nhl-generator";
import { MLSGameGenerator } from "./generators/mls-generator";
import { NcaafGameGenerator } from "./generators/ncaaf-generator";
import { NcaabGameGenerator } from "./generators/ncaab-generator";
import { BetGenerator } from "./generators/bet-generator";

/**
 * Mock data service
 * This class provides access to mock data for the application
 */
export class MockDataService {
  /**
   * Game generators for each league
   */
  private gameGenerators!: Record<League, any>;
  
  /**
   * Bet generator instance
   */
  private betGenerator: BetGenerator;
  
  /**
   * Cached mock data
   */
  private mockData: Record<League, GameCardProps[]> | null = null;
  
  /**
   * Constructor
   */
  constructor() {
    this.betGenerator = new BetGenerator();
    this.initializeGenerators();
  }
  
  /**
   * Initialize game generators
   */
  private initializeGenerators() {
    this.gameGenerators = {
      NFL: new NFLGameGenerator(this.betGenerator),
      NBA: new NBAGameGenerator(this.betGenerator),
      MLB: new MLBGameGenerator(this.betGenerator),
      NHL: new NHLGameGenerator(this.betGenerator),
      MLS: new MLSGameGenerator(this.betGenerator),
      NCAAF: new NcaafGameGenerator(this.betGenerator),
      NCAAB: new NcaabGameGenerator(this.betGenerator)
    };
  }
  
  /**
   * Generate mock data for all leagues
   * @returns Record of game data by league
   */
  generateMockData(): Record<League, GameCardProps[]> {
    // If we already have generated data, return it
    if (this.mockData) {
      console.log("Returning cached mock data");
      return this.mockData;
    }
    
    console.log("Generating new mock data");
    
    // Generate data for each league
    const result: Record<League, GameCardProps[]> = {} as Record<League, GameCardProps[]>;
    
    Object.entries(mockDataConfig.gamesPerLeague).forEach(([league, count]) => {
      const leagueKey = league as League;
      console.log(`Generating ${count} games for ${leagueKey}`);
      result[leagueKey] = this.gameGenerators[leagueKey].generateGames(count);
      console.log(`Generated ${result[leagueKey].length} games for ${leagueKey}`);
    });
    
    // Cache the result
    this.mockData = result;
    
    console.log("Mock data generation complete");
    
    return result;
  }
  
  /**
   * Get games for a specific league
   * @param league League identifier
   * @returns Array of game data
   */
  getGamesByLeague(league: League): GameCardProps[] {
    const mockData = this.generateMockData();
    return mockData[league] || [];
  }
  
  /**
   * Get a specific game by ID
   * @param league League identifier
   * @param gameId Game ID
   * @returns Game data or null if not found
   */
  getGameById(league: League, gameId: string): GameCardProps | null {
    const games = this.getGamesByLeague(league);
    return games.find(game => game.id === gameId) || null;
  }
  
  /**
   * Get all available leagues
   * @returns Array of league identifiers
   */
  getAvailableLeagues(): League[] {
    const mockData = this.generateMockData();
    return Object.entries(mockData)
      .filter(([_, games]) => games.length > 0)
      .map(([league]) => league as League);
  }
  
  /**
   * Regenerate mock data
   * This is useful for testing or when you want to get fresh data
   * @returns Record of game data by league
   */
  regenerateMockData(): Record<League, GameCardProps[]> {
    this.mockData = null;
    return this.generateMockData();
  }
}

/**
 * Singleton instance of the mock data service
 */
export const mockDataService = new MockDataService();
