// Team utility functions
import { League } from "@/services/api-types";
import { LEAGUE_TEAMS, MLS_TEAM_NAME_MAPPINGS, NCAAF_TEAM_NAME_MAPPINGS, NCAAB_TEAM_NAME_MAPPINGS } from "./data";

/**
 * Map team name to lookup name based on league and city
 * @param teamName The display name of the team
 * @param league The league the team belongs to
 * @param city The city/school of the team (for disambiguation)
 * @returns The lookup name for the team
 */
export function mapTeamNameToLookupName(teamName: string, league?: League, city?: string): string {
  // If the team name is already in the lookup table, return it
  if (league && LEAGUE_TEAMS[league][teamName]) {
    return teamName;
  }
  
  // Handle MLS teams
  if (league === "MLS" && city) {
    // Try to find by display name and city
    const mlsTeam = MLS_TEAM_NAME_MAPPINGS.find(
      team => team.displayName === teamName && team.city === city
    );
    if (mlsTeam) {
      return mlsTeam.lookupName;
    }
    
    // If that doesn't work, try to combine city and name
    // For example, "Atlanta" + "United" = "Atlanta United"
    const combinedName = `${city} ${teamName}`;
    if (LEAGUE_TEAMS[league][combinedName]) {
      return combinedName;
    }
  }
  
  // Handle NCAA Football teams
  if (league === "NCAAF" && city) {
    // Try to find by display name and city
    const ncaafTeam = NCAAF_TEAM_NAME_MAPPINGS.find(
      team => team.displayName === teamName && team.city === city
    );
    if (ncaafTeam) {
      return ncaafTeam.lookupName;
    }
    
    // If that doesn't work, try to find by city (school name)
    // This is because the city in the game data is the school name
    for (const key in LEAGUE_TEAMS[league]) {
      if (city === key) {
        return key;
      }
    }
  }
  
  // Handle NCAA Basketball teams
  if (league === "NCAAB" && city) {
    // Try to find by display name and city
    const ncaabTeam = NCAAB_TEAM_NAME_MAPPINGS.find(
      team => team.displayName === teamName && team.city === city
    );
    if (ncaabTeam) {
      return ncaabTeam.lookupName;
    }
    
    // If that doesn't work, try to find by city (school name)
    // This is because the city in the game data is the school name
    for (const key in LEAGUE_TEAMS[league]) {
      if (city === key) {
        return key;
      }
    }
  }
  
  // If no mapping found, return the original name
  return teamName;
}

/**
 * Get the logo path for a team
 * @param teamName The name of the team
 * @param league Optional league name (NFL, NBA, MLB, MLS)
 * @param city Optional city/school of the team (for disambiguation)
 * @returns The path to the team logo or undefined if not found
 */
export function getTeamLogo(teamName: string, league?: League, city?: string): string | undefined {
  // Map the team name to the lookup name
  const lookupName = mapTeamNameToLookupName(teamName, league, city);
  
  // If league is provided, look only in that league
  if (league) {
    return LEAGUE_TEAMS[league][lookupName];
  }
  
  // Otherwise, search all leagues
  for (const leagueTeams of Object.values(LEAGUE_TEAMS)) {
    if (leagueTeams[lookupName]) {
      return leagueTeams[lookupName];
    }
  }
  
  // If no match found, return undefined
  return undefined;
}
