import GameTableHeader from './GameTableHeader'
import GameTableRow from './GameTableRow'

interface Game {
  _id: string
  player1: {
    name: string
    wins: number
    losses: number
    draws: number
  }
  player2: {
    name: string
    wins: number
    losses: number
    draws: number
  }
  totalRounds: number
  isActive: boolean
  createdAt: string
}

interface GameTableProps {
  games: Game[]
  onGameClick: (gameId: string) => void
}

export default function GameTable({ games, onGameClick }: GameTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <GameTableHeader />
        <tbody>
          {games.map(game => (
            <GameTableRow
              key={game._id}
              game={game}
              onGameClick={onGameClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
