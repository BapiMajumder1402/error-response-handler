import { AsyncFunction } from "./types";
import { successResponse } from "./responseHandler";
import { AppError, errorResponse } from "./errorHandler";

export const asyncHandler = <T>(fn: AsyncFunction<T>) => {
  return async (...args: any[]) => {
    try {
      const result = await fn(...args);
      return successResponse({ data: result });
    } catch (error) {
      if (error instanceof AppError) {
        return errorResponse({
          message: error.message,
          error,
          statusCode: error.statusCode,
          includeStack: true
        });
      }
      return errorResponse({
        message: 'An unexpected error occurred',
        error,
        includeStack: true
      });
    }
  };
};

export { AppError } from "./errorHandler";