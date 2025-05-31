"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const errorHandler_1 = require("./errorHandler");
const responseHandler_1 = require("./responseHandler");
// Express-specific async handler
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            const result = await fn(req, res, next);
            // Only send response if not already sent
            if (!res.headersSent) {
                res.json((0, responseHandler_1.successResponse)({ data: result }));
            }
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json((0, errorHandler_1.errorResponse)({
                    message: error.message,
                    error,
                    statusCode: error.statusCode,
                    includeStack: process.env.NODE_ENV === 'development'
                }));
            }
            else {
                res.status(500).json((0, errorHandler_1.errorResponse)({
                    message: 'An unexpected error occurred',
                    error,
                    statusCode: 500,
                    includeStack: process.env.NODE_ENV === 'development'
                }));
            }
        }
    };
};
exports.asyncHandler = asyncHandler;
