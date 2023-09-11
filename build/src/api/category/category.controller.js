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
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const error_1 = __importDefault(require("../../shared/utils/error"));
class categoryController {
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, title, type } = req.body;
            try {
                const addCategory = yield categoryController.categoryService.createCategory({
                    blogId,
                    title,
                    type: type,
                });
                res.status(200).json({
                    message: 'Category created successfully',
                    data: addCategory,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield categoryController.categoryService.updateCategory(req.body);
                res.status(200).json({
                    message: 'Updated category successfully',
                    data: updatedCategory,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId } = req.params;
            try {
                const allCategories = yield categoryController.categoryService.getAllCategories(blogId);
                res.status(200).json({
                    message: 'All categories successfully retrieved',
                    data: allCategories,
                    success: true,
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const category = yield categoryController.categoryService.getCategory(id);
                if (!category) {
                    throw error_1.default.notFound('Category not found', 404);
                }
                res.status(200).json({
                    message: 'Category successfully retrieved',
                    data: category,
                    success: true
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedCategory = yield categoryController.categoryService.deleteCategory(id);
                if (!deletedCategory) {
                    throw error_1.default.notFound('Category not found', 404);
                }
                res.status(200).json({
                    message: `Category '${deletedCategory.title}' with ID '${deletedCategory.id}' has been deleted`,
                    data: deletedCategory,
                    success: true,
                });
            }
            catch (err) {
                throw error_1.default.serverError('Internal server error', 500);
            }
        });
    }
}
exports.categoryController = categoryController;
categoryController.categoryService = new category_service_1.categoryService();
//# sourceMappingURL=category.controller.js.map