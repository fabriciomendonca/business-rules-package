import { IPost, Post } from '../entities/Post';
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

  it('should return a new post object', () => {
    const post = interactor.initPost() as Post;

    expect(post.title).toBe('');
    expect(post.isValidTitle()).toBeFalsy();

    post.title = 'Valid title';
    expect(post.isValidTitle()).toBeTruthy();
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
    const data: IPost = new Post();
    data.title = 'Lorem ipsum dolor';
    data.body = 'Dolor sit amet';

    const post = await interactor.createPost(data);

    expect(post).toBeDefined();
    expect(post.id).toBe(3);
    expect(post.title).toEqual(data.title);
    expect(post.title).toEqual(data.title);
  });

  it('should throw there is no post data', async () => {
    // tslint:disable-next-line: no-unused
    let post;
    let error;
    try {
      post = await interactor.createPost(undefined);
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('No post data provided');
  });

  it('should throw post data is invalid when creating post', async () => {
    const data: IPost = new Post();
    data.body = 'Dolor sit amet';

    // tslint:disable-next-line: no-unused
    let post;
    let error;
    try {
      post = await interactor.createPost(data);
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe('The post data is invalid');
  });

  it('should throw a service error when creating a post', async () => {
    PostService.prototype.createPost = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    let error;
    const data: IPost = new Post();
    data.title = 'Lorem ipsum dolor';
    data.body = 'Dolor sit amet';

    try {
      await interactor.createPost(data);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toBe('Server error when trying to create the post');
  });

  it('should save a new post', async () => {
    const data: IPost = new Post();
    data.userId = 1;
    data.id = 3;
    data.title = 'Lorem ipsum dolor edited';
    data.body = 'Dolor sit amet';

    const post = await interactor.savePost(data);

    expect(post).toBeDefined();
    expect(post.id).toBe(3);
    expect(post.title).toEqual(data.title);
    expect(post.title).toEqual(data.title);
  });

  it('should throw a service error when saving a post', async () => {
    const data: IPost = new Post();
    data.userId = 1;
    data.id = 2;
    data.title = 'Lorem ipsum dolor edited';
    data.body = 'Dolor sit amet';

    let error;
    try {
      await interactor.savePost(data);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.message).toBe('Server error when trying to save the post');
  });
});
