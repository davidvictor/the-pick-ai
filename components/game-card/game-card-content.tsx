import { Bet } from "@/lib/bet-types";
import { TeamMatchup } from "@/components/ui/team-matchup";
import { GameInfoSection } from "./game-info-section";
import { BestBetsSection } from "./best-bets-section";

interface GameCardContentProps {
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
  bestBets: Bet[];
  status: string;
  isOnBestBetsPage: boolean;
}

/**
 * Component for rendering the content of a game card
 */
export function GameCardContent({
  homeTeam,
  awayTeam,
  date,
  time,
  timezone,
  network,
  bestBets,
  status,
  isOnBestBetsPage
}: GameCardContentProps) {
  return (
    <div className="bg-background rounded-lg border shadow-sm hover:shadow-lg overflow-hidden flex flex-col">
      {/* Teams Header */}
      <div className="flex items-center justify-between p-4 overflow-hidden">
        <TeamMatchup homeTeam={homeTeam} awayTeam={awayTeam} />
      </div>
      
      {/* Game Info */}
      <GameInfoSection
        status={status}
        date={date}
        time={time}
        timezone={timezone}
        network={network}
      />
      
      {/* Best Bets */}
      <BestBetsSection 
        bestBets={bestBets} 
        isOnBestBetsPage={isOnBestBetsPage} 
      />
    </div>
  );
}
