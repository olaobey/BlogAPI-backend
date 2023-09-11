"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.route('/addComment').post((0, express_validator_1.body)('blogId').exists().isString(), (0, express_validator_1.body)('content').exists().isString(), comment_controller_1.commentController.createComment);
router.route('/deleteComment/:id').delete(comment_controller_1.commentController.deleteComment);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map