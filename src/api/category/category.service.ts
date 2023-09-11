/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryType } from '@prisma/client';
import prisma from '../../../config/db.prisma';
import  APIError  from '../../shared/utils/error';
import { createCategoryDto, updateCategoryDto,} from '../../shared/dto/category.dto';

export class categoryService {
  async createCategory(categoryDto: createCategoryDto): Promise<any> {
    const { blogId, title, type } = categoryDto;

    // Check if the provided type is valid
    const isValidType = Object.values(CategoryType).includes(type);
    if (!isValidType) {
      throw APIError.badRequest(`Invalid category type: ${type}`, 400);
    }

     // Get the blog post
    const blogPost = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });
    if (!blogPost) {
      throw APIError.notFound('Blog post not found', 404);
    }

    // Create the new category
    const createCategory = await prisma.category.create({
      data: {
        title,
        type,
        blog: { connect: { id: blogPost.id } },
      },
    });
    return createCategory;
  }

  async updateCategory(updateDto: updateCategoryDto): Promise<any> {
    const { blogId, title, type } = updateDto;
    const blogs = await prisma.blog.findMany({
      where: {
        id: blogId,
      },
      include: {
        categories: true,
        comments: true,
      },
    });
    // Extract the categories from the blogs
    const categories = blogs.flatMap((blog) => blog.categories);

    // Find the category that matches the provided blogId
    const match = categories.find((category) => category.id === blogId);
    if (!match) {
      throw APIError.badRequest('Invalid category', 400);
    }

    //Update the category
    const updatedCategory = await prisma.category.update({
      where: {
        id: updateDto.id,
      },
      data: {
        title,
        type,
      },
    });
    return updatedCategory;
  }

  async getAllCategories(blogId: string): Promise<any> {
    const blogs = await prisma.blog.findMany({
      where: {
        id: blogId,
      },
      include: {
        categories: true,
        comments: true,
      },
    });
    // Extract the categories from the blogs
    const categories = blogs.flatMap((blog) => blog.categories);
    return categories;
  }

  async getCategory(id: string): Promise<any> {
    const categoryData = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    return categoryData;
  }

  async deleteCategory(id: string): Promise<any> {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return deletedCategory;
  }
}
