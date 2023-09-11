/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import paginate from 'express-paginate';
import { BlogService } from './blog.service';
import prisma from '../../../config/db.prisma';
import APIError from '../../shared/utils/error';
import {updateBlogDto} from '../../shared/dto/createBlog.dto'


export class BlogController {
  [x: string]: any;
  private static blogService: BlogService = new BlogService();

  static async createBlogPost(req: Request, res: Response) {
    const { title, content, description } = req.body;
    if (!title || !content || !description) {
      throw APIError.badRequest('All fields are required', 400);
    }
    try {
      // Check for duplicate title
      const duplicateBlog = await BlogController.blogService.getBlogPostByTitle(title);
      if (duplicateBlog) {
        throw APIError.conflict('Duplicate blog title', 409);
      }

      const newBlogPost = await BlogController.blogService.createBlogPost({
        title,
        content,
        description,
      });
      res.status(200).json(newBlogPost);
    } catch (err) {
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async getBlogPost(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw APIError.notFound('No such post with id', 404);
    }

    try {
      const blogPost = await BlogController.blogService.getBlogPost(id);
      if (!blogPost) {
        throw new APIError('Blog post not found', 404);
      }

      res.status(200).json({
         data: blogPost,
          success: true 
        });
    } catch (err) {
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async getAllBlogPosts(req: Request, res: Response) {
    try {
      // Get the page number and limit from the query parameters
      const pageNumber = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const searchQuery = req.query.search as string | undefined;
      const skip = (pageNumber - 1) * limit;

      const blogPosts = await BlogController.blogService.getAllBlogPosts({
        skip,
        take: limit,
        where: {
          // Add search criteria if 'search' query parameter is provided
          title: {
            contains: searchQuery, 
          },
        },
      });

      const totalCount = await prisma.blog.count();

      // Calculate pagination metadata
      const pageCount = Math.ceil(totalCount / limit);
      const hasMore = paginate.hasNextPages(req)(pageCount);

      // Prepare the response data
      const responseData = {
        object: 'list',
        has_more: hasMore,
        data: blogPosts,
        pageCount,
        itemCount: totalCount,
        currentPage: req.query.page,
        pages: paginate.getArrayPages(req)(3, pageCount, pageNumber),
      };

      res.status(200).json({
        message: 'Blogs retrieved successfully',
        data: responseData,
        success: true
      });
    } catch (err) {
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async updateBlogPost(req: Request, res: Response) {
    const { id, title, content, description } = req.body;
    if (!id || !title || !content || !description) {
      throw APIError.badRequest('All fields are required', 400);
    }
    try{
      // Check if the blog post exists
    const existingBlog = await BlogController.blogService.getBlogPost(id);
    if(!existingBlog){
      throw APIError.notFound('Blog post not found', 404)
    }
      const duplicateBlog = await BlogController.blogService.getBlogPostByTitle(title)
      if(duplicateBlog && duplicateBlog?.id.toString() !== id){
        throw APIError.conflict('Duplicate blog title', 409);
      }
      const updateDTO: updateBlogDto = {
        id, 
        title,
        content,
        description,
      };
      const updatedBlog = await BlogController.blogService.updateBlogPost(updateDTO)
      res.status(200).json({
         message: 'Blog post updated successfully', 
         data: updatedBlog,
         success: true 
        });
    } catch (err) {
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async likeBlogPost(req: Request, res: Response) {
    const {id} = req.params;
    if(!id){
      throw APIError.notFound('No such post with id', 404);
    }
    try {
      const likedBlog = await BlogController.blogService.likeBlogPost(id)
      res.status(200).json({
        data: likedBlog,
        success: true
      })
    }catch (err){
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async viewBlogPost(req: Request, res: Response) {
    const {id} = req.params;
    if(!id){
      throw APIError.notFound('No such post with id', 404);
    }
    try {
      const viewedBlog = await BlogController.blogService.viewBlogPost(id)
      res.status(200).json({
        data: viewedBlog,
        success: true
      })
    } catch (err) {
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async deleteBlogPost(req: Request, res: Response){
    const {id} = req.params
    if(!id){
      throw APIError.notFound('No such post with id', 404);
    }
    try {
      const deletedBlog = await BlogController.blogService.deleteBlogPost(id)

      const blogData = `Blog '${deletedBlog.title}' with ID ${deletedBlog.id} has been successfully deleted`
      res.status(200).json({
        data: blogData,
        success: true
      })
    } catch(err){
      throw APIError.serverError('Internal server error', 500);
    }
  }

  static async deleteAllBlogPost(req: Request, res: Response){
    try {
      const deletedBlogs = await BlogController.blogService.deleteAllBlogPost()
      res.status(200).json({
        data: deletedBlogs,
        success: true
      })
    } catch(err){
      throw APIError.serverError('Internal server error', 500);
    }
  }

}
