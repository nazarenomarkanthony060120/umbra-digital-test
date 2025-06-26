interface Player {
  name: string
  wins: number
  losses: number
  draws: number
}

interface PlayerStatsProps {
  player1: Player
  player2: Player
}

export default function PlayerStats({ player1, player2 }: PlayerStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
      <div className="bg-white rounded-lg p-4 text-center shadow-md">
        <h3 className="font-semibold text-gray-800">{player1.name}</h3>
        <div className="text-2xl font-bold text-blue-600">❌</div>
        <div className="text-sm text-gray-600">
          W: {player1.wins} | L: {player1.losses} | D: {player1.draws}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center shadow-md">
        <h3 className="font-semibold text-gray-800">{player2.name}</h3>
        <div className="text-2xl font-bold text-red-600">⭕</div>
        <div className="text-sm text-gray-600">
          W: {player2.wins} | L: {player2.losses} | D: {player2.draws}
        </div>
      </div>
    </div>
  )
}
