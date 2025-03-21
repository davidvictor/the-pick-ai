import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { mockDataService } from "./mock";

// Generate the mock data using the service
const mockData = mockDataService.generateMockData();

// Export the updated games by league
export const updatedGamesByLeague: Record<League, GameCardProps[]> = mockData;

// Export the NFL games specifically
export const updatedNflGames: GameCardProps[] = mockData.NFL || [];

// For backward compatibility, export the same structure with a different name
export const updatedMockGamesByLeague: Record<League, GameCardProps[]> = mockData;
