import { GameCard, GameCardProps } from "./game-card"

export interface GameCardGridProps {
  games: GameCardProps[]
}

export function GameCardGrid({ games }: GameCardGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4">
      {games.map((game, index) => (
        <GameCard key={index} {...game} />
      ))}
    </div>
  )
}
