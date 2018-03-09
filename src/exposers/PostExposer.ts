import PostInteractor, { IPostInteractor } from '../interactors/PostInteractor';
import { IPost } from '../entities/Post';

export interface IPostExposer {
  initPost: () => IPost;
  posts: Promise<IPost[]>;
}

class PostExposer implements IPostExposer {
  constructor(private _interactor: IPostInteractor) {}

  public initPost(): IPost {
    return this._interactor.initPost();
  }

  public get posts(): Promise<IPost[]> {
    return this._interactor.getPosts();
  }
}

/* tslint:disable:no-unused */
export const postExposer: IPostExposer = new PostExposer(PostInteractor.getInstance());
