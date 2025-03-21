import { mockDataConfig } from './config';
import { MockDataService, mockDataService } from './mock-data-service';

// Generate mock data
export const mockGamesByLeague = mockDataService.generateMockData();

// Export configuration for customization
export { mockDataConfig };

// Export service for advanced usage
export { mockDataService, MockDataService };

// Export generators
export * from './generators/game-generator';
export * from './generators/bet-generator';
export * from './generators/nfl-generator';
export * from './generators/nba-generator';
export * from './generators/mlb-generator';
export * from './generators/nhl-generator';
export * from './generators/mls-generator';
export * from './generators/ncaaf-generator';
export * from './generators/ncaab-generator';
