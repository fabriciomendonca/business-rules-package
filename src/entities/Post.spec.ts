import { Post, IPost } from './Post';

describe('Test Post entity', () => {
  /* tslint:disable-next-line:max-line-length */
  const bigString = 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla';
  let post: IPost;

  beforeEach(() => {
    post = new Post();
  });

  it('should copy an object data into a Post instance', () => {
    const data = {
      id: 1,
      userId: 3,
      title: 'Copy',
      body: 'Copied',
    };
    post.copyData(data);

    expect(post.id).toBe(1);
    expect(post.userId).toBe(3);
    expect(post.title).toBe('Copy');
    expect(post.body).toBe('Copied');
  });

  it('should return title is invalid for empty string', () => {
    expect(post.isValidTitle()).toBeFalsy();
  });

  it('should return title is invalid using additional validator', () => {
    post.title = 'New';
    expect(post.isValidTitle((title: string): boolean => {
      return title.length > 3;
    })).toBeFalsy();
  });

  it('should return title is invalid for long titles', () => {
    post.title = bigString;
    expect(post.isValidTitle()).toBeFalsy();
  });

  it('should return title is valid', () => {
    post.title = 'New post';
    expect(post.isValidTitle()).toBeTruthy();
  });

  it('should return title is valid using additional validation', () => {
    post.title = 'Lorem ipsum';
    expect(post.isValidTitle((title: string) => {
      return title.indexOf('dolor') < 0;
    })).toBeTruthy();
  });

  it('should return body is invalid for strings with less than 10 characters', () => {
    post.body = 'Lorem ip'
    expect(post.isValidBody()).toBeFalsy();
  });

  it('should return body is invalid using additional validation', () => {
    post.body = 'Lorem ipsum dolor sit amet';
    expect(post.isValidBody((body: string): boolean => {
      return body.length > 30;
    })).toBeFalsy();
  });

  it('should return body is valid', () => {
    post.body = 'Lorem ipsum dolor sit amet';
    expect(post.isValidBody()).toBeTruthy();
  });

  it('should return body is valid using additional validation', () => {
    post.body = 'Lorem ipsum sit amet';
    expect(post.isValidBody((body: string): boolean => {
      return body.indexOf('dolor') < 0;
    })).toBeTruthy();
  });

  it('should return post is invalid without previous validation', () => {
    expect(post.isValid()).toBeFalsy();
  });

  it('should return post is valid without previous validation', () => {
    post.title = 'Lorem ipsum dolor sit amet';
    post.body = bigString;

    expect(post.isValid()).toBeTruthy();
  });

  it('should return post is invalid with previous title validation', () => {
    post.title = 'Lorem ipsum dolor';
    post.body = bigString;

    expect(post.isValidTitle((title: string): boolean => {
      return title.indexOf('dolor') < 0;
    })).toBeFalsy();

    expect(post.isValid()).toBeFalsy();
  });

  it('should return post is invalid with previous body validation', () => {
    post.title = 'Lorem ipsum dolor';
    post.body = 'Invalid body';

    expect(post.isValidBody((body: string): boolean => {
      return body.length > 20;
    })).toBeFalsy();

    expect(post.isValid()).toBeFalsy();
  });

  it('should return post is invalid with previous title and body validation, title is valid', () => {
    post.title = 'Lorem ipsum dolor';
    post.body = bigString;

    expect(post.isValidTitle()).toBeTruthy();
    expect(post.isValidBody((body: string): boolean => {
      return body.length < 300;
    })).toBeFalsy();

    expect(post.isValid()).toBeFalsy();
  });

  it('should return post is invalid with previous title and body validation, body is valid', () => {
    post.title = 'Lorem ipsum dolor';
    post.body = bigString;

    expect(post.isValidTitle((title: string): boolean => {
      return title.indexOf('dolor') < 0;
    })).toBeFalsy();
    expect(post.isValidBody()).toBeTruthy();

    expect(post.isValid()).toBeFalsy();
  });

  it('should return post is valid with previous title validation', () => {
    post.title = 'Lorem ipsum dolor';
    post.body = bigString;

    expect(post.isValidTitle()).toBeTruthy();
    expect(post.isValid()).toBeTruthy();
  });

  it('should return post is valid with previous body validation', () => {
    post.title = 'Lorem ipsum dolor';
    post.body = bigString;

    expect(post.isValidBody()).toBeTruthy();
    expect(post.isValid()).toBeTruthy();
  });

  it('should return post is valid with previous title and body validation', () => {
    post.title = 'Lorem ipsum';
    post.body = bigString;

    expect(post.isValidTitle((title: string): boolean => {
      return title.indexOf('dolor') < 0;
    })).toBeTruthy();
    expect(post.isValidBody()).toBeTruthy();
    expect(post.isValid()).toBeTruthy();
  });
});
