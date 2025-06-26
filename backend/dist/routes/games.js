"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController_1 = require("../controllers/gameController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// GET /api/games - Get all games
router.get('/', gameController_1.gameController.getAllGames);
// POST /api/games - Create a new game
router.post('/', validation_1.validateCreateGame, gameController_1.gameController.createGame);
// GET /api/games/:id - Get a specific game by ID
router.get('/:id', validation_1.validateGameId, gameController_1.gameController.getGameById);
// PUT /api/games/:id/round - Update game round result
router.put('/:id/round', validation_1.validateGameId, validation_1.validateUpdateRound, gameController_1.gameController.updateGameRound);
// PUT /api/games/:id/end - End a game session
router.put('/:id/end', validation_1.validateGameId, gameController_1.gameController.endGame);
exports.default = router;
