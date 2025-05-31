import { StatusCodeKey, StatusCodeValue } from "./statusCodes";

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
  statusCode: number;
  statusText: string;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: unknown;
  statusCode: number;
  statusText: string;
  timestamp: string;
  stack?: string;
}

export type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export type StatusInput = number | StatusCodeKey | StatusCodeValue;