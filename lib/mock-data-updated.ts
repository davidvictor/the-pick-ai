import { GameCardProps } from "@/components/game-card/game-card";
import { League } from "@/services/api-types";
import { updatedGamesByLeague, updatedNflGames, updatedMockGamesByLeague } from "./update-mock-data";

// Export the updated games
export const mockNflGames: GameCardProps[] = updatedNflGames;
export const mockNbaGames: GameCardProps[] = updatedGamesByLeague.NBA;
export const mockMlbGames: GameCardProps[] = updatedGamesByLeague.MLB;
export const mockNhlGames: GameCardProps[] = updatedGamesByLeague.NHL;
export const mockNcaafGames: GameCardProps[] = updatedGamesByLeague.NCAAF;
export const mockNcaabGames: GameCardProps[] = updatedGamesByLeague.NCAAB;

// Map of all mock games by league
export const mockGamesByLeague: Record<League, GameCardProps[]> = updatedMockGamesByLeague;

// For backward compatibility
export const mockGames = mockNflGames;
