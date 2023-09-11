"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_routes_1 = __importDefault(require("../api/blog/blog.routes"));
const category_routes_1 = __importDefault(require("../api/category/category.routes"));
const comment_routes_1 = __importDefault(require("../api/comment/comment.routes"));
const router = express_1.default.Router();
router.use('/blog', blog_routes_1.default);
router.use('/category', category_routes_1.default);
router.use('/comment', comment_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map