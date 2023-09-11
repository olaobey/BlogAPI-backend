"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalError = exports.notFound = void 0;
const logger_1 = __importDefault(require("../../shared/utils/logger"));
const error_1 = __importDefault(require("../../shared/utils/error"));
const notFound = (req, res) => {
    const logMessage = `Route Not Found - URL: ${req.url}, Method: ${req.method}, Query: ${JSON.stringify(req.query)}, Params: ${JSON.stringify(req.params)}`;
    logger_1.default.error(logMessage);
    res.status(404).json({ msg: 'Route Not Found' });
};
exports.notFound = notFound;
const generalError = (err, _req, res, 
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
_next) => {
    logger_1.default.error(err);
    // res.status(500).json(err);
    if (err instanceof error_1.default) {
        res.status(err.status).json({ msg: err.message, success: false, data: err.data });
    }
    else {
        res.status(500).json({ msg: 'Unknown Error Occurred', success: false });
    }
};
exports.generalError = generalError;
//# sourceMappingURL=error.middleware.js.map