export const StatusCode = {
  // 2xx Success
  SUCCESS: { code: 200, text: "Success" },
  CREATED: { code: 201, text: "Created" },
  ACCEPTED: { code: 202, text: "Accepted" },
  NO_CONTENT: { code: 204, text: "No Content" },

  // 4xx Client Errors
  BAD_REQUEST: { code: 400, text: "Bad Request" },
  UNAUTHORIZED: { code: 401, text: "Unauthorized" },
  FORBIDDEN: { code: 403, text: "Forbidden" },
  NOT_FOUND: { code: 404, text: "Not Found" },
  METHOD_NOT_ALLOWED: { code: 405, text: "Method Not Allowed" },
  CONFLICT: { code: 409, text: "Conflict" },
  VALIDATION_ERROR: { code: 422, text: "Validation Error" },
  TOO_MANY_REQUESTS: { code: 429, text: "Too Many Requests" },

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: { code: 500, text: "Internal Server Error" },
  NOT_IMPLEMENTED: { code: 501, text: "Not Implemented" },
  SERVICE_UNAVAILABLE: { code: 503, text: "Service Unavailable" },

  // Custom Business Codes (520-529 reserved for custom use)
  BUSINESS_ERROR: { code: 520, text: "Business Logic Error" },
  MAINTENANCE_MODE: { code: 521, text: "Maintenance Mode" },
  DEPRECATED_API: { code: 522, text: "Deprecated API" },
} as const;

export type StatusCodeKey = keyof typeof StatusCode;
export type StatusCodeValue = (typeof StatusCode)[StatusCodeKey];
