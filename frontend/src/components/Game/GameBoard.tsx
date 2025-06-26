'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGame, useUpdateGameRound, useEndGame } from '@/hooks/useGames'
import {
  createEmptyBoard,
  makeMove,
  checkWinner,
  isGameOver,
  getGameResult,
  getNextPlayer,
  WINNING_COMBINATIONS,
} from '@/utils/gameLogic'
import TicTacToeBoard from '@/components/TicTacToeBoard'
import GameHeader from './GameHeader'
import PlayerStats from './PlayerStats'
import GameStatus from './GameStatus'
import ErrorMessages from './ErrorMessages'
import RoundCounter from './RoundCounter'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import GameActions from './GameActions'

interface GameBoardProps {
  gameId: string
}

export default function GameBoard({ gameId }: GameBoardProps) {
  const router = useRouter()

  const { data: game, isLoading, error, refetch } = useGame(gameId)
  const updateGameRoundMutation = useUpdateGameRound()
  const endGameMutation = useEndGame()

  const [board, setBoard] = useState<(string | null)[]>(createEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [gameOverState, setGameOverState] = useState<{
    isOver: boolean
    winner: string | null
    winningCells: number[]
  }>({
    isOver: false,
    winner: null,
    winningCells: [],
  })

  const handleCellClick = async (index: number) => {
    if (gameOverState.isOver || !game) return

    try {
      const newBoard = makeMove(board, index, currentPlayer)
      setBoard(newBoard)

      const winner = checkWinner(newBoard)
      const isOver = isGameOver(newBoard)

      if (isOver) {
        let winningCells: number[] = []

        if (winner) {
          for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination
            if (
              newBoard[a] &&
              newBoard[a] === newBoard[b] &&
              newBoard[a] === newBoard[c]
            ) {
              winningCells = combination
              break
            }
          }
        }

        setGameOverState({
          isOver: true,
          winner,
          winningCells,
        })

        // Update game in backend
        const result = getGameResult(newBoard)
        if (result) {
          updateGameRoundMutation.mutate({ gameId, winner: result })
        }
      } else {
        setCurrentPlayer(getNextPlayer(currentPlayer))
      }
    } catch (err) {
      console.error('Error making move:', err)
    }
  }

  const handleNewRound = () => {
    setBoard(createEmptyBoard())
    setCurrentPlayer('X')
    setGameOverState({
      isOver: false,
      winner: null,
      winningCells: [],
    })
  }

  const handleEndGame = () => {
    endGameMutation.mutate(gameId, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  const getWinnerName = () => {
    if (!game || !gameOverState.winner) return null

    if (gameOverState.winner === 'X') {
      return game.player1.name
    } else if (gameOverState.winner === 'O') {
      return game.player2.name
    }
    return null
  }

  const getCurrentPlayerName = () => {
    if (!game) return ''
    return currentPlayer === 'X' ? game.player1.name : game.player2.name
  }

  // Loading state
  if (isLoading) {
    return <LoadingState />
  }

  // Error state
  if (error || !game) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  // Check if mutations are in progress
  const isMutating =
    updateGameRoundMutation.isPending || endGameMutation.isPending

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          player1Name={game.player1.name}
          player2Name={game.player2.name}
        />

        <PlayerStats player1={game.player1} player2={game.player2} />

        <GameStatus
          isGameOver={gameOverState.isOver}
          winner={gameOverState.winner}
          winnerName={getWinnerName()}
          currentPlayer={currentPlayer}
          currentPlayerName={getCurrentPlayerName()}
        />

        {/* Game Board */}
        <div className="mb-8">
          <TicTacToeBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={gameOverState.isOver || isMutating}
            winningCells={gameOverState.winningCells}
          />
        </div>

        <GameActions
          isGameOver={gameOverState.isOver}
          onNewRound={handleNewRound}
          onEndGame={handleEndGame}
          isMutating={isMutating}
          isEndingGame={endGameMutation.isPending}
        />

        <ErrorMessages
          updateError={updateGameRoundMutation.error}
          endGameError={endGameMutation.error}
        />

        <RoundCounter totalRounds={game.totalRounds} />
      </div>
    </div>
  )
}
