import { GameCardSkeleton } from "./game-card-skeleton"

export function GameCardGridSkeleton() {
  // Display 6 skeleton cards by default
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4">
      {Array(6).fill(0).map((_, index) => (
        <GameCardSkeleton key={index} />
      ))}
    </div>
  )
}
