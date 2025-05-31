import { Request, Response, NextFunction } from 'express';
export declare const asyncHandler: <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
