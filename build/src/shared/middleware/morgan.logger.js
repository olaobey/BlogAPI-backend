"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const morgan_1 = __importDefault(require("morgan"));
function morganLogger() {
    const LOGS_FOLDER = `${app_root_path_1.default}/logs`;
    if (!fs_1.default.existsSync(LOGS_FOLDER)) {
        fs_1.default.mkdirSync(LOGS_FOLDER);
    }
    const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(LOGS_FOLDER, 'app-access.log'), { flags: 'a' });
    return (0, morgan_1.default)('combined', { stream: accessLogStream });
}
exports.default = morganLogger;
//# sourceMappingURL=morgan.logger.js.map