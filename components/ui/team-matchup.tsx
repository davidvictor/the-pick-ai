import { Shield } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

export interface TeamMatchupProps {
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
  size?: "default" | "large";
  showCity?: boolean;
}

export function TeamMatchup({ homeTeam, awayTeam, size = "default", showCity = true }: TeamMatchupProps) {
  // Determine sizes based on the size prop
  const avatarSize = size === "large" ? "h-8 w-8 md:h-12 md:w-12" : "h-8 w-8";
  const iconSize = size === "large" ? "h-8 w-8" : "h-6 w-6";
  const textSize = size === "large" ? "text-lg md:text-xl lg:text-xl xl:text-2xl" : "text-lg";
  const gapSize = size === "large" ? "gap-4" : "gap-3";
  const atSize = size === "large" ? "at-symbol-large" : "";

  return (
    <div className="flex items-center justify-between w-full relative">
      {/* Away Team */}
      <div className={`flex items-center ${gapSize}`}>
        <Avatar className={`${avatarSize} rounded-xs items-center justify-center`}>
          {awayTeam.logo ? (
            <img src={awayTeam.logo} alt={`${awayTeam.name} logo`} />
          ) : (
            <Shield className={iconSize} />
          )}
        </Avatar>
        <div>
          {showCity && awayTeam.city && (
            <div className="text-sm text-muted-foreground">{awayTeam.city}</div>
          )}
          <span className={`${textSize} font-medium`}>{awayTeam.name}</span>
        </div>
      </div>
      
      {/* @ Symbol */}
      <div className={`at-symbol ${atSize} ${textSize} font-medium text-muted-foreground`}>@</div>
      
      {/* Home Team */}
      <div className={`flex items-center ${gapSize}`}>
        <div className="text-right">
          {showCity && homeTeam.city && (
            <div className="text-sm text-muted-foreground">{homeTeam.city}</div>
          )}
          <span className={`${textSize} font-medium`}>{homeTeam.name}</span>
        </div>
        <Avatar className={`${avatarSize} rounded-xs items-center justify-center`}>
          {homeTeam.logo ? (
            <img src={homeTeam.logo} alt={`${homeTeam.name} logo`} />
          ) : (
            <Shield className={iconSize} />
          )}
        </Avatar>
      </div>
    </div>
  )
}
