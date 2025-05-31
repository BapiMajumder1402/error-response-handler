import { StatusInput } from "./types";
export declare const successResponse: <T>(options?: {
    message?: string;
    data?: T;
    statusCode?: StatusInput;
}) => {
    success: true;
    message: string;
    data?: T;
    statusCode: number;
    statusText: string;
    timestamp: string;
};
