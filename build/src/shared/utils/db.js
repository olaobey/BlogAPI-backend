"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.disconnectDB = void 0;
const db_prisma_1 = __importDefault(require("../../../config/db.prisma"));
const logger_1 = __importDefault(require("./logger"));
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_prisma_1.default.$disconnect();
        logger_1.default.info('Database disconnected Successfully');
    }
    catch (e) {
        logger_1.default.error(e);
    }
});
exports.disconnectDB = disconnectDB;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_prisma_1.default.$connect();
        logger_1.default.info('Database Connected Successfully');
    }
    catch (e) {
        logger_1.default.error(e);
    }
});
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map