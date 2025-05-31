import { AppError, errorResponse } from "../src/errorHandler"
import { StatusCode } from '../src/statusCodes'

describe('resolveStatusCode', () => {
  // Note: Since resolveStatusCode isn't exported, we'll test it through AppError
});

describe('AppError', () => {
  test('should create error with default status code', () => {
    const error = new AppError('Test error');
    expect(error.statusCode).toBe(500);
    expect(error.statusText).toBe('Internal Server Error');
    expect(error.message).toBe('Test error');
    expect(error.isOperational).toBe(true);
    expect(error.timestamp).toBeDefined();
  });

  test('should accept status code as number', () => {
    const error = new AppError('Not found', 404);
    expect(error.statusCode).toBe(404);
    expect(error.statusText).toBe('Not Found');
  });

  test('should accept status code as string key', () => {
    const error = new AppError('Unauthorized', 'UNAUTHORIZED');
    expect(error.statusCode).toBe(401);
    expect(error.statusText).toBe('Unauthorized');
  });

  test('should accept StatusCodeValue directly', () => {
    const error = new AppError('Conflict', StatusCode.CONFLICT);
    expect(error.statusCode).toBe(409);
    expect(error.statusText).toBe('Conflict');
  });

  test('should fallback to 500 for unknown numeric codes', () => {
    const error = new AppError('Test', 499);
    expect(error.statusCode).toBe(500);
    expect(error.statusText).toBe('Internal Server Error');
  });

  test('should throw for invalid string keys', () => {
    expect(() => new AppError('Test', 'INVALID_KEY' as any)).toThrow('Invalid status code key');
  });

  test('should capture stack trace when available', () => {
    const error = new AppError('Test');
    expect(error.stack).toBeDefined();
  });
});

describe('errorResponse', () => {
  test('should create basic error response', () => {
    const response = errorResponse({ message: 'Test error' });
    expect(response.success).toBe(false);
    expect(response.message).toBe('Test error');
    expect(response.statusCode).toBe(500);
    expect(response.timestamp).toBeDefined();
  });

  test('should include error details in dev mode', () => {
    const testError = new Error('Original error');
    const response = errorResponse({
      error: testError,
      isDev: true,
      includeStack: true
    });
    expect(response.error).toBe(testError);
    expect(response.stack).toBe(testError.stack);
  });

  test('should exclude sensitive info in production', () => {
    const testError = new Error('Original error');
    const response = errorResponse({
      error: testError,
      isDev: false,
      includeStack: true
    });
    expect(response.error).toBeUndefined();
    expect(response.stack).toBeUndefined();
  });

  test('should use provided status code', () => {
    const response = errorResponse({
      statusCode: 'NOT_FOUND',
      message: 'Custom message'
    });
    expect(response.statusCode).toBe(404);
    expect(response.statusText).toBe('Not Found');
    expect(response.message).toBe('Custom message');
  });

  test('should fallback to status text when message not provided', () => {
    const response = errorResponse({
      statusCode: 'FORBIDDEN'
    });
    expect(response.message).toBe('Forbidden');
  });
});