import { useMemo } from "react";
import { getTeamLogo } from "@/lib/team-utils";
import { League } from "@/services/api-types";

interface Team {
  name: string;
  city?: string;
  logo?: string;
}

export function useTeamWithLogo(team: Team | null, league: League) {
  return useMemo(() => 
    team ? {
      ...team,
      logo: team.logo || getTeamLogo(team.name, league, team.city)
    } : null
  , [team, league]);
}
