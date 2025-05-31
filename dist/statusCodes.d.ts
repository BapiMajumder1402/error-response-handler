export declare const StatusCode: {
    readonly SUCCESS: {
        readonly code: 200;
        readonly text: "Success";
    };
    readonly CREATED: {
        readonly code: 201;
        readonly text: "Created";
    };
    readonly ACCEPTED: {
        readonly code: 202;
        readonly text: "Accepted";
    };
    readonly NO_CONTENT: {
        readonly code: 204;
        readonly text: "No Content";
    };
    readonly BAD_REQUEST: {
        readonly code: 400;
        readonly text: "Bad Request";
    };
    readonly UNAUTHORIZED: {
        readonly code: 401;
        readonly text: "Unauthorized";
    };
    readonly FORBIDDEN: {
        readonly code: 403;
        readonly text: "Forbidden";
    };
    readonly NOT_FOUND: {
        readonly code: 404;
        readonly text: "Not Found";
    };
    readonly METHOD_NOT_ALLOWED: {
        readonly code: 405;
        readonly text: "Method Not Allowed";
    };
    readonly CONFLICT: {
        readonly code: 409;
        readonly text: "Conflict";
    };
    readonly VALIDATION_ERROR: {
        readonly code: 422;
        readonly text: "Validation Error";
    };
    readonly TOO_MANY_REQUESTS: {
        readonly code: 429;
        readonly text: "Too Many Requests";
    };
    readonly INTERNAL_SERVER_ERROR: {
        readonly code: 500;
        readonly text: "Internal Server Error";
    };
    readonly NOT_IMPLEMENTED: {
        readonly code: 501;
        readonly text: "Not Implemented";
    };
    readonly SERVICE_UNAVAILABLE: {
        readonly code: 503;
        readonly text: "Service Unavailable";
    };
    readonly BUSINESS_ERROR: {
        readonly code: 520;
        readonly text: "Business Logic Error";
    };
    readonly MAINTENANCE_MODE: {
        readonly code: 521;
        readonly text: "Maintenance Mode";
    };
    readonly DEPRECATED_API: {
        readonly code: 522;
        readonly text: "Deprecated API";
    };
};
export type StatusCodeKey = keyof typeof StatusCode;
export type StatusCodeValue = (typeof StatusCode)[StatusCodeKey];
