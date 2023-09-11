import { BlogService } from '../../../src/api/blog/blog.service';
import prisma from '../../../config/db.prisma';
import { createBlogDto, updateBlogDto } from '../../../src/shared/dto/createBlog.dto';

jest.mock('../../config/db.prisma.ts', () => ({
  blog: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

describe('BlogService', () => {
  let blogService: BlogService;

  beforeEach(() => {
    blogService = new BlogService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new blog post', async () => {
    const createBlogData: createBlogDto = {
      title: 'Test Blog',
      content: 'This is a test blog content.',
      description: 'Test blog description.',
    };

    const mockCreatedBlog = {
      id: '1',
      ...createBlogData,
    };

    (prisma.blog.create as jest.Mock).mockResolvedValueOnce(mockCreatedBlog);

    const result = await blogService.createBlogPost(createBlogData);

    expect(prisma.blog.create).toHaveBeenCalledWith({
      data: createBlogData,
    });
    expect(result).toEqual(mockCreatedBlog);
  });

  it('should update an existing blog post', async () => {
    const updateBlogData: updateBlogDto = {
      id: '1',
      title: 'Updated Blog',
      content: 'Updated blog content.',
      description: 'Updated blog description.',
    };

    const mockUpdatedBlog = {
      ...updateBlogData,
      likesCount: 0, 
      viewsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.blog.update as jest.Mock).mockResolvedValueOnce(mockUpdatedBlog);

    const result = await blogService.updateBlogPost(updateBlogData);

    expect(prisma.blog.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updateBlogData,
      include: {
        comments: true,
        categories: true,
      },
    });
    expect(result).toEqual(mockUpdatedBlog);
  });

  it('should get a blog post by ID', async () => {
    const blogId = '1';
    const mockBlogPost = {
      id: blogId,
      title: 'Test Blog',
      content: 'This is a test blog content.',
      description: 'Test blog description.',
      likesCount: 0,
      viewsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.blog.findUnique as jest.Mock).mockResolvedValueOnce(mockBlogPost);

    const result = await blogService.getBlogPost(blogId);

    expect(prisma.blog.findUnique).toHaveBeenCalledWith({
      where: { id: blogId },
    });
    expect(result).toEqual(mockBlogPost);
  });

  it('should get a blog post by title', async () => {
    const blogTitle = 'Test Blog';
    const mockBlogPost = {
      id: '1',
      title: blogTitle,
      content: 'This is a test blog content.',
      description: 'Test blog description.',
      likesCount: 0,
      viewsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.blog.findFirst as jest.Mock).mockResolvedValueOnce(mockBlogPost);

    const result = await blogService.getBlogPostByTitle(blogTitle);

    expect(prisma.blog.findFirst).toHaveBeenCalledWith({
      where: { title: blogTitle },
    });
    expect(result).toEqual(mockBlogPost);
  });

  it('should get all blog posts', async () => {
    const mockBlogPosts = [
      {
        id: '1',
        title: 'Blog 1',
        content: 'Content for Blog 1',
        description: 'Description for Blog 1',
        likesCount: 10,
        viewsCount: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (prisma.blog.findMany as jest.Mock).mockResolvedValueOnce(mockBlogPosts);

    const result = await blogService.getAllBlogPosts({ skip: 0, take: 10 });

    expect(prisma.blog.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    });
    expect(result).toEqual(mockBlogPosts);
  });

  it('should like a blog post', async () => {
    const blogId = '1';

    (prisma.blog.update as jest.Mock).mockResolvedValueOnce({
      id: blogId,
      likesCount: 1, 
    });

    const result = await blogService.likeBlogPost(blogId);

    expect(prisma.blog.update).toHaveBeenCalledWith({
      where: { id: blogId },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });
    expect(result).toEqual({
      id: blogId,
      likesCount: 1,
    });
  });

  it('should view a blog post', async () => {
    const blogId = '1';

    (prisma.blog.update as jest.Mock).mockResolvedValueOnce({
      id: blogId,
      viewsCount: 1, 
    });

    const result = await blogService.viewBlogPost(blogId);

    expect(prisma.blog.update).toHaveBeenCalledWith({
      where: { id: blogId },
      data: {
        viewsCount: {
          increment: 1,
        },
      },
    });
    expect(result).toEqual({
      id: blogId,
      viewsCount: 1,
    });
  });

  it('should delete a blog post by ID', async () => {
    const blogId = '1';

    (prisma.blog.delete as jest.Mock).mockResolvedValueOnce({
      id: blogId,
      title: 'Deleted Blog', 
    });

    const result = await blogService.deleteBlogPost(blogId);

    expect(prisma.blog.delete).toHaveBeenCalledWith({
      where: { id: blogId },
    });
    expect(result).toEqual({
      id: blogId,
      title: 'Deleted Blog',
    });
  });

  it('should delete all blog posts', async () => {
    (prisma.blog.deleteMany as jest.Mock).mockResolvedValueOnce({
      count: 5, 
    });

    const result = await blogService.deleteAllBlogPost();

    expect(prisma.blog.deleteMany).toHaveBeenCalledWith({});
    expect(result).toEqual({
      count: 5,
    });
  });
});
