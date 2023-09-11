import { Request, Response } from 'express';
export declare class categoryController {
    private static categoryService;
    static createCategory(req: Request, res: Response): Promise<void>;
    static updateCategory(req: Request, res: Response): Promise<void>;
    static getAllCategories(req: Request, res: Response): Promise<void>;
    static getCategory(req: Request, res: Response): Promise<void>;
    static deleteCategory(req: Request, res: Response): Promise<void>;
}
