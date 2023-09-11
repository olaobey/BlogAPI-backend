import { createBlogDto, updateBlogDto } from '../../shared/dto/createBlog.dto';
export declare class BlogService {
    createBlogPost(blogDTO: createBlogDto): Promise<any>;
    updateBlogPost(updateDTO: updateBlogDto): Promise<any>;
    getBlogPost(id: string): Promise<any>;
    getBlogPostByTitle(title: string): Promise<any>;
    getAllBlogPosts({ skip, take, where }: {
        skip: number;
        take: number;
        where?: any;
    }): Promise<any[]>;
    likeBlogPost(id: string): Promise<any>;
    viewBlogPost(id: string): Promise<any>;
    deleteBlogPost(id: string): Promise<any>;
    deleteAllBlogPost(): Promise<any>;
}
