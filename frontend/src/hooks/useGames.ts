import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gameApi } from '@/lib/api'
import { NewGameData, GameResult } from '@/types/game'

// Query keys for consistent cache management
export const QUERY_KEYS = {
  games: ['games'] as const,
  game: (id: string) => ['games', id] as const,
  health: ['health'] as const,
} as const

// Get all games
export const useGames = () => {
  return useQuery({
    queryKey: QUERY_KEYS.games,
    queryFn: gameApi.getAllGames,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Get single game
export const useGame = (gameId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.game(gameId),
    queryFn: () => gameApi.getGame(gameId),
    enabled: !!gameId && gameId !== 'undefined',
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  })
}

// Create new game mutation
export const useCreateGame = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (gameData: NewGameData) => gameApi.createGame(gameData),
    onSuccess: newGame => {
      // Invalidate and refetch games list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.games })

      // Add the new game to the cache
      queryClient.setQueryData(QUERY_KEYS.game(newGame._id), newGame)
    },
    onError: error => {
      console.error('Failed to create game:', error)
    },
  })
}

// Update game round mutation
export const useUpdateGameRound = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ gameId, winner }: { gameId: string; winner: GameResult }) =>
      gameApi.updateGameRound(gameId, winner),
    onSuccess: (updatedGame, { gameId }) => {
      // Update the specific game in cache
      queryClient.setQueryData(QUERY_KEYS.game(gameId), updatedGame)

      // Invalidate games list to reflect updated stats
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.games })
    },
    onError: error => {
      console.error('Failed to update game round:', error)
    },
  })
}

// End game mutation
export const useEndGame = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (gameId: string) => gameApi.endGame(gameId),
    onSuccess: (updatedGame, gameId) => {
      // Update the specific game in cache
      queryClient.setQueryData(QUERY_KEYS.game(gameId), updatedGame)

      // Invalidate games list to reflect updated status
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.games })
    },
    onError: error => {
      console.error('Failed to end game:', error)
    },
  })
}

// Health check query
export const useHealthCheck = () => {
  return useQuery({
    queryKey: QUERY_KEYS.health,
    queryFn: gameApi.healthCheck,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  })
}

// Prefetch games (useful for navigation)
export const usePrefetchGames = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.games,
      queryFn: gameApi.getAllGames,
      staleTime: 1000 * 60 * 5,
    })
  }
}
