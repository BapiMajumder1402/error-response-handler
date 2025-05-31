"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.AppError = void 0;
const statusCodes_1 = require("./statusCodes");
const resolveStatusCode = (input) => {
    if (typeof input === 'number') {
        const found = Object.values(statusCodes_1.StatusCode).find((sc) => 'code' in sc && sc.code === input);
        //@ts-ignore
        return found || { code: input, text: 'Custom Status' };
    }
    if (typeof input === 'string') {
        return statusCodes_1.StatusCode[input];
    }
    return input;
};
class AppError extends Error {
    constructor(message, status = statusCodes_1.StatusCode.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        const { code, text } = resolveStatusCode(status);
        this.statusCode = code;
        this.statusText = text;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorResponse = (options) => {
    const { code, text } = resolveStatusCode(options.statusCode || statusCodes_1.StatusCode.INTERNAL_SERVER_ERROR);
    const isDev = process.env.NODE_ENV === 'development';
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
