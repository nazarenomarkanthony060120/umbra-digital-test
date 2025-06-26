import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GameState {
  // Current game board
  board: (string | null)[]
  currentPlayer: 'X' | 'O'
  gameId: string | null
  isGameOver: boolean
  winner: string | null
  winningCells: number[]

  // Game session data
  player1Name: string
  player2Name: string

  // Actions
  setBoard: (board: (string | null)[]) => void
  setCurrentPlayer: (player: 'X' | 'O') => void
  setGameId: (id: string) => void
  setGameOver: (
    isOver: boolean,
    winner?: string | null,
    winningCells?: number[]
  ) => void
  setPlayers: (player1: string, player2: string) => void
  resetGame: () => void
  resetBoard: () => void
}

const initialBoard = Array(9).fill(null)

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, _) => ({
        // Initial state
        board: initialBoard,
        currentPlayer: 'X',
        gameId: null,
        isGameOver: false,
        winner: null,
        winningCells: [],
        player1Name: '',
        player2Name: '',

        // Actions
        setBoard: board => set({ board }),

        setCurrentPlayer: player => set({ currentPlayer: player }),

        setGameId: id => set({ gameId: id }),

        setGameOver: (isOver, winner = null, winningCells = []) =>
          set({ isGameOver: isOver, winner, winningCells }),

        setPlayers: (player1, player2) =>
          set({ player1Name: player1, player2Name: player2 }),

        resetGame: () =>
          set({
            board: initialBoard,
            currentPlayer: 'X',
            gameId: null,
            isGameOver: false,
            winner: null,
            winningCells: [],
            player1Name: '',
            player2Name: '',
          }),

        resetBoard: () =>
          set({
            board: initialBoard,
            currentPlayer: 'X',
            isGameOver: false,
            winner: null,
            winningCells: [],
          }),
      }),
      {
        name: 'game-storage', // localStorage key
        partialize: state => ({
          // Only persist essential game data
          gameId: state.gameId,
          player1Name: state.player1Name,
          player2Name: state.player2Name,
        }),
      }
    ),
    {
      name: 'game-store', // DevTools name
    }
  )
)
