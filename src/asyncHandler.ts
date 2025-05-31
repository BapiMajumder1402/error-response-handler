import { Request, Response, NextFunction } from 'express';
import { AppError, errorResponse } from './errorHandler';
import { successResponse } from './responseHandler';

// Express-specific async handler
export const asyncHandler = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      
      // Only send response if not already sent
      if (!res.headersSent) {
        res.json(successResponse({ data: result }));
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json(
          errorResponse({
            message: error.message,
            error,
            statusCode: error.statusCode,
            includeStack: process.env.NODE_ENV === 'development'
          })
        );
      } else {
        res.status(500).json(
          errorResponse({
            message: 'An unexpected error occurred',
            error,
            statusCode: 500,
            includeStack: process.env.NODE_ENV === 'development'
          })
        );
      }
    }
  };
};