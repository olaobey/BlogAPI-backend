"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("../src/shared/utils/logger"));
const morgan_logger_1 = __importDefault(require("./shared/middleware/morgan.logger"));
const index_1 = __importDefault(require("../src/routes/index"));
const error_middleware_1 = require("../src/shared/middleware/error.middleware");
const index_2 = require("../config/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (origin, cb) => {
        logger_1.default.info(JSON.stringify({ origin, whitelists: index_2.CORS_WHITELISTS }), 'Cors Info');
        return cb(null, true);
    },
    credentials: true,
}));
app.use((0, morgan_logger_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', index_1.default);
app.use(error_middleware_1.generalError);
exports.default = app;
//# sourceMappingURL=app.js.map