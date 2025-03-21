import { Tv } from "lucide-react";
import { GameStatusBadge } from "@/components/ui/game-status-badge";

interface GameInfoSectionProps {
  status: string;
  date: string;
  time: string;
  timezone: string;
  network: string;
}

/**
 * Component for rendering game information including date, time, network, and status
 */
export function GameInfoSection({
  status,
  date,
  time,
  timezone,
  network
}: GameInfoSectionProps) {
  const isLiveOrFinal = status === "Live" || status === "Final";

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      {isLiveOrFinal ? (
        <div className="flex items-center">
          <GameStatusBadge status={status} />
        </div>
      ) : (
        <>
          <div className="text-sm">{date}</div>
          <div className="text-sm">{time} {timezone}</div>
        </>
      )}
      <div className="flex items-center gap-2">
        <Tv className="h-4 w-4" />
        <span className="text-sm">{network}</span>
      </div>
    </div>
  );
}
