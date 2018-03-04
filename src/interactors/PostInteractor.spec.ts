import { IPost } from '../entities/Post';
import PostInteractor, { IPostInteractor } from './PostInteractor';
import { PostService } from '../services/PostService';

jest.mock('../services/PostService');

describe('PostInteractor', () => {
  let interactor: IPostInteractor = PostInteractor.getInstance();
  const getPosts = PostService.prototype.getPosts;
  const createPost = PostService.prototype.createPost;

  beforeEach(() => {
    PostService.prototype.getPosts = getPosts;
    PostService.prototype.createPost = createPost;
  });

  it('should get a list of posts', async () => {
    PostService.prototype.getPosts = jest.fn().mockImplementationOnce(() => {
      return getPosts();
    });

    const posts = await interactor.getPosts();

    const spy = jest.spyOn(PostService.prototype, 'getPosts');

    expect(spy).toHaveBeenCalled();
    expect(posts.length).toBe(2);
    expect(posts[0].title).toContain('Lorem ipsum');

    spy.mockClear();
  });

  it('should return the existing posts list', async () => {
    PostService.prototype.getPosts = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    const posts = await interactor.getPosts();

    const spy = jest.spyOn(PostService.prototype, 'getPosts');

    expect(spy).not.toHaveBeenCalled();
    expect(posts.length).toBe(2);
    expect(posts[0].title).toContain('Lorem ipsum');

    spy.mockClear();
  });

  it('should reset the instance and throw an error while fetching posts', async () => {
    PostInteractor.resetInstance();
    interactor = PostInteractor.getInstance();
    PostService.prototype.getPosts = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    let error;
    try {
      await interactor.getPosts();
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('Error fetching posts');
  });

  it('should create a new post', async () => {
    const data: IPost = {
      userId: 0,
      id: 0,
      title: 'Lorem ipsum dolor',
      body: 'Dolor sit amet',
    };

    const post = await interactor.createPost(data);

    expect(post).toBeDefined();
    expect(post.id).toBe(3);
    expect(post.title).toEqual(data.title);
    expect(post.title).toEqual(data.title);
  });

  it('should throw an error when creating a post', async () => {
    PostService.prototype.createPost = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    let error;
    const data: IPost = {
      userId: 0,
      id: 0,
      title: 'Lorem ipsum dolor',
      body: 'Dolor sit amet',
    };
    try {
      await interactor.createPost(data);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toBe('Error creating post');
  });

  it('should save a new post', async () => {
    const data: IPost = {
      userId: 1,
      id: 3,
      title: 'Lorem ipsum dolor edited',
      body: 'Dolor sit amet edited',
    };

    const post = await interactor.savePost(data);

    expect(post).toBeDefined();
    expect(post.id).toBe(3);
    expect(post.title).toEqual(data.title);
    expect(post.title).toEqual(data.title);
  });

  it('should throw an error when saving a post', async () => {
    const data: IPost = {
      userId: 1,
      id: 2,
      title: 'Lorem ipsum dolor edited',
      body: 'Dolor sit amet edited',
    };

    let error;
    try {
      await interactor.savePost(data);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toBe('Error saving post');
  });
});
