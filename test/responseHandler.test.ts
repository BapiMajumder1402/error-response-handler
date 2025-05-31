import { successResponse } from '../src';

describe('successResponse', () => {
  it('should return default success response', () => {
    const response = successResponse();
    expect(response.success).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.statusText).toBe('Success');
  });

  it('should accept custom data and message', () => {
    const data = { id: 1 };
    const response = successResponse({
      message: 'Custom message',
      data
    });
    expect(response.data).toEqual(data);
    expect(response.message).toBe('Custom message');
  });

  it('should accept status code as number', () => {
    const response = successResponse({ statusCode: 201 });
    expect(response.statusCode).toBe(201);
  });

  it('should accept status code as string key', () => {
    const response = successResponse({ statusCode: 'CREATED' });
    expect(response.statusCode).toBe(201);
    expect(response.statusText).toBe('Created');
  });
});