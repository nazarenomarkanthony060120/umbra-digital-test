"use client";

import { useRouter } from "next/navigation";
import { useGames } from "@/hooks/useGames";

export default function Home() {
  const router = useRouter();
  const { data: games = [], isLoading, error, refetch } = useGames();

  const handleStartNewGame = () => {
    router.push("/new-game");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGameSummary = (game: any) => {
    if (game.player1.wins > game.player2.wins) {
      return `${game.player1.name} Won`;
    } else if (game.player2.wins > game.player1.wins) {
      return `${game.player2.name} Won`;
    } else {
      return "Tied Series";
    }
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎮 Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to the ultimate Tic-Tac-Toe experience!
          </p>
          <button
            onClick={handleStartNewGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 transform hover:scale-105"
          >
            🚀 Start New Game
          </button>
        </div>

        {/* Game History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            📊 Game History
            {!isLoading && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({games.length} games)
              </span>
            )}
          </h2>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">Loading games...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700 font-medium mb-2">
                  Failed to load games
                </p>
                <p className="text-red-600 text-sm">
                  {error instanceof Error ? error.message : "An error occurred"}
                </p>
              </div>
              <button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && games.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No games yet!
              </h3>
              <p className="text-gray-500 mb-4">
                Start your first game to see it here.
              </p>
              <button
                onClick={handleStartNewGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Start Playing
              </button>
            </div>
          )}

          {/* Games Table */}
          {!isLoading && !error && games.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Players
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Result
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Rounds
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Score
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game._id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">
                            {game.player1.name}
                          </span>
                          <span className="text-sm text-gray-600">
                            vs {game.player2.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-800">
                          {getGameSummary(game)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-700">
                          {game.totalRounds}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span className="text-green-600">
                              W: {game.player1.wins}
                            </span>
                            <span className="text-green-600">
                              W: {game.player2.wins}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-600">
                              L: {game.player1.losses}
                            </span>
                            <span className="text-red-600">
                              L: {game.player2.losses}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              D: {game.player1.draws}
                            </span>
                            <span className="text-gray-600">
                              D: {game.player2.draws}
                            </span>
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
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {game.isActive ? "Active" : "Completed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
