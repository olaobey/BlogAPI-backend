import { Request, Response } from 'express';
export declare class BlogController {
    [x: string]: any;
    private static blogService;
    static createBlogPost(req: Request, res: Response): Promise<void>;
    static getBlogPost(req: Request, res: Response): Promise<void>;
    static getAllBlogPosts(req: Request, res: Response): Promise<void>;
    static updateBlogPost(req: Request, res: Response): Promise<void>;
    static likeBlogPost(req: Request, res: Response): Promise<void>;
    static viewBlogPost(req: Request, res: Response): Promise<void>;
    static deleteBlogPost(req: Request, res: Response): Promise<void>;
    static deleteAllBlogPost(req: Request, res: Response): Promise<void>;
}
