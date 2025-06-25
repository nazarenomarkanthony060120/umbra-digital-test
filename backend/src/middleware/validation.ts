import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validateCreateGame = (req: Request, res: Response, next: NextFunction) => {
  const { player1Name, player2Name } = req.body;

  // Check if both names are provided
  if (!player1Name || !player2Name) {
    return next(new ApiError('Both player1Name and player2Name are required', 400));
  }

  // Check if names are strings
  if (typeof player1Name !== 'string' || typeof player2Name !== 'string') {
    return next(new ApiError('Player names must be strings', 400));
  }

  // Check if names are not empty after trimming
  if (player1Name.trim().length === 0 || player2Name.trim().length === 0) {
    return next(new ApiError('Player names cannot be empty', 400));
  }

  // Check if names are different
  if (player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()) {
    return next(new ApiError('Players must have different names', 400));
  }

  // Check name length
  if (player1Name.length > 50 || player2Name.length > 50) {
    return next(new ApiError('Player names must be less than 50 characters', 400));
  }

  next();
};

export const validateUpdateRound = (req: Request, res: Response, next: NextFunction) => {
  const { winner } = req.body;

  if (!winner) {
    return next(new ApiError('Winner is required', 400));
  }

  if (!['player1', 'player2', 'draw'].includes(winner)) {
    return next(new ApiError('Winner must be either "player1", "player2", or "draw"', 400));
  }

  next();
};

export const validateGameId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError('Game ID is required', 400));
  }

  // Basic MongoDB ObjectId validation (24 characters, hexadecimal)
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(id)) {
    return next(new ApiError('Invalid game ID format', 400));
  }

  next();
}; 