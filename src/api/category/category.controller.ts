import { Request, Response } from 'express';
import { categoryService } from './category.service';
import  APIError  from '../../shared/utils/error';
import { CategoryType } from '@prisma/client';
import { updateCategoryDto,} from '../../shared/dto/category.dto';



export class categoryController {
    private static categoryService: categoryService = new categoryService();

    static async createCategory(req: Request, res: Response) {
        const {blogId, title, type } = req.body
        try {
            const addCategory = await categoryController.categoryService.createCategory({
                blogId,
                title,
                type: type as CategoryType,
            })
            res.status(200).json({
                message: 'Category created successfully',
                data: addCategory,
                success: true
            });
        } catch (err) {
            throw APIError.serverError('Internal server error', 500);
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const updatedCategory = await categoryController.categoryService.updateCategory(req.body)
            res.status(200).json({
                message: 'Updated category successfully',
                data: updatedCategory,
                success: true
            });
        } catch (err) {
            throw APIError.serverError('Internal server error', 500);
        }
    }

    static async getAllCategories(req: Request, res: Response) {
        const {blogId} = req.params
        try{
        const allCategories = await categoryController.categoryService.getAllCategories(blogId)
        res.status(200).json({
            message: 'All categories successfully retrieved',
            data: allCategories,
            success: true,
        });
        } catch(err){
            throw APIError.serverError('Internal server error', 500);
        }

    }

    static async getCategory(req: Request, res: Response) {
        const { id } = req.params
        try {
            const category = await categoryController.categoryService.getCategory(id);
            if (!category) {
                throw APIError.notFound('Category not found', 404);
              }
              res.status(200).json({
                message: 'Category successfully retrieved',
                data: category,
                success: true
            });
        } catch (err) {
            throw APIError.serverError('Internal server error', 500);
        }
    }

    static async deleteCategory(req: Request, res: Response,) {
             const {id} = req.params
        try {
            const deletedCategory = await categoryController.categoryService.deleteCategory(id);
            if (!deletedCategory) {
              throw APIError.notFound('Category not found', 404);
            }
            res.status(200).json({
                message: `Category '${deletedCategory.title}' with ID '${deletedCategory.id}' has been deleted`,
                data: deletedCategory,
                success: true,
            });
        } catch (err) {
            throw APIError.serverError('Internal server error', 500);
        }
    }
}  