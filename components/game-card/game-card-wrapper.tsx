import Link from "next/link";
import { ReactNode } from "react";

interface GameCardWrapperProps {
  children: ReactNode;
  isClickable: boolean;
  gameId?: string;
  leaguePath?: string;
}

/**
 * Wrapper component that conditionally renders either a Link or a div
 * based on whether the card should be clickable
 */
export function GameCardWrapper({ 
  children, 
  isClickable, 
  gameId, 
  leaguePath 
}: GameCardWrapperProps) {
  if (!isClickable) {
    return (
      <div className="block">
        {children}
      </div>
    );
  }

  return (
    <Link 
      href={gameId && leaguePath ? `/leagues/${leaguePath}/games/${gameId}` : "#"} 
      className="block transition-transform hover:scale-[1.02]"
    >
      {children}
    </Link>
  );
}
