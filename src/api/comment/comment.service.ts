/* eslint-disable @typescript-eslint/no-explicit-any */
import  prisma  from '../../../config/db.prisma';
import { createCommentDto } from 'shared/dto/comment.dto';


export class commentService{
    async createComment(commentDto:createCommentDto): Promise<any>{
        const {blogId, content} = commentDto
        const blogPost = await prisma.blog.findUnique({
            where: {
                id: blogId
            }
        })
        if (!blogPost) {
            throw new Error("Blog post not found");
        }
        const createComment = await prisma.comment.create({
            data: {
                content,
                blog: { connect: { id: blogPost.id } }
            },
        })
        return createComment
    }

    async deleteComment(id: string): Promise<any> {
        const deletedComment = await prisma.comment.delete({
            where: {
              id: id,
            },
          });
          return deletedComment
    }
}