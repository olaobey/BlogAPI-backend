"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_WHITELISTS = void 0;
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.num)({
        desc: 'Port number for the application',
        default: 5000,
    }),
    NODE_ENV: (0, envalid_1.str)({
        desc: 'Node environment',
        default: 'development',
    }),
    APP_LOG_LEVEL: (0, envalid_1.str)({
        desc: 'Log level message',
        default: 'info'
    })
});
exports.CORS_WHITELISTS = [`localhost:${process.env.PORT || 5000}`];
//# sourceMappingURL=index.js.map