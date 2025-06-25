import { Game, NewGameData, GameResult } from '@/types/game';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(errorData.error || `HTTP ${response.status}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 0);
  }
}

export const gameApi = {
  // Get all games
  getAllGames: async (): Promise<Game[]> => {
    return apiRequest<Game[]>('/games');
  },

  // Create new game
  createGame: async (gameData: NewGameData): Promise<Game> => {
    return apiRequest<Game>('/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  },

  // Get single game
  getGame: async (gameId: string): Promise<Game> => {
    return apiRequest<Game>(`/games/${gameId}`);
  },

  // Update game result after round
  updateGameRound: async (gameId: string, winner: GameResult): Promise<Game> => {
    return apiRequest<Game>(`/games/${gameId}/round`, {
      method: 'PUT',
      body: JSON.stringify({ winner }),
    });
  },

  // End game session
  endGame: async (gameId: string): Promise<Game> => {
    return apiRequest<Game>(`/games/${gameId}/end`, {
      method: 'PUT',
    });
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    return apiRequest<{ status: string; message: string }>('/health');
  },
}; 