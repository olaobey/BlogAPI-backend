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
exports.BlogController = void 0;
const express_paginate_1 = __importDefault(require("express-paginate"));
const blog_service_1 = require("./blog.service");
const db_prisma_1 = __importDefault(require("../../../config/db.prisma"));
const error_1 = __importDefault(require("../../shared/utils/error"));
class BlogController {
    static createBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, description } = req.body;
            if (!title || !content || !description) {
                throw error_1.default.badRequest('All fields are required', 400);
            }
            try {
                // Check for duplicate title
                const duplicateBlog = yield BlogController.blogService.getBlogPostByTitle(title);
                if (duplicateBlog) {
                    throw error_1.default.conflict('Duplicate blog title', 409);
                }
                const newBlogPost = yield BlogController.blogService.createBlogPost({
                    title,
                    content,
                    description,
                });
                res.status(200).json(newBlogPost);
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static getBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                throw error_1.default.notFound('No such post with id', 404);
            }
            try {
                const blogPost = yield BlogController.blogService.getBlogPost(id);
                if (!blogPost) {
                    throw new error_1.default('Blog post not found', 404);
                }
                res.status(200).json({
                    data: blogPost,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static getAllBlogPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the page number and limit from the query parameters
                const pageNumber = parseInt(req.query.page, 10) || 1;
                const limit = parseInt(req.query.limit, 10) || 10;
                const searchQuery = req.query.search;
                const skip = (pageNumber - 1) * limit;
                const blogPosts = yield BlogController.blogService.getAllBlogPosts({
                    skip,
                    take: limit,
                    where: {
                        // Add search criteria if 'search' query parameter is provided
                        title: {
                            contains: searchQuery,
                        },
                    },
                });
                const totalCount = yield db_prisma_1.default.blog.count();
                // Calculate pagination metadata
                const pageCount = Math.ceil(totalCount / limit);
                const hasMore = express_paginate_1.default.hasNextPages(req)(pageCount);
                // Prepare the response data
                const responseData = {
                    object: 'list',
                    has_more: hasMore,
                    data: blogPosts,
                    pageCount,
                    itemCount: totalCount,
                    currentPage: req.query.page,
                    pages: express_paginate_1.default.getArrayPages(req)(3, pageCount, pageNumber),
                };
                res.status(200).json({
                    message: 'Blogs retrieved successfully',
                    data: responseData,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static updateBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, content, description } = req.body;
            if (!id || !title || !content || !description) {
                throw error_1.default.badRequest('All fields are required', 400);
            }
            try {
                // Check if the blog post exists
                const existingBlog = yield BlogController.blogService.getBlogPost(id);
                if (!existingBlog) {
                    throw error_1.default.notFound('Blog post not found', 404);
                }
                const duplicateBlog = yield BlogController.blogService.getBlogPostByTitle(title);
                if (duplicateBlog && (duplicateBlog === null || duplicateBlog === void 0 ? void 0 : duplicateBlog.id.toString()) !== id) {
                    throw error_1.default.conflict('Duplicate blog title', 409);
                }
                const updateDTO = {
                    id,
                    title,
                    content,
                    description,
                };
                const updatedBlog = yield BlogController.blogService.updateBlogPost(updateDTO);
                res.status(200).json({
                    message: 'Blog post updated successfully',
                    data: updatedBlog,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static likeBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                throw error_1.default.notFound('No such post with id', 404);
            }
            try {
                const likedBlog = yield BlogController.blogService.likeBlogPost(id);
                res.status(200).json({
                    data: likedBlog,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static viewBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                throw error_1.default.notFound('No such post with id', 404);
            }
            try {
                const viewedBlog = yield BlogController.blogService.viewBlogPost(id);
                res.status(200).json({
                    data: viewedBlog,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static deleteBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                throw error_1.default.notFound('No such post with id', 404);
            }
            try {
                const deletedBlog = yield BlogController.blogService.deleteBlogPost(id);
                const blogData = `Blog '${deletedBlog.title}' with ID ${deletedBlog.id} has been successfully deleted`;
                res.status(200).json({
                    data: blogData,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static deleteAllBlogPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBlogs = yield BlogController.blogService.deleteAllBlogPost();
                res.status(200).json({
                    data: deletedBlogs,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
}
exports.BlogController = BlogController;
BlogController.blogService = new blog_service_1.BlogService();
//# sourceMappingURL=blog.controller.js.map