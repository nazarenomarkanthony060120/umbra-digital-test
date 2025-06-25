import { Router } from 'express';
import { gameController } from '../controllers/gameController';
import { validateCreateGame, validateUpdateRound, validateGameId } from '../middleware/validation';

const router = Router();

// GET /api/games - Get all games
router.get('/', gameController.getAllGames);

// POST /api/games - Create a new game
router.post('/', validateCreateGame, gameController.createGame);

// GET /api/games/:id - Get a specific game by ID
router.get('/:id', validateGameId, gameController.getGameById);

// PUT /api/games/:id/round - Update game round result
router.put('/:id/round', validateGameId, validateUpdateRound, gameController.updateGameRound);

// PUT /api/games/:id/end - End a game session
router.put('/:id/end', validateGameId, gameController.endGame);

export default router; 