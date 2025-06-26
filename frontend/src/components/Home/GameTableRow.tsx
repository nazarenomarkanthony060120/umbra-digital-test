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

interface GameTableRowProps {
  game: Game
  onGameClick: (gameId: string) => void
}

export default function GameTableRow({ game, onGameClick }: GameTableRowProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getGameSummary = () => {
    if (game.player1.wins > game.player2.wins) {
      return `${game.player1.name} Won`
    } else if (game.player2.wins > game.player1.wins) {
      return `${game.player2.name} Won`
    } else {
      return 'Tied Series'
    }
  }

  return (
    <tr
      className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onGameClick(game._id)}
    >
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{game.player1.name}</span>
          <span className="text-sm text-gray-600">vs {game.player2.name}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="font-medium text-gray-800">{getGameSummary()}</div>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-700">{game.totalRounds}</span>
      </td>
      <td className="py-4 px-4">
        <div className="text-sm">
          <div className="flex justify-between">
            <span className="text-green-600">W: {game.player1.wins}</span>
            <span className="text-green-600">W: {game.player2.wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600">L: {game.player1.losses}</span>
            <span className="text-red-600">L: {game.player2.losses}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">D: {game.player1.draws}</span>
            <span className="text-gray-600">D: {game.player2.draws}</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        {formatDate(game.createdAt)}
      </td>
      <td className="py-4 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            game.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {game.isActive ? 'Active' : 'Completed'}
        </span>
      </td>
    </tr>
  )
}
