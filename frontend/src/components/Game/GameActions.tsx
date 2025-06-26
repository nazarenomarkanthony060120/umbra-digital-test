interface GameActionsProps {
  isGameOver: boolean
  onNewRound: () => void
  onEndGame: () => void
  isMutating: boolean
  isEndingGame: boolean
}

export default function GameActions({
  isGameOver,
  onNewRound,
  onEndGame,
  isMutating,
  isEndingGame,
}: GameActionsProps) {
  if (!isGameOver) return null

  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={onNewRound}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        disabled={isMutating}
      >
        🎮 Continue (New Round)
      </button>
      <button
        onClick={onEndGame}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        disabled={isMutating}
      >
        {isEndingGame ? (
          <>
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            Ending Game...
          </>
        ) : (
          <>🏁 Stop & Save Game</>
        )}
      </button>
    </div>
  )
}
