import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// TODO: refactor after implementation
import { League } from "@/services/api-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the display name for a league
 * @param league The league code
 * @returns The display name for the league
 */
export function getLeagueDisplayName(league: League): string {
  const displayNames: Record<League, string> = {
    "NFL": "NFL",
    "NBA": "NBA",
    "MLB": "MLB",
    "NHL": "NHL",
    "MLS": "MLS",
    "NCAAB": "NCAA Basketball",
    "NCAAF": "NCAA Football"
  };
  return displayNames[league] || league;
}
