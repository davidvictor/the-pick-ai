import { League } from "@/services/api-types";
import { NFL_TEAMS } from "./nfl";
import { NBA_TEAMS } from "./nba";
import { MLB_TEAMS } from "./mlb";
import { NHL_TEAMS } from "./nhl";
import { MLS_TEAMS } from "./mls";
import { NCAAF_TEAMS } from "./ncaaf";
import { NCAAB_TEAMS } from "./ncaab";

/**
 * Get teams by league
 */
export function getTeamsByLeague(league: League) {
  switch (league) {
    case "NFL":
      return NFL_TEAMS;
    case "NBA":
      return NBA_TEAMS;
    case "MLB":
      return MLB_TEAMS;
    case "NHL":
      return NHL_TEAMS;
    case "MLS":
      return MLS_TEAMS;
    case "NCAAF":
      return NCAAF_TEAMS;
    case "NCAAB":
      return NCAAB_TEAMS;
    default:
      return [];
  }
}

// Export all team data
export {
  NFL_TEAMS,
  NBA_TEAMS,
  MLB_TEAMS,
  NHL_TEAMS,
  MLS_TEAMS,
  NCAAF_TEAMS,
  NCAAB_TEAMS
};
