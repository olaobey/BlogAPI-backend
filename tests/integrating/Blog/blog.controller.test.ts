import { Request, Response } from 'express';
import { BlogController } from '../../../src/api/blog/blog.controller';
import { BlogService } from '../../../src/api/blog/blog.service';

describe('BlogController', () => {
  let blogController: BlogController;
  let blogService: BlogService;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    // Initialize the controller, service, and request/response objects
    blogService = new BlogService();
    blogController = new BlogController();
    request = {} as Request; 
    response = {} as Response; 
    response.status = jest.fn().mockReturnThis();
    response.json = jest.fn();
  });

  it('should create a new blog post', async () => {
    request.body = {
      title: 'Test Blog',
      content: 'This is a test blog content.',
      description: 'Test blog description.',
    };

    // Mock the service method
    const createBlogSpy = jest
      .spyOn(blogService, 'createBlogPost')
      .mockResolvedValue({ id: '1', ...request.body });

    // Call the controller method
    await blogController.createBlogPost(request, response);

    // Assertions
    expect(createBlogSpy).toHaveBeenCalledWith(request.body);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalled();
  });

  it('should get a blog post by ID', async () => {
    const id = '1';
    request.params = { id };

    // Mock the service method
    const blogData = { id, title: 'Test Blog', content: 'Test content', description: 'Test description' };
    const getBlogSpy = jest
      .spyOn(blogService, 'getBlogPost')
      .mockResolvedValue(blogData); 

    // Call the controller method
    await blogController.getBlogPost(request, response);

    // Assertions
    expect(getBlogSpy).toHaveBeenCalledWith(id);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ data: blogData, success: true });
  });

  it('should get all blog posts', async () => {
    request.query = {
      page: '1',
      limit: '10',
      search: 'searchKeyword',
    };

    // Mock the service method
    const getAllBlogPostsSpy = jest
      .spyOn(blogService, 'getAllBlogPosts')
      .mockResolvedValue([
        // Mocked response from the service
        {
          id: '1',
          title: 'Blog 1',
          content: 'Content 1',
          description: 'Description 1',
        },
        {
          id: '2',
          title: 'Blog 2',
          content: 'Content 2',
          description: 'Description 2',
        },
      ]);

    // Call the controller method
    await blogController.getAllBlogPosts(request, response);

    // Assertions
    expect(getAllBlogPostsSpy).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: {
        title: {
          contains: 'searchKeyword',
        },
      },
    });

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Blogs retrieved successfully',
      data: {
        object: 'list',
        has_more: false, 
        data: [
          {
            id: '1',
            title: 'Blog 1',
            content: 'Content 1',
            description: 'Description 1',
          },
          {
            id: '2',
            title: 'Blog 2',
            content: 'Content 2',
            description: 'Description 2',
          },
        ],
        pageCount: 1, 
        itemCount: 2, 
        currentPage: '1',
        pages: [1],
      },
      success: true,
    });
  });

  it('should update a blog post', async () => {
    request.body = {
      id: '1',
      title: 'Updated Blog',
      content: 'Updated blog content.',
      description: 'Updated blog description.',
    };

    // Mock the service method
    const updateBlogPostSpy = jest
      .spyOn(blogService, 'updateBlogPost')
      .mockResolvedValue(request.body); 
    // Call the controller method
    await blogController.updateBlogPost(request, response);

    // Assertions
    expect(updateBlogPostSpy).toHaveBeenCalledWith(request.body);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Blog post updated successfully',
      data: request.body,
      success: true,
    });
  });

  it('should like a blog post', async () => {
    // Prepare request params
    request.params = { id: '1' };

    // Mock the service method
    const likeBlogPostSpy = jest
      .spyOn(blogService, 'likeBlogPost')
      .mockResolvedValue({
        id: '1',
        title: 'Liked Blog',
        content: 'Liked blog content.',
        description: 'Liked blog description.',
      }); 

    // Call the controller method
    await blogController.likeBlogPost(request, response);

    // Assertions
    expect(likeBlogPostSpy).toHaveBeenCalledWith('1');
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      data: {
        id: '1',
        title: 'Liked Blog',
        content: 'Liked blog content.',
        description: 'Liked blog description.',
      },
      success: true,
    });
  });

  it('should view a blog post', async () => {
    // Prepare request params
    request.params = { id: '1' };

    // Mock the service method
    const viewBlogPostSpy = jest
      .spyOn(blogService, 'viewBlogPost')
      .mockResolvedValue({
        id: '1',
        title: 'Viewed Blog',
        content: 'Viewed blog content.',
        description: 'Viewed blog description.',
      });

    // Call the controller method
    await blogController.viewBlogPost(request, response);

    // Assertions
    expect(viewBlogPostSpy).toHaveBeenCalledWith('1');
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      data: {
        id: '1',
        title: 'Viewed Blog',
        content: 'Viewed blog content.',
        description: 'Viewed blog description.',
      },
      success: true,
    });
  });

  it('should delete a blog post by ID', async () => {
    // Prepare request params
    request.params = { id: '1' };

    // Mock the service method
    const deleteBlogPostSpy = jest
      .spyOn(blogService, 'deleteBlogPost')
      .mockResolvedValue({
        id: '1',
        title: 'Deleted Blog',
        content: 'Deleted blog content.',
        description: 'Deleted blog description.',
      }); 

    // Call the controller method
    await blogController.deleteBlogPost(request, response);

    // Assertions
    expect(deleteBlogPostSpy).toHaveBeenCalledWith('1');
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      data: 'Blog \'Deleted Blog\' with ID 1 has been successfully deleted',
      success: true,
    });
  });

  it('should delete all blog posts', async () => {
    // Mock the service method
    const deleteAllBlogPostSpy = jest
      .spyOn(blogService, 'deleteAllBlogPost')
      .mockResolvedValue([
        // Mocked response from the service
        {
          id: '1',
          title: 'Deleted Blog 1',
          content: 'Deleted blog content 1.',
          description: 'Deleted blog description 1.',
        },
        {
          id: '2',
          title: 'Deleted Blog 2',
          content: 'Deleted blog content 2.',
          description: 'Deleted blog description 2.',
        },
        
      ]);

    // Call the controller method
    await blogController.deleteAllBlogPost(request, response);

    // Assertions
    expect(deleteAllBlogPostSpy).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      data: [
        {
          id: '1',
          title: 'Deleted Blog 1',
          content: 'Deleted blog content 1.',
          description: 'Deleted blog description 1.',
        },
        {
          id: '2',
          title: 'Deleted Blog 2',
          content: 'Deleted blog content 2.',
          description: 'Deleted blog description 2.',
        },
      ],
      success: true,
    });
  });
});
  
