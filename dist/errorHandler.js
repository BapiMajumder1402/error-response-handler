"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.AppError = void 0;
const statusCodes_1 = require("./statusCodes");
const resolveStatusCode = (input) => {
    // Handle number inputs
    if (typeof input === 'number') {
        const found = Object.values(statusCodes_1.StatusCode).find((sc) => sc.code === input);
        return found || {
            code: 500,
            text: `Internal Server Error`
        };
    }
    // Handle string inputs (StatusCodeKey)
    if (typeof input === 'string') {
        if (!(input in statusCodes_1.StatusCode)) {
            throw new Error(`Invalid status code key: ${input}`);
        }
        return statusCodes_1.StatusCode[input];
    }
    // Handle direct StatusCodeValue inputs
    return input;
};
class AppError extends Error {
    constructor(message, status = statusCodes_1.StatusCode.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        const { code, text } = resolveStatusCode(status);
        this.statusCode = code;
        this.statusText = text;
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
const errorResponse = (options) => {
    const { code, text } = resolveStatusCode(options.statusCode || statusCodes_1.StatusCode.INTERNAL_SERVER_ERROR);
    const isDev = options.isDev ?? false;
    return {
        success: false,
        message: options.message || text,
        error: isDev ? options.error : undefined,
        statusCode: code,
        statusText: text,
        timestamp: new Date().toISOString(),
        stack: (isDev && options.includeStack && options.error instanceof Error)
            ? options.error.stack
            : undefined,
    };
};
exports.errorResponse = errorResponse;
