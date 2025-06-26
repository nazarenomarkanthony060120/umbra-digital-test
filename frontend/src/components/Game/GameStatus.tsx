interface GameStatusProps {
  isGameOver: boolean
  winner: string | null
  winnerName: string | null
  currentPlayer: 'X' | 'O'
  currentPlayerName: string
}

export default function GameStatus({
  isGameOver,
  winner,
  winnerName,
  currentPlayer,
  currentPlayerName,
}: GameStatusProps) {
  return (
    <div className="text-center mb-6">
      {isGameOver ? (
        <div className="bg-white rounded-lg p-4 shadow-md inline-block">
          {winner ? (
            <div>
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-xl font-bold text-green-600">
                {winnerName} Wins!
              </div>
            </div>
          ) : (
            <div>
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-xl font-bold text-gray-600">
                It&apos;s a Draw!
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow-md inline-block">
          <div className="text-lg">
            <span className="font-semibold">{currentPlayerName}&apos;s</span>{' '}
            turn
            <span className="ml-2 text-2xl">
              {currentPlayer === 'X' ? '❌' : '⭕'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
