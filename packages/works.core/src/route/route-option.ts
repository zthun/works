/**
 * Represents a potential api option path.
 */
export interface IZRouteOption {
  /**
   * The owner of the api route.
   */
  owner?: string;

  /**
   * The route path.
   */
  path: string;

  /**
   * The http method to access the route.
   */
  method: 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head';
}

/**
 * Represents a builder for an api option.
 */
export class ZRouteOptionBuilder {
  private _route: IZRouteOption;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._route = {
      path: '',
      method: 'get'
    };
  }

  /**
   * Specifies the owner of this route option.
   *
   * @param id The id of the owner application.
   *
   * @returns This object.
   */
  public owner(id: string): this {
    this._route.owner = id;
    return this;
  }

  /**
   * Specifies the route path.
   *
   * @param path The route path.
   *
   * @returns This object.
   */
  public path(path: string): this {
    this._route.path = path;
    return this;
  }

  /**
   * Sets the http verb that can access the route option.
   *
   * @param method The http method that can access the path.
   *
   * @returns This object.
   */
  public method(method: 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head'): this {
    this._route.method = method;
    return this;
  }

  /**
   * Sets the http verb to get.
   *
   * @returns This object.
   */
  public get = this.method.bind(this, 'get');

  /**
   * Sets the http verb to put.
   *
   * @returns This object.
   */
  public put = this.method.bind(this, 'put');

  /**
   * Sets the http verb to post.
   *
   * @returns This object.
   */
  public post = this.method.bind(this, 'post');

  /**
   * Sets the http verb to delete.
   *
   * @returns This object.
   */
  public delete = this.method.bind(this, 'delete');

  /**
   * Sets the http verb to patch.
   *
   * @returns This object.
   */
  public patch = this.method.bind(this, 'patch');

  /**
   * Sets the http verb to option.
   *
   * @returns This object.
   */
  public options = this.method.bind(this, 'options');

  /**
   * Sets the http verb to head.
   *
   * @returns This object.
   */
  public head = this.method.bind(this, 'head');

  /**
   * Copies another route option to this object.
   *
   * @param other The route option to copy.
   *
   * @returns This object.
   */
  public copy(other: IZRouteOption): this {
    this._route = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the route option.
   *
   * @returns The build object.
   */
  public build(): IZRouteOption {
    return JSON.parse(JSON.stringify(this._route));
  }
}
