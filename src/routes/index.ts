import express from 'express';
import blogRoute from '../api/blog/blog.routes'
import categoryRoute from '../api/category/category.routes'
import commentRoute from '../api/comment/comment.routes'


const router = express.Router();

router.use('/blog', blogRoute)

router.use('/category', categoryRoute)

router.use('/comment', commentRoute)

export default router;