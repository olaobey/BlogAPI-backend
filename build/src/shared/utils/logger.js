"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const index_1 = __importDefault(require("../../../config/index"));
const { combine, timestamp, printf, colorize } = winston_1.default.format;
const logger = winston_1.default.createLogger({
    level: index_1.default.APP_LOG_LEVEL || 'info',
    format: combine(colorize({ all: true }), timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }), printf((level) => `[${level.timestamp}] ${level.level}: ${level.message}`)),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map