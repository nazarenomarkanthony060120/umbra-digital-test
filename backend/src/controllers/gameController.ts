import { Request, Response, NextFunction } from 'express';
import { Game } from '../models/Game';
import { gameService } from '../services/gameService';
import { ApiError } from '../utils/ApiError';

export const gameController = {
  // GET /api/games
  getAllGames: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = await gameService.getAllGames();
      res.status(200).json({
        success: true,
        data: games,
        count: games.length
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/games
  createGame: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { player1Name, player2Name } = req.body;

      const newGame = await gameService.createGame(player1Name, player2Name);

      res.status(201).json({
        success: true,
        data: newGame,
        message: 'Game created successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/games/:id
  getGameById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const game = await gameService.getGameById(id);

      res.status(200).json({
        success: true,
        data: game
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/games/:id/round
  updateGameRound: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { winner } = req.body;

      const updatedGame = await gameService.updateGameRound(id, winner);

      res.status(200).json({
        success: true,
        data: updatedGame,
        message: 'Game round updated successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/games/:id/end
  endGame: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedGame = await gameService.endGame(id);

      res.status(200).json({
        success: true,
        data: updatedGame,
        message: 'Game ended successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}; 