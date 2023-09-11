"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router
    .route('/createCategory')
    .post((0, express_validator_1.body)('blogId').exists().isString(), (0, express_validator_1.body)('title').exists().isString()
    .isIn(['politics', 'national', 'world', 'entertainment', 'technology', 'business', ' All'])
    .optional(), category_controller_1.categoryController.createCategory);
router.route('/updateCategory/:id')
    .put((0, express_validator_1.body)('title').isString().optional(), (0, express_validator_1.body)("status").isIn(['politics', 'national', 'world', 'entertainment', 'technology', 'business', ' All'])
    .optional(), category_controller_1.categoryController.updateCategory);
router.route('/category/:id').get(category_controller_1.categoryController.getCategory);
router.route('/categories').get(category_controller_1.categoryController.getAllCategories);
router.route('/deleteCategory/:id').delete(category_controller_1.categoryController.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map