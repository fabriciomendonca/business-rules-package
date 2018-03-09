import { IPost, Post } from '../entities/Post';
import { IPostService, PostService } from '../services/PostService';

export interface IPostInteractor {
  initPost: () => IPost;
  getPosts: () => Promise<IPost[]>;
  createPost: (data: IPost) => Promise<IPost>;
  savePost: (data: IPost) => Promise<IPost>;
}

export default class PostInteractor implements IPostInteractor {
  private static _instance: IPostInteractor = new PostInteractor(new PostService());

  public static getInstance(): IPostInteractor {
    return this._instance;
  }

  public static resetInstance(): void {
    this._instance = new PostInteractor(new PostService());
  }

  private _posts: IPost[];
  private constructor(private _service: IPostService) {}

  public initPost(): IPost {
    return new Post();
  }

  public async getPosts(): Promise<IPost[]> {
    if (this._posts !== undefined) {
      return this._posts;
    }

    let response;

    try {
      response = await this._service.getPosts();
    } catch (err) {
      throw new Error('Error fetching posts');
    }

    this._posts = response;
    return this._posts;
  }

  public async createPost(data: IPost): Promise<IPost> {
    this._checkPostData(data);
    let response;

    try {
      response = await this._service.createPost(data);
    } catch (err) {
      throw new Error('Server error when trying to create the post');
    }

    return response;
  }

  public async savePost(data: IPost): Promise<IPost> {
    this._checkPostData(data);
    let response;

    try {
      response = await this._service.savePost(data);
    } catch (err) {
      throw new Error('Server error when trying to save the post');
    }

    return response;
  }

  private _checkPostData(data: IPost): void {
    if (!data) {
      throw new Error('No post data provided');
    }

    if (data.isValid && !data.isValid()) {
      throw new Error('The post data is invalid');
    }
  }
}
