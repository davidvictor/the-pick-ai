import { GameCardProps } from "@/components/game-card/game-card";
import { mockGamesByLeague, Bet } from "@/lib";
import { GameDetailsProps, GameService, League } from "./api-types";
import { simulateLoadingDelay } from "@/hooks/use-simulated-loading";

/**
 * Mock implementation of the GameService interface
 * This service returns static mock data and simulates API behavior
 */
export class MockGameService implements GameService {
  /**
   * Get games for a specific league
   * @param league The league to get games for
   * @returns Promise resolving to an array of game data
   */
  async getGamesByLeague(league: League): Promise<GameCardProps[]> {
    // Simulate network delay using the centralized configuration
    await simulateLoadingDelay('getGamesByLeague');
    
    console.log(`MockGameService.getGamesByLeague(${league})`);
    console.log(`mockGamesByLeague keys: ${Object.keys(mockGamesByLeague)}`);
    console.log(`mockGamesByLeague[${league}] length: ${mockGamesByLeague[league]?.length || 0}`);
    
    // Get the mock data for the requested league
    const games = mockGamesByLeague[league] || [];
    
    // Add status to each game based on game ID, using the same logic as getGameDetails
    return games.map(game => {
      let status = "Upcoming";
      if (game.id) {
        if (game.id.endsWith("1") || game.id.endsWith("5") || game.id.endsWith("9")) {
          status = "Live";
        } else if (game.id.endsWith("2") || game.id.endsWith("6") || game.id.endsWith("10")) {
          status = "Final";
        }
      }
      
      return {
        ...game,
        status
      };
    });
  }
  
  /**
   * Get all available leagues
   * @returns Promise resolving to an array of league identifiers
   */
  async getAvailableLeagues(): Promise<League[]> {
    // Simulate network delay using the centralized configuration
    await simulateLoadingDelay('getAvailableLeagues');
    
    // Return leagues that have games
    return Object.entries(mockGamesByLeague)
      .filter(([_, games]: [string, any[]]) => games.length > 0)
      .map(([league]) => league as League);
  }

  /**
   * Get a specific game by ID
   * @param league The league the game belongs to
   * @param gameId The unique identifier of the game
   * @returns Promise resolving to the game data or null if not found
   */
  async getGameById(league: League, gameId: string): Promise<GameCardProps | null> {
    // Simulate network delay using the centralized configuration
    await simulateLoadingDelay('getGameById');
    
    // Find the game in the mock data
    const games = mockGamesByLeague[league] || [];
    const game = games.find(game => game.id === gameId);
    
    if (!game) return null;
    
    // Determine game status based on game ID, using the same logic as getGamesByLeague and getGameDetails
    let status = "Upcoming";
    if (gameId.endsWith("1") || gameId.endsWith("5") || gameId.endsWith("9")) {
      status = "Live";
    } else if (gameId.endsWith("2") || gameId.endsWith("6") || gameId.endsWith("10")) {
      status = "Final";
    }
    
    // Return the game with the status
    return {
      ...game,
      status
    };
  }

  /**
   * Get detailed information for a specific game
   * @param league The league the game belongs to
   * @param gameId The unique identifier of the game
   * @returns Promise resolving to the detailed game data or null if not found
   */
  async getGameDetails(league: League, gameId: string): Promise<GameDetailsProps | null> {
    // Simulate network delay using the centralized configuration
    await simulateLoadingDelay('getGameDetails');
    
    // Find the basic game data first
    const game = await this.getGameById(league, gameId);
    if (!game) return null;
    
    // Find the team data to get stadium and location
    const { getTeamsByLeague } = await import("@/lib/mock/data/teams");
    const teams = getTeamsByLeague(league);
    
    // For MLS and NCAA teams, we need to use the city to find the correct team
    let homeTeam;
    if (league === "MLS") {
      // For MLS, we need to find the team by full name
      homeTeam = teams.find(team => {
        // Try to match by full name first
        if (team.name === game.homeTeam.name) return true;
        
        // If that doesn't work, try to match by city and partial name
        // For example, "Atlanta" + "United" = "Atlanta United"
        if (game.homeTeam.city && game.homeTeam.name) {
          const combinedName = `${game.homeTeam.city} ${game.homeTeam.name}`;
          return team.name === combinedName;
        }
        
        return false;
      });
    } else if (league === "NCAAF" || league === "NCAAB") {
      // For NCAA teams, the city in the game data is the school name
      homeTeam = teams.find(team => (team as any).school === game.homeTeam.city);
    } else {
      homeTeam = teams.find(team => team.name === game.homeTeam.name);
    }
    
    // Get stadium name based on league
    let stadium = "Unknown Stadium";
    let location = "Unknown Location";
    
    if (homeTeam) {
      location = homeTeam.location;
      
      // Check if it's NBA or NHL (which use 'arena' instead of 'stadium')
      if (league === "NBA" || league === "NHL" || league === "NCAAB") {
        stadium = (homeTeam as any).arena || "Unknown Arena";
      } else {
        stadium = (homeTeam as any).stadium || "Unknown Stadium";
      }
    }
    
    // Generate random weather based on the game ID for consistency
    const weatherOptions = [
      { conditions: "Clear skies", type: "clear-day" },
      { conditions: "Clear night", type: "clear-night" },
      { conditions: "Partly cloudy", type: "partly-cloudy-day" },
      { conditions: "Partly cloudy night", type: "partly-cloudy-night" },
      { conditions: "Overcast", type: "cloudy" },
      { conditions: "Light rain", type: "rain" },
      { conditions: "Heavy rain", type: "rain" },
      { conditions: "Sleet", type: "sleet" },
      { conditions: "Snow", type: "snow" },
      { conditions: "Windy", type: "wind" },
      { conditions: "Foggy", type: "fog" },
      { conditions: "Sunny", type: "clear-day" }
    ];
    
    // Use game ID to get consistent weather for the same game
    const weatherIndex = parseInt(gameId.replace(/\D/g, '')) % weatherOptions.length;
    const selectedWeather = weatherOptions[weatherIndex];
    const temperature = Math.floor(Math.random() * 50) + 30; // 30-80°F
    const windSpeed = Math.floor(Math.random() * 20) + 5; // 5-25mph
    
    // Fetch the template from the public directory
    let templateContent = '';
    
    try {
      // In a real application, this would be an async fetch, but for simplicity in this mock service
      // we'll use a hardcoded template if fetch fails
      const defaultTemplate = "## ${game.awayTeam.name} vs. ${game.homeTeam.name} Game Analysis\n\nNo detailed analysis available for this game.";
      
      // Try to fetch the template from the public directory
      const response = await fetch('/game-analysis-template.json');
      if (response.ok) {
        const data = await response.json();
        templateContent = data.template;
      } else {
        console.error('Error fetching template file:', response.statusText);
        templateContent = defaultTemplate;
      }
    } catch (error) {
      console.error('Error loading template:', error);
      templateContent = "## ${game.awayTeam.name} vs. ${game.homeTeam.name} Game Analysis\n\nNo detailed analysis available for this game.";
    }
    
    // Replace template variables with actual game data
    const analysisContent = templateContent
      .replace(/\${game\.awayTeam\.name}/g, game.awayTeam.name)
      .replace(/\${game\.homeTeam\.name}/g, game.homeTeam.name)
      .replace(/\${game\.date}/g, game.date)
      .replace(/\${game\.id}/g, game.id || gameId)
      .replace(/\${game\.stadium}/g, stadium)
      .replace(/\${game\.location}/g, location)
      .replace(/\${game\.time}/g, game.time)
      .replace(/\${game\.timezone}/g, game.timezone)
      .replace(/\${game\.network}/g, game.network)
      .replace(/\${game\.total}/g, '217.5')
      .replace(/\${game\.awayTeam\.abbreviation}/g, (game.awayTeam.city || '').substring(0, 3).toUpperCase())
      .replace(/\${game\.homeTeam\.abbreviation}/g, (game.homeTeam.city || '').substring(0, 3).toUpperCase())
      .replace(/\${game\.spread\.team}/g, game.spread.team)
      .replace(/\${game\.spread\.value > 0 \? '\+' : ''}/g, game.spread.value > 0 ? '+' : '')
      .replace(/\${game\.spread\.value}/g, game.spread.value.toString());
    
    // Create a single agent with the consolidated content
    const agents = [{
      id: 'consolidated-analysis',
      name: 'Game Analysis',
      content: analysisContent
    }];
    
    // Create sample best bet explanations with additional fields
    const bestBetsWithExplanations = game.bestBets.map(bet => {
      // All bets are in the new format
      return {
        ...bet,
        explanation: `This bet is recommended because of recent trends and statistical analysis. Our confidence rating is ${bet.rating}/10 based on multiple factors including weather, injuries, and recent team performance.`,
      };
    });
    
    // Return enhanced game details
    return {
      ...game,
      id: game.id || gameId, // Ensure id is always defined
      location: location,
      stadium: stadium,
      weather: {
        temperature: `${temperature}°F`,
        conditions: selectedWeather.conditions,
        wind: `${windSpeed}mph Winds`,
        type: selectedWeather.type
      },
      status: game.status || "Upcoming", // Ensure status is always defined
      bestBets: bestBetsWithExplanations,
      agents
    };
  }
}
