import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  // User preferences
  theme: 'light' | 'dark' | 'system'
  soundEnabled: boolean
  animationsEnabled: boolean
  autoSave: boolean

  // Recent players (for quick access)
  recentPlayers: string[]
  favoriteOpponent: string | null

  // Game statistics
  totalGamesPlayed: number
  totalWins: number
  totalLosses: number
  totalDraws: number

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setSoundEnabled: (enabled: boolean) => void
  setAnimationsEnabled: (enabled: boolean) => void
  setAutoSave: (enabled: boolean) => void
  addRecentPlayer: (playerName: string) => void
  setFavoriteOpponent: (playerName: string | null) => void
  updateStats: (result: 'win' | 'loss' | 'draw') => void
  resetStats: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        theme: 'system',
        soundEnabled: true,
        animationsEnabled: true,
        autoSave: true,
        recentPlayers: [],
        favoriteOpponent: null,
        totalGamesPlayed: 0,
        totalWins: 0,
        totalLosses: 0,
        totalDraws: 0,

        // Actions
        setTheme: theme => set({ theme }),
        setSoundEnabled: enabled => set({ soundEnabled: enabled }),
        setAnimationsEnabled: enabled => set({ animationsEnabled: enabled }),
        setAutoSave: enabled => set({ autoSave: enabled }),

        addRecentPlayer: playerName => {
          const { recentPlayers } = get()
          const filtered = recentPlayers.filter(name => name !== playerName)
          const updated = [playerName, ...filtered].slice(0, 5) // Keep only 5 recent
          set({ recentPlayers: updated })
        },

        setFavoriteOpponent: playerName =>
          set({ favoriteOpponent: playerName }),

        updateStats: result => {
          const current = get()
          const updates = {
            totalGamesPlayed: current.totalGamesPlayed + 1,
            totalWins:
              result === 'win' ? current.totalWins + 1 : current.totalWins,
            totalLosses:
              result === 'loss' ? current.totalLosses + 1 : current.totalLosses,
            totalDraws:
              result === 'draw' ? current.totalDraws + 1 : current.totalDraws,
          }
          set(updates)
        },

        resetStats: () =>
          set({
            totalGamesPlayed: 0,
            totalWins: 0,
            totalLosses: 0,
            totalDraws: 0,
          }),
      }),
      {
        name: 'user-preferences',
      }
    ),
    {
      name: 'user-store',
    }
  )
)
