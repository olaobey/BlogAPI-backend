import { Request, Response } from 'express';
import {commentService} from './comment.service'
import  APIError  from '../../shared/utils/error';


export class commentController {
    private static commentService: commentService = new commentService();

    static async createComment(req: Request, res: Response) {
        const {blogId, content } = req.body
        try{
            const addComment = await commentController.commentService.createComment({
                blogId,
                content
            })
            res.status(200).json({
                message: 'Comment created successfully',
                data: addComment,
                success: true
            })
        } catch(err){
            throw APIError.serverError('Internal server error', 500);
        }
    } 
    static async deleteComment(req: Request, res: Response) {
        const {id} = req.params
        try {
            const deletedComment = await commentController.commentService.deleteComment(id);
            if (!deletedComment) {
              throw APIError.notFound('Comment not found', 404);
            }
            res.status(200).json({
                message: `Comment with ID '${deletedComment.id}' has been deleted successfully`,
                data: deletedComment,
                success: true,
            });
        } catch (err) {
            throw APIError.serverError('Internal server error', 500);
        }
    }       
}