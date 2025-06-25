"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateGame } from "@/hooks/useGames";

export default function NewGame() {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  const createGameMutation = useCreateGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset validation error
    setValidationError(null);

    // Client-side validation
    if (!player1Name.trim() || !player2Name.trim()) {
      setValidationError("Both player names are required");
      return;
    }

    if (player1Name.trim() === player2Name.trim()) {
      setValidationError("Players must have different names");
      return;
    }

    // Create the game using React Query mutation
    createGameMutation.mutate(
      {
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim(),
      },
      {
        onSuccess: (game) => {
          // Navigate to the game page
          router.push(`/game/${game._id}`);
        },
        onError: (error) => {
          setValidationError(
            error instanceof Error
              ? error.message
              : "Failed to create game. Please try again."
          );
        },
      }
    );
  };

  const handleCancel = () => {
    router.push("/");
  };

  // Get error message (validation or mutation error)
  const errorMessage =
    validationError ||
    (createGameMutation.error instanceof Error
      ? createGameMutation.error.message
      : null);

  const isLoading = createGameMutation.isPending;
  const isFormDisabled =
    isLoading || !player1Name.trim() || !player2Name.trim();

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
                disabled={isLoading}
                required
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
                disabled={isLoading}
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Success Message (while navigating) */}
            {createGameMutation.isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 text-sm">
                  Game created! Redirecting...
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isFormDisabled}
              >
                {isLoading ? (
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
