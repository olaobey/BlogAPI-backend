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
exports.commentController = void 0;
const comment_service_1 = require("./comment.service");
const error_1 = __importDefault(require("../../shared/utils/error"));
class commentController {
    static createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, content } = req.body;
            try {
                const addComment = yield commentController.commentService.createComment({
                    blogId,
                    content
                });
                res.status(200).json({
                    message: 'Comment created successfully',
                    data: addComment,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedComment = yield commentController.commentService.deleteComment(id);
                if (!deletedComment) {
                    throw error_1.default.notFound('Comment not found', 404);
                }
                res.status(200).json({
                    message: `Comment with ID '${deletedComment.id}' has been deleted successfully`,
                    data: deletedComment,
                    success: true,
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
}
exports.commentController = commentController;
commentController.commentService = new comment_service_1.commentService();
//# sourceMappingURL=comment.controller.js.map