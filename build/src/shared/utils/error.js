"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
class APIError extends Error {
    constructor(message = 'Unknown Error', status = 500, data = undefined) {
        super(message);
        this.status = status;
        this.data = data;
    }
    static notFound(msg = 'Credential Not Found', status = 404) {
        return new this(msg, status);
    }
    static unauthorized(msg = "Sorry, you don't have the right permission to view the resources", status = 403) {
        return new this(msg, status);
    }
    static unauthenticated(msg = 'Sorry, you need to login first', status = 401) {
        return new this(msg, status);
    }
    static badRequest(msg = 'All fields are required', status = 400, data = undefined) {
        return new this(msg, status, data);
    }
    static conflict(msg = 'Duplicate blog title', status = 409) {
        return new this(msg, status);
    }
    static serverError(msg = 'Internal server error', status = 500) {
        return new this(msg, status);
    }
}
exports.default = APIError;
//# sourceMappingURL=error.js.map