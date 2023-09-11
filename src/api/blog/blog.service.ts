/* eslint-disable @typescript-eslint/no-explicit-any */
import  prisma  from '../../../config/db.prisma';
import {createBlogDto, updateBlogDto} from '../../shared/dto/createBlog.dto'


export class BlogService {
    
     async createBlogPost(blogDTO: createBlogDto): Promise<any> {
        const { title, content, description} = blogDTO;
        const newBlog = await prisma.blog.create({data: {title, content, description},});
        return newBlog;
      }

      async updateBlogPost(updateDTO: updateBlogDto): Promise<any> {
        const { id, title, content, description } = updateDTO;
        const updatedBlog = await prisma.blog.update({
          where: { 
            id,
          },
          data: {
            title, 
            content, 
            description
           },
          include:{
            comments: true,
            categories: true
          },
          
        });
    
        return updatedBlog;
      }

      async getBlogPost(id: string): Promise<any> {
        const blogPost = await prisma.blog.findUnique({
          where: {
            id: id,
          }
        })
        return blogPost
      }

      async getBlogPostByTitle(title: string): Promise<any> {
        const blogPost = await prisma.blog.findFirst({
          where: {
            title
          }
        })
        return blogPost
      }

      async getAllBlogPosts({ skip, take, where }: { skip: number; take: number; where?: any }): Promise<any[]> {
        return await prisma.blog.findMany({
          skip,
          take,
          where,
          orderBy: {
          createdAt: 'desc',
          },
       });
    }

    async likeBlogPost(id: string): Promise<any>{
      const likedBlogPost = await prisma.blog.update({
        where: {
          id: id,
        },
        data: {
          likesCount: {
            increment: 1,
          }
        }
      })
      return likedBlogPost
    }async viewBlogPost(id: string): Promise<any>{
      const viewedBlogPost = await prisma.blog.update({
        where: {
          id: id,
        },
        data: {
          viewsCount: {
            increment: 1,
          }
        }
      })
      return viewedBlogPost
    }



    async deleteBlogPost(id: string): Promise<any> {
      const deletedBlogPost = await prisma.blog.delete({
        where: {
          id: id,
        }
      })
      return deletedBlogPost
    }

    async deleteAllBlogPost(): Promise<any> {
      const deletedBlogPosts = await prisma.blog.deleteMany()
      return deletedBlogPosts
    }

}