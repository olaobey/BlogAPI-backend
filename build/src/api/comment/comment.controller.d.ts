import { Request, Response } from 'express';
export declare class commentController {
    private static commentService;
    static createComment(req: Request, res: Response): Promise<void>;
    static deleteComment(req: Request, res: Response): Promise<void>;
}
