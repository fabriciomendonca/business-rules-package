import PostInteractor, { IPostInteractor } from '../interactors/PostInteractor';
import { IPost } from '../entities/Post';

export interface IPostExposer {
  initPost: () => IPost;
  posts: Promise<IPost[]>;
  createPost: (data: IPost) => Promise<IPost>;
  savePost: (data: IPost) => Promise<IPost>;
}

class PostExposer implements IPostExposer {
  constructor(private _interactor: IPostInteractor) {}

  public initPost(): IPost {
    return this._interactor.initPost();
  }

  public get posts(): Promise<IPost[]> {
    return this._interactor.getPosts();
  }

  public createPost(data: IPost): Promise<IPost> {
    return this._interactor.createPost(data);
  }

  public savePost(data: IPost): Promise<IPost> {
    return this._interactor.savePost(data);
  }
}

/* tslint:disable:no-unused */
export const postExposer: IPostExposer = new PostExposer(
  PostInteractor.getInstance()
);
