"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router
    .route('/createBlog')
    .post((0, express_validator_1.body)('title').exists().isString(), (0, express_validator_1.body)('content').exists().isString(), (0, express_validator_1.body)('description').exists().isString(), blog_controller_1.BlogController.createBlogPost);
router
    .route('/updateBlog/:id')
    .put((0, express_validator_1.body)('title').isString().optional(), (0, express_validator_1.body)('content').isString().optional(), (0, express_validator_1.body)('description').isString().optional(), blog_controller_1.BlogController.updateBlogPost);
router
    .route('/getBlog/:id')
    .get(blog_controller_1.BlogController.getBlogPost);
router
    .route('/getBlogs')
    .get(blog_controller_1.BlogController.getAllBlogPosts);
router
    .route('/deleteBlog/:id')
    .delete(blog_controller_1.BlogController.deleteBlogPost);
router
    .route('/deleteAllBlog')
    .delete(blog_controller_1.BlogController.deleteAllBlogPost);
router
    .route('/likeBlog/:id')
    .put(blog_controller_1.BlogController.likeBlogPost);
router
    .route('/viewBlog/:id')
    .put(blog_controller_1.BlogController.viewBlogPost);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map