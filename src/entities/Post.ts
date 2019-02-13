export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  copyData?: (data: any) => void;
  isValidTitle?: (additionalValidator?: (value: string) => boolean) => boolean;
  isValidBody?: (additionalValidator?: (value: string) => boolean) => boolean;
  isValid?: () => boolean;
}

export class Post implements IPost {
  public userId: number = 0;
  public id: number = 0;
  public title: string = '';
  public body: string = '';

  /**
   * Private properties to store validation states
   * when the application validates fields separetely
   * and/or use additional validations
   */
  private _validTitle: boolean | undefined;
  private _validBody: boolean | undefined;

  /**
   * Returns if title property is valid based on the internal validator
   * and an optional extra validator
   * @memberof Post
   * @param validator Additional validation function
   * @returns boolean
   */
  public isValidTitle(validator?: (value: string) => boolean): boolean {
    this._validTitle =
      this._validateTitle() && (!validator ? true : validator(this.title));
    return this._validTitle;
  }

  /**
   * Returns if body property is valid based on the internal validator
   * and an optional extra validator
   * @memberof Post
   * @param validator Additional validation function
   * @returns boolean
   */
  public isValidBody(validator?: (value: string) => boolean): boolean {
    this._validBody =
      this._validateBody() && (!validator ? true : validator(this.body));
    return this._validBody;
  }

  /**
   * Returns if the post object is valid
   * It should not use internal (private) validation methods
   * if previous property validation methods were used
   * @memberof Post
   * @returns boolean
   */
  public isValid(): boolean {
    if (
      (this._validTitle && this._validBody) ||
      (this._validTitle &&
        this._validBody === undefined &&
        this._validateBody()) ||
      (this._validTitle === undefined &&
        this._validateTitle() &&
        this._validBody) ||
      (this._validTitle === undefined &&
        this._validBody === undefined &&
        this._validateTitle() &&
        this._validateBody())
    ) {
      return true;
    }

    return false;
  }

  /**
   * Copy propriesties from an object to
   * instance properties
   * @memberof Post
   * @param data object
   */
  public copyData(data: any): void {
    const { id, userId, title, body } = data;

    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  /**
   * Validates title property
   * It should be not empty and should not have more than 256 characters
   * @memberof Post
   * @returns boolean
   */
  private _validateTitle(): boolean {
    return this.title.trim() !== '' && this.title.trim().length < 256;
  }

  /**
   * Validates body property
   * It should not be empty and should not have less than 10 characters
   * @memberof Post
   * @returns boolean
   */
  private _validateBody(): boolean {
    return this.body.trim() !== '' && this.body.trim().length > 10;
  }
}
