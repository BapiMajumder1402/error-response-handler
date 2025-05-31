"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const statusCodes_1 = require("./statusCodes");
const resolveStatusCode = (input) => {
    if (!input)
        return statusCodes_1.StatusCode.SUCCESS;
    if (typeof input === 'number') {
        const found = Object.values(statusCodes_1.StatusCode).find(sc => sc.code === input);
        //@ts-ignore
        return found || { code: input, text: 'Success' };
    }
    return typeof input === 'string' ? statusCodes_1.StatusCode[input] : input;
};
const successResponse = (options = {}) => {
    const { code, text } = resolveStatusCode(options.statusCode);
    return {
        success: true,
        message: options.message || text,
        data: options.data,
        statusCode: code,
        statusText: text,
        timestamp: new Date().toISOString(),
    };
};
exports.successResponse = successResponse;
