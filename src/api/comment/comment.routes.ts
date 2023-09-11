import express from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { commentController } from './comment.controller';


const router = express.Router();

router.route('/addComment').post(body('blogId').exists().isString(), body('content').exists().isString(),  commentController.createComment)

router.route('/deleteComment/:id').delete( commentController.deleteComment)

export default router;