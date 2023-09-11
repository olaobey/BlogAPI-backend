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
exports.categoryService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const db_prisma_1 = __importDefault(require("../../../config/db.prisma"));
const error_1 = __importDefault(require("../../shared/utils/error"));
class categoryService {
    createCategory(categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, title, type } = categoryDto;
            // Check if the provided type is valid
            const isValidType = Object.values(client_1.CategoryType).includes(type);
            if (!isValidType) {
                throw error_1.default.badRequest(`Invalid category type: ${type}`, 400);
            }
            // Get the blog post
            const blogPost = yield db_prisma_1.default.blog.findUnique({
                where: {
                    id: blogId,
                },
            });
            if (!blogPost) {
                throw error_1.default.notFound('Blog post not found', 404);
            }
            // Create the new category
            const createCategory = yield db_prisma_1.default.category.create({
                data: {
                    title,
                    type,
                    blog: { connect: { id: blogPost.id } },
                },
            });
            return createCategory;
        });
    }
    updateCategory(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, title, type } = updateDto;
            const blogs = yield db_prisma_1.default.blog.findMany({
                where: {
                    id: blogId,
                },
                include: {
                    categories: true,
                    comments: true,
                },
            });
            // Extract the categories from the blogs
            const categories = blogs.flatMap((blog) => blog.categories);
            // Find the category that matches the provided blogId
            const match = categories.find((category) => category.id === blogId);
            if (!match) {
                throw error_1.default.badRequest('Invalid category', 400);
            }
            //Update the category
            const updatedCategory = yield db_prisma_1.default.category.update({
                where: {
                    id: updateDto.id,
                },
                data: {
                    title,
                    type,
                },
            });
            return updatedCategory;
        });
    }
    getAllCategories(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_prisma_1.default.blog.findMany({
                where: {
                    id: blogId,
                },
                include: {
                    categories: true,
                    comments: true,
                },
            });
            // Extract the categories from the blogs
            const categories = blogs.flatMap((blog) => blog.categories);
            return categories;
        });
    }
    getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryData = yield db_prisma_1.default.category.findUnique({
                where: {
                    id: id,
                },
            });
            return categoryData;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield db_prisma_1.default.category.delete({
                where: {
                    id: id,
                },
            });
            return deletedCategory;
        });
    }
}
exports.categoryService = categoryService;
//# sourceMappingURL=category.service.js.map