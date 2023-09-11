declare class APIError extends Error {
    status: number;
    data?: any;
    constructor(message?: string, status?: number, data?: undefined);
    static notFound(msg?: string, status?: number): APIError;
    static unauthorized(msg?: string, status?: number): APIError;
    static unauthenticated(msg?: string, status?: number): APIError;
    static badRequest(msg?: string, status?: number, data?: any): APIError;
    static conflict(msg?: string, status?: number): APIError;
    static serverError(msg?: string, status?: number): APIError;
}
export default APIError;
