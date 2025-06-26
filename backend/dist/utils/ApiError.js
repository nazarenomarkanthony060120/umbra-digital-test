"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}
exports.ApiError = ApiError;
