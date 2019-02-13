/* tslint:disable:no-unused */
import { IPost } from '../../entities/Post';

export class PostService {
  public async getPosts(): Promise<IPost[]> {
    return [
      {
        userId: 1,
        id: 1,
        title: 'Lorem ipsum',
        body: 'Dolor sit amet'
      },
      {
        userId: 1,
        id: 2,
        title: 'Lorem ipsum dolor',
        body: 'Dolor sit amet'
      }
    ];
  }

  public async createPost(data: IPost): Promise<IPost> {
    return {
      ...data,
      id: 3,
      userId: 1
    };
  }

  public async savePost(data: IPost): Promise<IPost> {
    if (data.id !== 3) {
      throw new Error();
    }
    return {
      ...data,
      id: 3,
      userId: 1
    };
  }
}
