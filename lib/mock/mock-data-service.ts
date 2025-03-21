import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { mockDataConfig, getCustomConfig } from "./config";
import { NFLGameGenerator } from "./generators/nfl-generator";
import { NBAGameGenerator } from "./generators/nba-generator";
import { MLBGameGenerator } from "./generators/mlb-generator";
import { NHLGameGenerator } from "./generators/nhl-generator";
import { MLSGameGenerator } from "./generators/mls-generator";
import { NcaafGameGenerator } from "./generators/ncaaf-generator";
import { NcaabGameGenerator } from "./generators/ncaab-generator";
import { BetGenerator } from "./generators/bet-generator";
import { IGameGenerator, IBetGenerator, IMockDataConfig } from "./types";

/**
 * Factory for creating game generators
 */
export class GameGeneratorFactory {
  /**
   * Create a game generator for the specified league
   * @param league League identifier
   * @param betGenerator Bet generator instance
   * @param config Optional configuration
   * @returns Game generator instance
   */
  static createGenerator(
    league: League,
    betGenerator: BetGenerator,
    config?: IMockDataConfig
  ): IGameGenerator {
    // Create the game generator based on league
    // For now, we'll only pass the bet generator since the game generators
    // aren't all updated to accept the config parameter
    switch (league) {
      case "NFL":
        return new NFLGameGenerator(betGenerator);
      case "NBA":
        return new NBAGameGenerator(betGenerator);
      case "MLB":
        return new MLBGameGenerator(betGenerator);
      case "NHL":
        return new NHLGameGenerator(betGenerator);
      case "MLS":
        return new MLSGameGenerator(betGenerator);
      case "NCAAF":
        return new NcaafGameGenerator(betGenerator);
      case "NCAAB":
        return new NcaabGameGenerator(betGenerator);
      default:
        throw new Error(`No generator available for league: ${league}`);
    }
  }
}

/**
 * Mock data service options
 */
export interface MockDataServiceOptions {
  /**
   * Configuration for the mock data generation
   */
  config?: IMockDataConfig;
  
  /**
   * Custom bet generator instance
   */
  betGenerator?: BetGenerator;
  
  /**
   * Whether to enable caching (default: true)
   */
  enableCaching?: boolean;
  
  /**
   * Custom game generators for specific leagues
   */
  customGenerators?: Partial<Record<League, IGameGenerator>>;
}

/**
 * Mock data service
 * This class provides access to mock data for the application
 */
export class MockDataService {
  /**
   * Game generators for each league
   */
  private gameGenerators: Record<League, IGameGenerator>;
  
  /**
   * Bet generator instance
   */
  private betGenerator: BetGenerator;
  
  /**
   * Configuration
   */
  private config: IMockDataConfig;
  
  /**
   * Whether caching is enabled
   */
  private cachingEnabled: boolean;
  
  /**
   * Cached mock data
   */
  private mockData: Record<League, GameCardProps[]> | null = null;
  
  /**
   * Constructor
   * @param options Service options
   */
  constructor(options: MockDataServiceOptions = {}) {
    this.config = options.config || mockDataConfig;
    this.betGenerator = options.betGenerator || new BetGenerator(this.config);
    this.cachingEnabled = options.enableCaching !== false;
    
    // Initialize generators with dependency injection
    this.gameGenerators = this.initializeGenerators(options.customGenerators);
  }
  
  /**
   * Initialize game generators
   * @param customGenerators Optional custom generators
   * @returns Record of game generators by league
   */
  private initializeGenerators(
    customGenerators?: Partial<Record<League, IGameGenerator>>
  ): Record<League, IGameGenerator> {
    const generators: Record<League, IGameGenerator> = {} as Record<League, IGameGenerator>;
    
    // Initialize generators for all leagues in the configuration
    Object.keys(this.config.gamesPerLeague).forEach(leagueKey => {
      const league = leagueKey as League;
      
      // Use custom generator if provided, otherwise create a new one
      generators[league] = customGenerators?.[league] || 
        GameGeneratorFactory.createGenerator(league, this.betGenerator, this.config);
    });
    
    return generators;
  }
  
  /**
   * Update service configuration
   * @param newConfig New configuration
   */
  updateConfig(newConfig: Partial<IMockDataConfig>): void {
    this.config = getCustomConfig(newConfig);
    this.clearCache();
    
    // Update bet generator config
    this.betGenerator = new BetGenerator(this.config);
    
    // Reinitialize game generators with new config
    this.gameGenerators = this.initializeGenerators();
  }
  
  /**
   * Clear the mock data cache
   */
  clearCache(): void {
    this.mockData = null;
  }
  
  /**
   * Toggle caching
   * @param enabled Whether caching should be enabled
   */
  setCaching(enabled: boolean): void {
    this.cachingEnabled = enabled;
    if (!enabled) {
      this.clearCache();
    }
  }
  
  /**
   * Generate mock data for all leagues
   * @param forceRegenerate Whether to force regeneration even if cached data exists
   * @returns Record of game data by league
   */
  generateMockData(forceRegenerate: boolean = false): Record<League, GameCardProps[]> {
    // If caching is enabled and we already have generated data, return it
    if (this.cachingEnabled && this.mockData && !forceRegenerate) {
      console.log("Returning cached mock data");
      return this.mockData;
    }
    
    console.log("Generating new mock data");
    
    // Generate data for each league
    const result: Record<League, GameCardProps[]> = {} as Record<League, GameCardProps[]>;
    
    Object.entries(this.config.gamesPerLeague).forEach(([league, count]) => {
      const leagueKey = league as League;
      console.log(`Generating ${count} games for ${leagueKey}`);
      
      if (this.gameGenerators[leagueKey]) {
        result[leagueKey] = this.gameGenerators[leagueKey].generateGames(count);
        console.log(`Generated ${result[leagueKey].length} games for ${leagueKey}`);
      } else {
        console.warn(`No generator found for ${leagueKey}, skipping`);
        result[leagueKey] = [];
      }
    });
    
    // Cache the result if caching is enabled
    if (this.cachingEnabled) {
      this.mockData = result;
    }
    
    console.log("Mock data generation complete");
    
    return result;
  }
  
  /**
   * Get games for a specific league
   * @param league League identifier
   * @param regenerate Whether to regenerate the data
   * @returns Array of game data
   */
  getGamesByLeague(league: League, regenerate: boolean = false): GameCardProps[] {
    const mockData = this.generateMockData(regenerate);
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
    return this.generateMockData(true);
  }
  
  /**
   * Get the bet generator
   * @returns Bet generator instance
   */
  getBetGenerator(): BetGenerator {
    return this.betGenerator;
  }
  
  /**
   * Get a game generator for a specific league
   * @param league League identifier
   * @returns Game generator or null if not found
   */
  getGameGenerator(league: League): IGameGenerator | null {
    return this.gameGenerators[league] || null;
  }
}

/**
 * Create a default singleton instance of the mock data service
 */
export const createMockDataService = (options?: MockDataServiceOptions): MockDataService => {
  return new MockDataService(options);
};

/**
 * Singleton instance of the mock data service
 */
export const mockDataService = createMockDataService();
