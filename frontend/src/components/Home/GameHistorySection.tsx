import GameHistoryHeader from './GameHistoryHeader'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'
import GameTable from './GameTable'

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

interface GameHistorySectionProps {
  games: Game[]
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  onStartNewGame: () => void
  onGameClick: (gameId: string) => void
}

export default function GameHistorySection({
  games,
  isLoading,
  error,
  onRetry,
  onStartNewGame,
  onGameClick,
}: GameHistorySectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <GameHistoryHeader gameCount={games.length} isLoading={isLoading} />

      {/* Loading State */}
      {isLoading && <LoadingState />}

      {/* Error State */}
      {error && <ErrorState error={error} onRetry={onRetry} />}

      {/* Empty State */}
      {!isLoading && !error && games.length === 0 && (
        <EmptyState onStartNewGame={onStartNewGame} />
      )}

      {/* Games Table */}
      {!isLoading && !error && games.length > 0 && (
        <GameTable games={games} onGameClick={onGameClick} />
      )}
    </div>
  )
}
