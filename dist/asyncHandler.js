"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.asyncHandler = void 0;
const responseHandler_1 = require("./responseHandler");
const errorHandler_1 = require("./errorHandler");
const asyncHandler = (fn) => {
    return async (...args) => {
        try {
            const result = await fn(...args);
            return (0, responseHandler_1.successResponse)({ data: result });
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                return (0, errorHandler_1.errorResponse)({
                    message: error.message,
                    error,
                    statusCode: error.statusCode,
                    includeStack: true
                });
            }
            return (0, errorHandler_1.errorResponse)({
                message: 'An unexpected error occurred',
                error,
                includeStack: true
            });
        }
    };
};
exports.asyncHandler = asyncHandler;
var errorHandler_2 = require("./errorHandler");
Object.defineProperty(exports, "AppError", { enumerable: true, get: function () { return errorHandler_2.AppError; } });
