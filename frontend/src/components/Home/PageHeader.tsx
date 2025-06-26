interface PageHeaderProps {
  onStartNewGame: () => void
}

export default function PageHeader({ onStartNewGame }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🎮 Tic-Tac-Toe</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the ultimate Tic-Tac-Toe experience!
      </p>
      <button
        onClick={onStartNewGame}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 transform hover:scale-105"
      >
        🚀 Start New Game
      </button>
    </div>
  )
}
