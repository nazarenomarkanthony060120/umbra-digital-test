import { Game, IGame } from '../models/Game';
import { ApiError } from '../utils/ApiError';
import { isValidObjectId } from 'mongoose';

export const gameService = {
  /**
   * Get all games
   */
  getAllGames: async (): Promise<IGame[]> => {
    try {
      const games = await Game.find().sort({ createdAt: -1 });
      return games;
    } catch (error) {
      throw new ApiError('Failed to fetch games', 500);
    }
  },

  /**
   * Create a new game
   */
  createGame: async (player1Name: string, player2Name: string): Promise<IGame> => {
    // Validation
    if (!player1Name || !player2Name) {
      throw new ApiError('Both player names are required', 400);
    }

    if (player1Name.trim() === player2Name.trim()) {
      throw new ApiError('Players must have different names', 400);
    }

    if (player1Name.length > 50 || player2Name.length > 50) {
      throw new ApiError('Player names must be less than 50 characters', 400);
    }

    try {
      const newGame = new Game({
        player1: {
          name: player1Name.trim(),
          wins: 0,
          losses: 0,
          draws: 0,
        },
        player2: {
          name: player2Name.trim(),
          wins: 0,
          losses: 0,
          draws: 0,
        },
        totalRounds: 0,
        isActive: true,
      });

      const savedGame = await newGame.save();
      return savedGame;
    } catch (error) {
      throw new ApiError('Failed to create game', 500);
    }
  },

  /**
   * Get game by ID
   */
  getGameById: async (gameId: string): Promise<IGame> => {
    // Validate ObjectId
    if (!isValidObjectId(gameId)) {
      throw new ApiError('Invalid game ID format', 400);
    }

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        throw new ApiError('Game not found', 404);
      }

      return game;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to fetch game', 500);
    }
  },

  /**
   * Update game round result
   */
  updateGameRound: async (
    gameId: string,
    winner: 'player1' | 'player2' | 'draw'
  ): Promise<IGame> => {
    // Validate input
    if (!isValidObjectId(gameId)) {
      throw new ApiError('Invalid game ID format', 400);
    }

    if (!['player1', 'player2', 'draw'].includes(winner)) {
      throw new ApiError('Invalid winner value. Must be player1, player2, or draw', 400);
    }

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        throw new ApiError('Game not found', 404);
      }

      if (!game.isActive) {
        throw new ApiError('Cannot update an inactive game', 400);
      }

      // Update round results
      game.totalRounds += 1;

      if (winner === 'player1') {
        game.player1.wins += 1;
        game.player2.losses += 1;
      } else if (winner === 'player2') {
        game.player2.wins += 1;
        game.player1.losses += 1;
      } else if (winner === 'draw') {
        game.player1.draws += 1;
        game.player2.draws += 1;
      }

      const updatedGame = await game.save();
      return updatedGame;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to update game round', 500);
    }
  },

  /**
   * End game session
   */
  endGame: async (gameId: string): Promise<IGame> => {
    // Validate ObjectId
    if (!isValidObjectId(gameId)) {
      throw new ApiError('Invalid game ID format', 400);
    }

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        throw new ApiError('Game not found', 404);
      }

      if (!game.isActive) {
        throw new ApiError('Game is already ended', 400);
      }

      game.isActive = false;
      game.endedAt = new Date();

      const updatedGame = await game.save();
      return updatedGame;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to end game', 500);
    }
  },
};
