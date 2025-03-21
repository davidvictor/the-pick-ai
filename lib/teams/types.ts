// Team types for the application
import { League } from "@/services/api-types";

/**
 * Team name mapping structure
 */
export interface TeamNameMapping {
  displayName: string;
  lookupName: string;
  city: string;
}

/**
 * League to team mapping type
 */
export type LeagueTeamsMap = Record<League, Record<string, string>>;
