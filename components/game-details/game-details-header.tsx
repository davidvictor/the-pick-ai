import { getLeagueDisplayName } from "@/lib/utils";
import { League } from "@/services/api-types";
import { AppHeader } from "@/components/ui/app-header";

interface GameDetailsHeaderProps {
  league: League;
  gameTitle: string | null;
  isLoading: boolean;
  onBack: () => void;
}

export function GameDetailsHeader({ 
  league, 
  gameTitle, 
  isLoading, 
  onBack 
}: GameDetailsHeaderProps) {
  return (
    <AppHeader
      breadcrumbItems={[
        { href: "/leagues", label: "Leagues", className: "hidden md:block" },
        { href: `/leagues/${league}`, label: getLeagueDisplayName(league) },
        { 
          label: isLoading ? "Loading..." : gameTitle || "Game Details", 
          isCurrentPage: true 
        }
      ]}
      showBackButton={true}
      onBack={onBack}
    />
  );
}
