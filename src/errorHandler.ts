import { StatusCode, StatusCodeValue, StatusCodeKey } from "./statusCodes";
import { ErrorResponse, StatusInput } from "./types";

const resolveStatusCode = (input: StatusInput): StatusCodeValue => {
  // Handle number inputs
  if (typeof input === 'number') {
    const found = Object.values(StatusCode).find((sc): sc is StatusCodeValue => 
      sc.code === input
    );
    return found || {
      code: 500,
      text: `Internal Server Error`
    };
  }

  // Handle string inputs (StatusCodeKey)
  if (typeof input === 'string') {
    if (!(input in StatusCode)) {
      throw new Error(`Invalid status code key: ${input}`);
    }
    return StatusCode[input as StatusCodeKey];
  }

  // Handle direct StatusCodeValue inputs
  return input;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly statusText: string;
  public readonly isOperational: boolean;
  public readonly timestamp: string;

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
    this.timestamp = new Date().toISOString();
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorResponse = (options: {
  message?: string;
  error?: unknown;
  statusCode?: StatusInput;
  includeStack?: boolean;
  isDev?: boolean;
}): ErrorResponse => {
  const { code, text } = resolveStatusCode(options.statusCode || StatusCode.INTERNAL_SERVER_ERROR);
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