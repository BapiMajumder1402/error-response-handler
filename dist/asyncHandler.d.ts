import { AsyncFunction } from "./types";
export declare const asyncHandler: <T>(fn: AsyncFunction<T>) => (...args: any[]) => Promise<import("./types").ErrorResponse | {
    success: true;
    message: string;
    data?: Awaited<T> | undefined;
    statusCode: number;
    statusText: string;
    timestamp: string;
}>;
export { AppError } from "./errorHandler";
