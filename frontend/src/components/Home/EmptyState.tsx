interface EmptyStateProps {
  onStartNewGame: () => void
}

export default function EmptyState({ onStartNewGame }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🎯</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No games yet!
      </h3>
      <p className="text-gray-500 mb-4">
        Start your first game to see it here.
      </p>
      <button
        onClick={onStartNewGame}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Start Playing
      </button>
    </div>
  )
}
