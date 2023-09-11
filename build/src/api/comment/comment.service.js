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
exports.commentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const db_prisma_1 = __importDefault(require("../../../config/db.prisma"));
class commentService {
    createComment(commentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, content } = commentDto;
            const blogPost = yield db_prisma_1.default.blog.findUnique({
                where: {
                    id: blogId
                }
            });
            if (!blogPost) {
                throw new Error("Blog post not found");
            }
            const createComment = yield db_prisma_1.default.comment.create({
                data: {
                    content,
                    blog: { connect: { id: blogPost.id } }
                },
            });
            return createComment;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield db_prisma_1.default.comment.delete({
                where: {
                    id: id,
                },
            });
            return deletedComment;
        });
    }
}
exports.commentService = commentService;
//# sourceMappingURL=comment.service.js.map