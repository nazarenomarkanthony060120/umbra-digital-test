"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Game } from "@/types/game";
import { gameApi } from "@/lib/api";
import {
  createEmptyBoard,
  makeMove,
  checkWinner,
  isGameOver,
  getGameResult,
  getNextPlayer,
  WINNING_COMBINATIONS,
} from "@/utils/gameLogic";
import TicTacToeBoard from "@/components/TicTacToeBoard";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;

  const [game, setGame] = useState<Game | null>(null);
  const [board, setBoard] = useState<(string | null)[]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameOverState, setGameOverState] = useState<{
    isOver: boolean;
    winner: string | null;
    winningCells: number[];
  }>({
    isOver: false,
    winner: null,
    winningCells: [],
  });
  const [loading, setLoading] = useState(true);
  const [updatingGame, setUpdatingGame] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameId) {
      loadGame();
    }
  }, [gameId]);

  const loadGame = async () => {
    try {
      setLoading(true);
      const gameData = await gameApi.getGame(gameId);
      setGame(gameData);
      setError(null);
    } catch (err) {
      setError("Failed to load game. Please try again.");
      console.error("Error loading game:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = async (index: number) => {
    if (gameOverState.isOver || !game) return;

    try {
      const newBoard = makeMove(board, index, currentPlayer);
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      const isOver = isGameOver(newBoard);

      if (isOver) {
        let winningCells: number[] = [];

        if (winner) {
          // Find winning cells
          for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (
              newBoard[a] &&
              newBoard[a] === newBoard[b] &&
              newBoard[a] === newBoard[c]
            ) {
              winningCells = combination;
              break;
            }
          }
        }

        setGameOverState({
          isOver: true,
          winner,
          winningCells,
        });

        // Update game in backend
        await updateGameResult(newBoard);
      } else {
        setCurrentPlayer(getNextPlayer(currentPlayer));
      }
    } catch (err) {
      console.error("Error making move:", err);
    }
  };

  const updateGameResult = async (finalBoard: (string | null)[]) => {
    if (!game) return;

    try {
      setUpdatingGame(true);
      const result = getGameResult(finalBoard);

      if (result) {
        const updatedGame = await gameApi.updateGameRound(gameId, result);
        setGame(updatedGame);
      }
    } catch (err) {
      console.error("Error updating game result:", err);
    } finally {
      setUpdatingGame(false);
    }
  };

  const handleNewRound = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setGameOverState({
      isOver: false,
      winner: null,
      winningCells: [],
    });
  };

  const handleEndGame = async () => {
    if (!game) return;

    try {
      setUpdatingGame(true);
      await gameApi.endGame(gameId);
      router.push("/");
    } catch (err) {
      console.error("Error ending game:", err);
      setError("Failed to end game. Please try again.");
    } finally {
      setUpdatingGame(false);
    }
  };

  const getWinnerName = () => {
    if (!game || !gameOverState.winner) return null;

    if (gameOverState.winner === "X") {
      return game.player1.name;
    } else if (gameOverState.winner === "O") {
      return game.player2.name;
    }
    return null;
  };

  const getCurrentPlayerName = () => {
    if (!game) return "";
    return currentPlayer === "X" ? game.player1.name : game.player2.name;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Game Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The game you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎮 Tic-Tac-Toe
          </h1>
          <div className="text-lg text-gray-600">
            {game.player1.name} (X) vs {game.player2.name} (O)
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <h3 className="font-semibold text-gray-800">{game.player1.name}</h3>
            <div className="text-2xl font-bold text-blue-600">❌</div>
            <div className="text-sm text-gray-600">
              W: {game.player1.wins} | L: {game.player1.losses} | D:{" "}
              {game.player1.draws}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <h3 className="font-semibold text-gray-800">{game.player2.name}</h3>
            <div className="text-2xl font-bold text-red-600">⭕</div>
            <div className="text-sm text-gray-600">
              W: {game.player2.wins} | L: {game.player2.losses} | D:{" "}
              {game.player2.draws}
            </div>
          </div>
        </div>

        {/* Current Turn or Game Over Status */}
        <div className="text-center mb-6">
          {gameOverState.isOver ? (
            <div className="bg-white rounded-lg p-4 shadow-md inline-block">
              {gameOverState.winner ? (
                <div>
                  <div className="text-2xl mb-2">🎉</div>
                  <div className="text-xl font-bold text-green-600">
                    {getWinnerName()} Wins!
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-2">🤝</div>
                  <div className="text-xl font-bold text-gray-600">
                    It's a Draw!
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 shadow-md inline-block">
              <div className="text-lg">
                <span className="font-semibold">
                  {getCurrentPlayerName()}'s
                </span>{" "}
                turn
                <span className="ml-2 text-2xl">
                  {currentPlayer === "X" ? "❌" : "⭕"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="mb-8">
          <TicTacToeBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={gameOverState.isOver}
            winningCells={gameOverState.winningCells}
          />
        </div>

        {/* Action Buttons */}
        {gameOverState.isOver && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleNewRound}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              disabled={updatingGame}
            >
              🎮 Continue (New Round)
            </button>
            <button
              onClick={handleEndGame}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              disabled={updatingGame}
            >
              {updatingGame ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Ending Game...
                </>
              ) : (
                <>🏁 Stop & Save Game</>
              )}
            </button>
          </div>
        )}

        {/* Round Counter */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-lg p-3 inline-block shadow-md">
            <span className="text-gray-600">Round: </span>
            <span className="font-bold">{game.totalRounds + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
