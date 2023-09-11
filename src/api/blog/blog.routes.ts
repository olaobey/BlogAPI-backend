import express from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { BlogController } from './blog.controller';

const router = express.Router();

router
  .route('/createBlog')
  .post(
    body('title').exists().isString(),
    body('content').exists().isString(),
    body('description').exists().isString(),
    BlogController.createBlogPost,
  );

router
  .route('/updateBlog/:id')
  .put(body('title').isString().optional(), 
  body('content').isString().optional(), 
  body('description').isString().optional(),  
  BlogController.updateBlogPost);

router
  .route('/getBlog/:id')
  .get(BlogController.getBlogPost);

router
  .route('/getBlogs')
  .get(BlogController.getAllBlogPosts)

router
  .route('/deleteBlog/:id')
  .delete(BlogController.deleteBlogPost)

router
  .route('/deleteAllBlog')
  .delete(BlogController.deleteAllBlogPost) 

  router
  .route('/likeBlog/:id')
  .put(BlogController.likeBlogPost) 

  router
  .route('/viewBlog/:id')
  .put(BlogController.viewBlogPost) 



  export default router;
