import { ErrorResponse, StatusInput } from "./types";
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly statusText: string;
    readonly isOperational: boolean;
    constructor(message: string, status?: StatusInput, isOperational?: boolean);
}
export declare const errorResponse: (options: {
    message?: string;
    error?: unknown;
    statusCode?: StatusInput;
    includeStack?: boolean;
}) => ErrorResponse;
