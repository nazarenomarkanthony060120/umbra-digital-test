"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUncaughtException = exports.handleUnhandledRejection = exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let isOperational = false;
    // Handle ApiError instances
    if (error instanceof ApiError_1.ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        isOperational = error.isOperational;
    }
    // Handle Mongoose validation errors
    else if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    }
    // Handle Mongoose duplicate key errors
    else if (error.name === 'MongoServerError' && error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value';
    }
    // Handle Mongoose CastError (invalid ObjectId)
    else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }
    // Handle other known errors
    else if (error.message) {
        message = error.message;
    }
    // Log error for debugging (in production, you might want to use a proper logger)
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            url: req.url,
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query
        });
    }
    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                name: error.name
            })
        }
    });
};
exports.errorHandler = errorHandler;
// Handle unhandled promise rejections
const handleUnhandledRejection = (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Close server & exit process
    process.exit(1);
};
exports.handleUnhandledRejection = handleUnhandledRejection;
// Handle uncaught exceptions
const handleUncaughtException = (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
};
exports.handleUncaughtException = handleUncaughtException;
