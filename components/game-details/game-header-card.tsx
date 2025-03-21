import { TeamMatchup } from "@/components/ui/team-matchup";
import { MapPin, Tv, Calendar, Clock } from "lucide-react";
import { GameStatusBadge } from "@/components/ui/game-status-badge";
import { WeatherIcon, WeatherType } from "@/components/ui/weather-icon";

interface GameHeaderCardProps {
  // Team props
  homeTeam: { name: string; logo?: string } | null;
  awayTeam: { name: string; logo?: string } | null;
  
  // Game info props
  date: string;
  time: string;
  timezone: string;
  network: string;
  stadium: string;
  location: string;
  weather: {
    temperature: string;
    conditions: string;
    wind: string;
    type: string;
  };
  status: string;
}

export function GameHeaderCard({
  // Team props
  homeTeam,
  awayTeam,
  
  // Game info props
  date,
  time,
  timezone,
  network,
  stadium,
  location,
  weather,
  status
}: GameHeaderCardProps) {
  return (
    <div className="bg-background rounded-lg border mb-6">
      {/* Team Matchup */}
      <div className="flex items-center justify-center p-4 md:p-6 overflow-hidden border-b">
        {homeTeam && awayTeam && (
          <TeamMatchup 
            homeTeam={homeTeam} 
            awayTeam={awayTeam}
            size="large"
          />
        )}
      </div>
      
      {/* Separator Line */}
      {/* <div className="border-t my-4"></div> */}
      
      {/* Game Details - Horizontal on desktop, vertical on mobile */}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:flex lg:flex-wrap pt-1 p-4 md:p-6">
        
        {/* Date */}
        <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
          <div className="sr-only">Game Date</div>
          <Calendar className="h-4 w-4 mr-2" />
          <div>{date}</div>
        </div>
        
        {/* Time */}
        <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
          <div className="sr-only">Game Time</div>
          <Clock className="h-4 w-4 mr-2" />
          <div>{time} {timezone}</div>
        </div>
        
         {/* Network */}
        <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
          <span className="sr-only">TV Network</span>
          <Tv className="h-4 w-4 mr-2" />
          <span>{network}</span>
        </div>
        
        {/* Stadium and Location */}
        <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
          <span className="sr-only">Stadium</span>
          <MapPin className="h-4 w-4 mr-2" />
          <span className="font-medium mr-2">{stadium}</span>
          <span className="text-muted-foreground ml-1 sr-only sm:not-sr-only">{location}</span>
        </div>
        
        {/* Weather */}
        <div className="flex flex-auto items-center mb-2 lg:mb-1 xl:mb-0">
          <div className="sr-only">Weather</div>
          <WeatherIcon type={weather.type as WeatherType} size={20} className="mr-2 text-primary" />
          <span className="font-medium mr-2">{weather.temperature}</span>
          <span className="text-muted-foreground mr-2">{weather.conditions}</span>
          <span className="text-muted-foreground">{weather.wind}</span>
        </div>
        
        {/* Game Status */}
        <div className="flex flex-auto items-center justify-start xl:justify-end">
          <div className="sr-only">Game Status</div>
          <GameStatusBadge status={status} />
        </div>
      
      </div>
    </div>
  );
}
