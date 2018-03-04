import { IPost } from '../entities/Post';
import { IPostService, PostService } from '../services/PostService';

export interface IPostInteractor {
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
    let response;

    try {
      response = await this._service.createPost(data);
    } catch (err) {
      throw new Error('Error creating post');
    }

    return response;
  }

  public async savePost(data: IPost): Promise<IPost> {
    let response;

    try {
      response = await this._service.savePost(data);
    } catch (err) {
      throw new Error('Error saving post');
    }

    return response;
  }
}
