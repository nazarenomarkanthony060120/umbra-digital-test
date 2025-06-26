"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tictactoe';
        await mongoose_1.default.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${mongoose_1.default.connection.name}`);
        console.log(`🔗 Host: ${mongoose_1.default.connection.host}:${mongoose_1.default.connection.port}`);
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
// Handle MongoDB connection events
mongoose_1.default.connection.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('📡 MongoDB disconnected');
});
// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('🔌 MongoDB connection closed through app termination');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error during MongoDB disconnection:', error);
        process.exit(1);
    }
});
