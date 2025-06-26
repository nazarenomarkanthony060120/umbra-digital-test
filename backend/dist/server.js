"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const games_1 = __importDefault(require("./routes/games"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
// Load environment variables
dotenv_1.default.config();
// Handle uncaught exceptions
process.on('uncaughtException', errorHandler_1.handleUncaughtException);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Global middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
    app.use(logger_1.requestLogger);
}
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// API routes
app.use('/api/games', games_1.default);
// Handle 404 for unmatched routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: `Route ${req.originalUrl} not found`
        }
    });
});
// Error logging middleware
app.use(logger_1.errorLogger);
// Global error handling middleware (must be last)
app.use(errorHandler_1.errorHandler);
// Handle unhandled promise rejections
process.on('unhandledRejection', errorHandler_1.handleUnhandledRejection);
// Start server
const startServer = async () => {
    try {
        // Connect to database
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/health`);
            console.log(`📡 API base URL: http://localhost:${PORT}/api`);
            console.log(`🎮 Games API: http://localhost:${PORT}/api/games`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
