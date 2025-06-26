"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameController = void 0;
const gameService_1 = require("../services/gameService");
exports.gameController = {
    // GET /api/games
    getAllGames: async (req, res, next) => {
        try {
            const games = await gameService_1.gameService.getAllGames();
            res.status(200).json({
                success: true,
                data: games,
                count: games.length
            });
        }
        catch (error) {
            next(error);
        }
    },
    // POST /api/games
    createGame: async (req, res, next) => {
        try {
            const { player1Name, player2Name } = req.body;
            const newGame = await gameService_1.gameService.createGame(player1Name, player2Name);
            res.status(201).json({
                success: true,
                data: newGame,
                message: 'Game created successfully'
            });
        }
        catch (error) {
            next(error);
        }
    },
    // GET /api/games/:id
    getGameById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const game = await gameService_1.gameService.getGameById(id);
            res.status(200).json({
                success: true,
                data: game
            });
        }
        catch (error) {
            next(error);
        }
    },
    // PUT /api/games/:id/round
    updateGameRound: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { winner } = req.body;
            const updatedGame = await gameService_1.gameService.updateGameRound(id, winner);
            res.status(200).json({
                success: true,
                data: updatedGame,
                message: 'Game round updated successfully'
            });
        }
        catch (error) {
            next(error);
        }
    },
    // PUT /api/games/:id/end
    endGame: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedGame = await gameService_1.gameService.endGame(id);
            res.status(200).json({
                success: true,
                data: updatedGame,
                message: 'Game ended successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
};
