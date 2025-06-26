import axios, { AxiosResponse } from 'axios'
import { Game, NewGameData, GameResult } from '@/types/game'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  config => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  error => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  error => {
    console.error('❌ Response Error:', error.response?.data || error.message)

    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const message =
        error.response.data?.error ||
        error.response.data?.message ||
        'Server error'
      throw new Error(message)
    } else if (error.request) {
      // Request made but no response received
      throw new Error(
        'Network error - please check your connection and ensure the backend server is running'
      )
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred')
    }
  }
)

// API response wrapper type
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  count?: number
}

export const gameApi = {
  // Get all games
  getAllGames: async (): Promise<Game[]> => {
    const response = await apiClient.get<ApiResponse<Game[]>>('/games')
    return response.data.data
  },

  // Create new game
  createGame: async (gameData: NewGameData): Promise<Game> => {
    const response = await apiClient.post<ApiResponse<Game>>('/games', gameData)
    return response.data.data
  },

  // Get single game
  getGame: async (gameId: string): Promise<Game> => {
    const response = await apiClient.get<ApiResponse<Game>>(`/games/${gameId}`)
    return response.data.data
  },

  // Update game result after round
  updateGameRound: async (
    gameId: string,
    winner: GameResult
  ): Promise<Game> => {
    const response = await apiClient.put<ApiResponse<Game>>(
      `/games/${gameId}/round`,
      { winner }
    )
    return response.data.data
  },

  // End game session
  endGame: async (gameId: string): Promise<Game> => {
    const response = await apiClient.put<ApiResponse<Game>>(
      `/games/${gameId}/end`
    )
    return response.data.data
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await apiClient.get<{ status: string; message: string }>(
      '/health'
    )
    return response.data
  },
}

// Export axios instance for direct use if needed
export { apiClient }
