import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  // Loading states
  isLoading: boolean
  isCreatingGame: boolean
  isUpdatingGame: boolean
  isEndingGame: boolean

  // Error states
  error: string | null
  gameError: string | null

  // Modal/Dialog states
  isNewGameModalOpen: boolean
  isGameOverModalOpen: boolean

  // Notification state
  notification: {
    message: string
    type: 'success' | 'error' | 'info'
    isVisible: boolean
  } | null

  // Actions
  setLoading: (loading: boolean) => void
  setCreatingGame: (creating: boolean) => void
  setUpdatingGame: (updating: boolean) => void
  setEndingGame: (ending: boolean) => void
  setError: (error: string | null) => void
  setGameError: (error: string | null) => void
  setNewGameModalOpen: (open: boolean) => void
  setGameOverModalOpen: (open: boolean) => void
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info'
  ) => void
  hideNotification: () => void
  clearErrors: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    set => ({
      // Initial state
      isLoading: false,
      isCreatingGame: false,
      isUpdatingGame: false,
      isEndingGame: false,
      error: null,
      gameError: null,
      isNewGameModalOpen: false,
      isGameOverModalOpen: false,
      notification: null,

      // Actions
      setLoading: loading => set({ isLoading: loading }),
      setCreatingGame: creating => set({ isCreatingGame: creating }),
      setUpdatingGame: updating => set({ isUpdatingGame: updating }),
      setEndingGame: ending => set({ isEndingGame: ending }),
      setError: error => set({ error }),
      setGameError: error => set({ gameError: error }),
      setNewGameModalOpen: open => set({ isNewGameModalOpen: open }),
      setGameOverModalOpen: open => set({ isGameOverModalOpen: open }),

      showNotification: (message, type) =>
        set({
          notification: { message, type, isVisible: true },
        }),

      hideNotification: () =>
        set({
          notification: null,
        }),

      clearErrors: () =>
        set({
          error: null,
          gameError: null,
        }),
    }),
    {
      name: 'ui-store',
    }
  )
)
