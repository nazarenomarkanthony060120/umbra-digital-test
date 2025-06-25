"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gameApi } from "@/lib/api";

export default function NewGame() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!player1Name.trim() || !player2Name.trim()) {
      setError("Both player names are required");
      return;
    }

    if (player1Name.trim() === player2Name.trim()) {
      setError("Players must have different names");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const game = await gameApi.createGame({
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim(),
      });

      router.push(`/game/${game._id}`);
    } catch (err) {
      setError("Failed to create game. Please try again.");
      console.error("Error creating game:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🎮 New Game
            </h1>
            <p className="text-gray-600">Enter player names to start playing</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Player 1 Input */}
            <div>
              <label
                htmlFor="player1"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Player 1 (X)
              </label>
              <input
                type="text"
                id="player1"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter Player 1 name"
                maxLength={20}
                disabled={loading}
              />
            </div>

            {/* Player 2 Input */}
            <div>
              <label
                htmlFor="player2"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Player 2 (O)
              </label>
              <input
                type="text"
                id="player2"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter Player 2 name"
                maxLength={20}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading || !player1Name.trim() || !player2Name.trim()}
              >
                {loading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  "🚀 Start Game"
                )}
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">How to play:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Player 1 plays as X, Player 2 plays as O</li>
              <li>• Take turns placing your symbol on the grid</li>
              <li>• First to get 3 in a row wins!</li>
              <li>• Play multiple rounds and track your wins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
