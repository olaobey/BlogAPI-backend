import { createCategoryDto, updateCategoryDto } from '../../shared/dto/category.dto';
export declare class categoryService {
    createCategory(categoryDto: createCategoryDto): Promise<any>;
    updateCategory(updateDto: updateCategoryDto): Promise<any>;
    getAllCategories(blogId: string): Promise<any>;
    getCategory(id: string): Promise<any>;
    deleteCategory(id: string): Promise<any>;
}
