import { httpClient } from '../common/HttpClient';
import { IPost } from '../entities/Post';

export interface IPostService {
  getPosts: () => Promise<IPost[]>;
  createPost: (data: IPost) => Promise<IPost>;
  savePost: (data: IPost) => Promise<IPost>;
}

export class PostService implements IPostService {
  public async getPosts(): Promise<IPost[]> {
    const response = await httpClient.get<IPost[]>('/posts');
    return response;
  }

  public async createPost(data: IPost): Promise<IPost> {
    const { title, body } = data;
    const response = await httpClient.post<IPost>('/posts', { title, body });

    return response;
  }

  public async savePost(data: IPost): Promise<IPost> {
    const { id, title, body } = data;
    const response = await httpClient.patch<IPost>(`/posts/${id}`, {
      title,
      body
    });

    return response;
  }
}
