import { StatusCode, StatusCodeValue } from "./statusCodes";
import { StatusInput } from "./types";

const resolveStatusCode = (input?: StatusInput): StatusCodeValue => {
  if (!input) return StatusCode.SUCCESS;
  if (typeof input === 'number') {
    const found = Object.values(StatusCode).find(sc => sc.code === input);
    //@ts-ignore
    return found || { code: input, text: 'Success' };
  }
  return typeof input === 'string' ? StatusCode[input] : input;
};

export const successResponse = <T>(options: {
  message?: string;
  data?: T;
  statusCode?: StatusInput;
} = {}): {
  success: true;
  message: string;
  data?: T;
  statusCode: number;
  statusText: string;
  timestamp: string;
} => {
  const { code, text } = resolveStatusCode(options.statusCode);
  
  return {
    success: true,
    message: options.message || text,
    data: options.data,
    statusCode: code,
    statusText: text,
    timestamp: new Date().toISOString(),
  };
};