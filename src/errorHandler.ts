import { StatusCode, StatusCodeValue } from "./statusCodes";
import { ErrorResponse, StatusInput } from "./types";

const resolveStatusCode = (input: StatusInput): StatusCodeValue => {
  if (typeof input === 'number') {
    const found = Object.values(StatusCode).find((sc): sc is StatusCodeValue => 
      'code' in sc && sc.code === input
    );
    //@ts-ignore
    return found || { code: input, text: 'Custom Status' };
  }
  if (typeof input === 'string') {
    return StatusCode[input as keyof typeof StatusCode];
  }
  return input;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly statusText: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    status: StatusInput = StatusCode.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true
  ) {
    super(message);
    const { code, text } = resolveStatusCode(status);
    this.statusCode = code;
    this.statusText = text;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorResponse = (options: {
  message?: string;
  error?: unknown;
  statusCode?: StatusInput;
  includeStack?: boolean;
}): ErrorResponse => {
  const { code, text } = resolveStatusCode(options.statusCode || StatusCode.INTERNAL_SERVER_ERROR);
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