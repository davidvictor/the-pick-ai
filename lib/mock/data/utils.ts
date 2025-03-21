import { TeamData } from "../types";

/**
 * Default team colors by team abbreviation
 */
const DEFAULT_TEAM_COLORS: Record<string, { primary: string, secondary: string }> = {
  // NFL Teams
  "BUF": { primary: "#00338D", secondary: "#C60C30" },
  "MIA": { primary: "#008E97", secondary: "#FC4C02" },
  "NE": { primary: "#002244", secondary: "#C60C30" },
  "NYJ": { primary: "#125740", secondary: "#000000" },
  "BAL": { primary: "#241773", secondary: "#000000" },
  "CIN": { primary: "#FB4F14", secondary: "#000000" },
  "CLE": { primary: "#311D00", secondary: "#FF3C00" },
  "PIT": { primary: "#FFB612", secondary: "#101820" },
  "HOU": { primary: "#03202F", secondary: "#A71930" },
  "IND": { primary: "#002C5F", secondary: "#A2AAAD" },
  "JAX": { primary: "#101820", secondary: "#D7A22A" },
  "TEN": { primary: "#0C2340", secondary: "#4B92DB" },
  "DEN": { primary: "#FB4F14", secondary: "#002244" },
  "KC": { primary: "#E31837", secondary: "#FFB81C" },
  "LV": { primary: "#000000", secondary: "#A5ACAF" },
  "LAC": { primary: "#0080C6", secondary: "#FFC20E" },
  "DAL": { primary: "#003594", secondary: "#869397" },
  "NYG": { primary: "#0B2265", secondary: "#A71930" },
  "PHI": { primary: "#004C54", secondary: "#A5ACAF" },
  "WAS": { primary: "#5A1414", secondary: "#FFB612" },
  "CHI": { primary: "#0B162A", secondary: "#C83803" },
  "DET": { primary: "#0076B6", secondary: "#B0B7BC" },
  "GB": { primary: "#203731", secondary: "#FFB612" },
  "MIN": { primary: "#4F2683", secondary: "#FFC62F" },
  "ATL": { primary: "#A71930", secondary: "#000000" },
  "CAR": { primary: "#0085CA", secondary: "#101820" },
  "NO": { primary: "#D3BC8D", secondary: "#101820" },
  "TB": { primary: "#D50A0A", secondary: "#FF7900" },
  "ARI": { primary: "#97233F", secondary: "#000000" },
  "LAR": { primary: "#003594", secondary: "#FFA300" },
  "SF": { primary: "#AA0000", secondary: "#B3995D" },
  "SEA": { primary: "#002244", secondary: "#69BE28" },
  
  // Default colors for any team not listed
  "DEFAULT": { primary: "#333333", secondary: "#999999" }
};

/**
 * Ensure team data has colors
 * @param team Partial team data
 * @returns Complete team data with colors
 */
export function ensureTeamColors(team: Partial<TeamData>): TeamData {
  // If colors are present, return as is
  if (team.colors) {
    return team as TeamData;
  }
  
  // Otherwise, add colors based on abbreviation or use default
  const colors = DEFAULT_TEAM_COLORS[team.abbreviation || ""] || DEFAULT_TEAM_COLORS["DEFAULT"];
  
  return {
    name: team.name || "Unknown",
    city: team.city || "Unknown",
    abbreviation: team.abbreviation || "UNK",
    colors,
    ...(team as any) // Add any other properties from the original team
  };
}

/**
 * Add colors to an array of teams
 * @param teams Array of teams
 * @returns Array of teams with colors added
 */
export function addColorsToTeams(teams: Partial<TeamData>[]): TeamData[] {
  return teams.map(ensureTeamColors);
}
