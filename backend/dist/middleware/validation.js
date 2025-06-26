"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGameId = exports.validateUpdateRound = exports.validateCreateGame = void 0;
const ApiError_1 = require("../utils/ApiError");
const validateCreateGame = (req, res, next) => {
    const { player1Name, player2Name } = req.body;
    // Check if both names are provided
    if (!player1Name || !player2Name) {
        return next(new ApiError_1.ApiError('Both player1Name and player2Name are required', 400));
    }
    // Check if names are strings
    if (typeof player1Name !== 'string' || typeof player2Name !== 'string') {
        return next(new ApiError_1.ApiError('Player names must be strings', 400));
    }
    // Check if names are not empty after trimming
    if (player1Name.trim().length === 0 || player2Name.trim().length === 0) {
        return next(new ApiError_1.ApiError('Player names cannot be empty', 400));
    }
    // Check if names are different
    if (player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()) {
        return next(new ApiError_1.ApiError('Players must have different names', 400));
    }
    // Check name length
    if (player1Name.length > 50 || player2Name.length > 50) {
        return next(new ApiError_1.ApiError('Player names must be less than 50 characters', 400));
    }
    next();
};
exports.validateCreateGame = validateCreateGame;
const validateUpdateRound = (req, res, next) => {
    const { winner } = req.body;
    if (!winner) {
        return next(new ApiError_1.ApiError('Winner is required', 400));
    }
    if (!['player1', 'player2', 'draw'].includes(winner)) {
        return next(new ApiError_1.ApiError('Winner must be either "player1", "player2", or "draw"', 400));
    }
    next();
};
exports.validateUpdateRound = validateUpdateRound;
const validateGameId = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ApiError_1.ApiError('Game ID is required', 400));
    }
    // Basic MongoDB ObjectId validation (24 characters, hexadecimal)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(id)) {
        return next(new ApiError_1.ApiError('Invalid game ID format', 400));
    }
    next();
};
exports.validateGameId = validateGameId;
