import { GameCardProps } from "@/components/game-card/game-card";
import { mockGamesByLeague, Bet } from "@/lib";
import { GameDetailsProps, GameService, League } from "./api-types";

/**
 * API implementation of the GameService interface
 * This service will connect to a real API in the future
 * For now, it falls back to mock data but is structured for easy replacement
 */
export class ApiGameService implements GameService {
  private baseUrl: string;
  
  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }
  
  /**
   * Get games for a specific league
   * @param league The league to get games for
   * @returns Promise resolving to an array of game data
   */
  async getGamesByLeague(league: League): Promise<GameCardProps[]> {
    // TODO: Replace with actual API call when available
    // Example implementation:
    // const response = await fetch(`${this.baseUrl}/games?league=${league}`);
    // if (!response.ok) throw new Error(`Failed to fetch games for ${league}`);
    // return await response.json();
    
    // For now, return mock data
    console.log(`[API Service] Would fetch games for ${league} from ${this.baseUrl}/games`);
    return mockGamesByLeague[league] || [];
  }
  
  /**
   * Get all available leagues
   * @returns Promise resolving to an array of league identifiers
   */
  async getAvailableLeagues(): Promise<League[]> {
    // TODO: Replace with actual API call when available
    // Example implementation:
    // const response = await fetch(`${this.baseUrl}/leagues`);
    // if (!response.ok) throw new Error('Failed to fetch available leagues');
    // return await response.json();
    
    // For now, return mock data
    console.log(`[API Service] Would fetch available leagues from ${this.baseUrl}/leagues`);
    return Object.entries(mockGamesByLeague)
      .filter(([_, games]) => games.length > 0)
      .map(([league]) => league as League);
  }

  /**
   * Get a specific game by ID
   * @param league The league the game belongs to
   * @param gameId The unique identifier of the game
   * @returns Promise resolving to the game data or null if not found
   */
  async getGameById(league: League, gameId: string): Promise<GameCardProps | null> {
    // TODO: Replace with actual API call when available
    // Example implementation:
    // const response = await fetch(`${this.baseUrl}/games/${gameId}?league=${league}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error(`Failed to fetch game ${gameId}`);
    // }
    // return await response.json();
    
    // For now, return mock data
    console.log(`[API Service] Would fetch game ${gameId} from ${this.baseUrl}/games/${gameId}`);
    const games = mockGamesByLeague[league] || [];
    return games.find(game => game.id === gameId) || null;
  }
  
  /**
   * Get detailed information for a specific game
   * @param league The league the game belongs to
   * @param gameId The unique identifier of the game
   * @returns Promise resolving to the detailed game data or null if not found
   */
  async getGameDetails(league: League, gameId: string): Promise<GameDetailsProps | null> {
    // TODO: Replace with actual API call when available
    // Example implementation:
    // const response = await fetch(`${this.baseUrl}/games/${gameId}/details?league=${league}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error(`Failed to fetch game details for ${gameId}`);
    // }
    // return await response.json();
    
    // For now, return mock data
    console.log(`[API Service] Would fetch game details for ${gameId} from ${this.baseUrl}/games/${gameId}/details`);
    
    // Find the basic game data first
    const game = await this.getGameById(league, gameId);
    if (!game) return null;
    
    // Generate agent names based on their roles
    const agentNames = {
      'agent-1': 'League Data Collector',
      'agent-2': 'Odds Aggregator',
      'agent-3': 'News and Injury Monitor',
      'agent-4': 'Data Cleaner',
      'agent-5': 'Feature Engineer',
      'agent-6': 'Predictive Modeler',
      'agent-7': 'Trend Analyzer',
      'agent-8': 'Spread and Moneyline Evaluator',
      'agent-9': 'Over/Under Evaluator',
      'agent-10': 'Expected Value Calculator',
      'agent-11': 'Risk Assessor',
      'agent-12': 'Unit Allocator and Ranker'
    };
    
    // Create sample agent content
    const agents = Object.entries(agentNames).map(([id, name]) => ({
      id,
      name,
      content: `# ${name} Analysis

## Key Findings

- This is sample markdown content for ${name}
- It will be rendered in the tab content
- Tables and other markdown elements are supported

## Data Table

| Metric | Value | Trend |
| ------ | ----- | ----- |
| Score Prediction | ${game.homeTeam.name}: 24, ${game.awayTeam.name}: 21 | ↑ |
| Win Probability | ${game.homeTeam.name}: 58% | ↓ |
| Key Factor | Weather conditions | - |

## Recommendation

Based on the analysis, the ${game.spread.team} ${game.spread.value > 0 ? '+' : ''}${game.spread.value} spread offers good value.`
    }));
    
    // Create sample best bet explanations with additional fields
    const bestBetsWithExplanations = game.bestBets.map(bet => {
      // All bets are in the new format
      return {
        ...bet,
        explanation: `This bet is recommended because of recent trends and statistical analysis. Our confidence rating is ${bet.rating}/10 based on multiple factors including weather, injuries, and recent team performance.`,
      };
    });
    
    // Determine game status based on game ID for testing different statuses
    let status = "Upcoming";
    if (gameId.endsWith("1") || gameId.endsWith("5") || gameId.endsWith("9")) {
      status = "Live";
    } else if (gameId.endsWith("2") || gameId.endsWith("6") || gameId.endsWith("10")) {
      status = "Complete";
    }
    
    // Return enhanced game details
    return {
      ...game,
      id: game.id || gameId, // Ensure id is always defined
      location: league === "NFL" ? "Orchard Park, NY" : "Sample Location",
      stadium: league === "NFL" ? "Highmark Stadium" : "Sample Stadium",
      weather: {
        temperature: "34°F",
        conditions: "Clear skies",
        wind: "10mph Winds",
        type: "clear-day" // Default to clear-day for the API service
      },
      status,
      bestBets: bestBetsWithExplanations,
      agents
    };
  }
}
