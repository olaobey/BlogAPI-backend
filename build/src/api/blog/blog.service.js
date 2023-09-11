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
exports.BlogService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const db_prisma_1 = __importDefault(require("../../../config/db.prisma"));
class BlogService {
    createBlogPost(blogDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, description } = blogDTO;
            const newBlog = yield db_prisma_1.default.blog.create({ data: { title, content, description }, });
            return newBlog;
        });
    }
    updateBlogPost(updateDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, content, description } = updateDTO;
            const updatedBlog = yield db_prisma_1.default.blog.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                    description
                },
                include: {
                    comments: true,
                    categories: true
                },
            });
            return updatedBlog;
        });
    }
    getBlogPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogPost = yield db_prisma_1.default.blog.findUnique({
                where: {
                    id: id,
                }
            });
            return blogPost;
        });
    }
    getBlogPostByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogPost = yield db_prisma_1.default.blog.findFirst({
                where: {
                    title
                }
            });
            return blogPost;
        });
    }
    getAllBlogPosts({ skip, take, where }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_prisma_1.default.blog.findMany({
                skip,
                take,
                where,
                orderBy: {
                    createdAt: 'desc',
                },
            });
        });
    }
    likeBlogPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const likedBlogPost = yield db_prisma_1.default.blog.update({
                where: {
                    id: id,
                },
                data: {
                    likesCount: {
                        increment: 1,
                    }
                }
            });
            return likedBlogPost;
        });
    }
    viewBlogPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewedBlogPost = yield db_prisma_1.default.blog.update({
                where: {
                    id: id,
                },
                data: {
                    viewsCount: {
                        increment: 1,
                    }
                }
            });
            return viewedBlogPost;
        });
    }
    deleteBlogPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlogPost = yield db_prisma_1.default.blog.delete({
                where: {
                    id: id,
                }
            });
            return deletedBlogPost;
        });
    }
    deleteAllBlogPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlogPosts = yield db_prisma_1.default.blog.deleteMany();
            return deletedBlogPosts;
        });
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map