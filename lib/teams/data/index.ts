// Import League type
import { League } from "@/services/api-types";
import { LeagueTeamsMap } from "@/lib/teams/types";

// Import all team data
import { NFL_TEAMS } from "./nfl";
import { NBA_TEAMS } from "./nba";
import { MLB_TEAMS } from "./mlb";
import { NHL_TEAMS } from "./nhl";
import { MLS_TEAMS } from "./mls";
import { NCAAF_TEAMS } from "./ncaaf";
import { NCAAB_TEAMS } from "./ncaab";

// Export all team data
export { NFL_TEAMS } from "./nfl";
export { NBA_TEAMS } from "./nba";
export { MLB_TEAMS } from "./mlb";
export { NHL_TEAMS } from "./nhl";
export { MLS_TEAMS } from "./mls";
export { NCAAF_TEAMS } from "./ncaaf";
export { NCAAB_TEAMS } from "./ncaab";

// Export all team name mappings
export * from "./mappings";

// League to team mapping
export const LEAGUE_TEAMS: LeagueTeamsMap = {
  "NFL": NFL_TEAMS,
  "NBA": NBA_TEAMS,
  "MLB": MLB_TEAMS,
  "NHL": NHL_TEAMS,
  "MLS": MLS_TEAMS,
  "NCAAF": NCAAF_TEAMS,
  "NCAAB": NCAAB_TEAMS,
};
