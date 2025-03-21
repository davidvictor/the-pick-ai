import { getTeamLogo } from "@/lib/team-utils"
import { useCurrentLeague } from "@/services/game-service-context"
import { League } from "@/services/api-types"
import { Bet } from "@/lib/bet-types"
import { GameCardWrapper } from "./game-card-wrapper"
import { GameCardContent } from "./game-card-content"

/**
 * Props for the GameCard component
 */
export interface GameCardProps {
  id?: string;
  homeTeam: {
    name: string;
    city?: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    city?: string;
    logo?: string;
  };
  date: string;
  time: string;
  timezone: string;
  network: string;
  spread: {
    value: number;
    team: string;
  };
  overUnder: number;
  moneyLine: number;
  bestBets: Bet[];
  status?: string;
}

/**
 * GameCard component that displays information about a game
 * Refactored to use smaller, focused components
 */
export function GameCard({
  id,
  homeTeam,
  awayTeam,
  date,
  time,
  timezone,
  network,
  spread,
  overUnder,
  moneyLine,
  bestBets,
  status = "Upcoming",
}: GameCardProps) {
  // Get the current league and page context
  const { currentLeague, isOnBestBetsPage } = useCurrentLeague();
  
  // Get team logos with the current league
  const homeTeamWithLogo = {
    ...homeTeam,
    logo: homeTeam.logo || getTeamLogo(homeTeam.name, currentLeague as League, homeTeam.city)
  };
  
  const awayTeamWithLogo = {
    ...awayTeam,
    logo: awayTeam.logo || getTeamLogo(awayTeam.name, currentLeague as League, awayTeam.city)
  };

  return (
    <GameCardWrapper
      isClickable={!isOnBestBetsPage}
      gameId={id}
      leaguePath={currentLeague}
    >
      <GameCardContent
        homeTeam={homeTeamWithLogo}
        awayTeam={awayTeamWithLogo}
        date={date}
        time={time}
        timezone={timezone}
        network={network}
        bestBets={bestBets}
        status={status}
        isOnBestBetsPage={isOnBestBetsPage}
      />
    </GameCardWrapper>
  );
}
