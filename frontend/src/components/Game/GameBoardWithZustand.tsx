'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGame, useUpdateGameRound, useEndGame } from '@/hooks/useGames'
import { useGameStore, useUIStore, useUserStore } from '@/stores'
import {
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
import GameActions from './GameActions'
import ErrorMessages from './ErrorMessages'
import RoundCounter from './RoundCounter'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'

interface GameBoardProps {
  gameId: string
}

export default function GameBoardWithZustand({ gameId }: GameBoardProps) {
  const router = useRouter()

  const {
    board,
    currentPlayer,
    isGameOver: gameOver,
    winner,
    winningCells,
    player1Name,
    player2Name,
    setBoard,
    setCurrentPlayer,
    setGameOver,
    setPlayers,
    resetBoard,
  } = useGameStore()

  const {
    isUpdatingGame,
    isEndingGame,
    gameError,
    setUpdatingGame,
    setEndingGame,
    setGameError,
    showNotification,
  } = useUIStore()

  const { addRecentPlayer, updateStats } = useUserStore()

  const { data: game, isLoading, error, refetch } = useGame(gameId)
  const updateGameRoundMutation = useUpdateGameRound()
  const endGameMutation = useEndGame()

  useEffect(() => {
    if (game) {
      setPlayers(game.player1.name, game.player2.name)
      addRecentPlayer(game.player1.name)
      addRecentPlayer(game.player2.name)
    }
  }, [game, setPlayers, addRecentPlayer])

  const handleCellClick = async (index: number) => {
    if (gameOver || !game) return

    try {
      const newBoard = makeMove(board, index, currentPlayer)
      setBoard(newBoard)

      const gameWinner = checkWinner(newBoard)
      const isOver = isGameOver(newBoard)

      if (isOver) {
        let cells: number[] = []

        if (gameWinner) {
          for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination
            if (
              newBoard[a] &&
              newBoard[a] === newBoard[b] &&
              newBoard[a] === newBoard[c]
            ) {
              cells = combination
              break
            }
          }
        }

        setGameOver(true, gameWinner, cells)

        const result = getGameResult(newBoard)
        if (result) {
          setUpdatingGame(true)
          updateGameRoundMutation.mutate(
            { gameId, winner: result },
            {
              onSuccess: () => {
                setUpdatingGame(false)
                showNotification('Round updated!', 'success')

                if (result === 'player1') {
                  updateStats('win')
                } else if (result === 'player2') {
                  updateStats('loss')
                } else {
                  updateStats('draw')
                }
              },
              onError: error => {
                setUpdatingGame(false)
                setGameError(error.message)
              },
            }
          )
        }
      } else {
        setCurrentPlayer(getNextPlayer(currentPlayer))
      }
    } catch (err) {
      console.error('Error making move:', err)
      setGameError('Failed to make move')
    }
  }

  const handleNewRound = () => {
    resetBoard()
    showNotification('New round started!', 'info')
  }

  const handleEndGame = () => {
    setEndingGame(true)
    endGameMutation.mutate(gameId, {
      onSuccess: () => {
        setEndingGame(false)
        showNotification('Game ended successfully!', 'success')
        router.push('/')
      },
      onError: error => {
        setEndingGame(false)
        setGameError(error.message)
      },
    })
  }

  const getWinnerName = () => {
    if (!game || !winner) return null
    return winner === 'X' ? game.player1.name : game.player2.name
  }

  const getCurrentPlayerName = () => {
    if (!game) return ''
    return currentPlayer === 'X' ? game.player1.name : game.player2.name
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !game) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  const isMutating = isUpdatingGame || isEndingGame

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          player1Name={game.player1.name}
          player2Name={game.player2.name}
        />

        <PlayerStats player1={game.player1} player2={game.player2} />

        <GameStatus
          isGameOver={gameOver}
          winner={winner}
          winnerName={getWinnerName()}
          currentPlayer={currentPlayer}
          currentPlayerName={getCurrentPlayerName()}
        />

        <div className="mb-8">
          <TicTacToeBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={gameOver || isMutating}
            winningCells={winningCells}
          />
        </div>

        <GameActions
          isGameOver={gameOver}
          onNewRound={handleNewRound}
          onEndGame={handleEndGame}
          isMutating={isMutating}
          isEndingGame={isEndingGame}
        />

        <ErrorMessages
          updateError={gameError ? new Error(gameError) : null}
          endGameError={endGameMutation.error}
        />

        <RoundCounter totalRounds={game.totalRounds} />
      </div>
    </div>
  )
}
