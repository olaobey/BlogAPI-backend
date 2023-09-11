import { createCommentDto } from 'shared/dto/comment.dto';
export declare class commentService {
    createComment(commentDto: createCommentDto): Promise<any>;
    deleteComment(id: string): Promise<any>;
}
