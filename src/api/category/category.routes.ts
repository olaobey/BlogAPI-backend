import express from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { categoryController } from './category.controller';

const router = express.Router();

router
  .route('/createCategory')
  .post(body('blogId').exists().isString(), 
  body('title').exists().isString()
  .isIn(['politics', 'national', 'world', 'entertainment', 'technology', 'business', ' All'])
  .optional(), categoryController.createCategory);

router.route('/updateCategory/:id')
      .put(body('title').isString().optional(), 
      body("status").isIn(['politics', 'national', 'world', 'entertainment', 'technology', 'business', ' All'])
      .optional(), categoryController.updateCategory);

router.route('/category/:id').get(categoryController.getCategory);

router.route('/categories').get(categoryController.getAllCategories)

router.route('/deleteCategory/:id').delete(categoryController.deleteCategory)


export default router
