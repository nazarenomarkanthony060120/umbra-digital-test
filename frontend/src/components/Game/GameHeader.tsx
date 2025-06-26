interface GameHeaderProps {
  player1Name: string
  player2Name: string
}

export default function GameHeader({
  player1Name,
  player2Name,
}: GameHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">🎮 Tic-Tac-Toe</h1>
      <div className="text-lg text-gray-600">
        {player1Name} (X) vs {player2Name} (O)
      </div>
    </div>
  )
}
