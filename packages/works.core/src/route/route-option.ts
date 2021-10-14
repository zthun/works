import { ZHttpMethod } from '@zthun/works.http';

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
  method: ZHttpMethod;
}

/**
 * Represents a builder for an api option.
 */
export class ZRouteOptionBuilder {
  private _option: IZRouteOption;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._option = {
      path: '',
      method: ZHttpMethod.Get
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
    this._option.owner = id;
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
    this._option.path = path;
    return this;
  }

  /**
   * Gets the http verb that can access the route option.
   *
   * @param method The http method that can access the path.
   *
   * @returns This object.
   */
  public method(method: ZHttpMethod): this {
    this._option.method = method;
    return this;
  }

  /**
   * Copies another route option to this object.
   *
   * @param other The route option to copy.
   *
   * @returns This object.
   */
  public copy(other: IZRouteOption): this {
    this._option = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the route option.
   *
   * @returns The build object.
   */
  public build(): IZRouteOption {
    return JSON.parse(JSON.stringify(this._option));
  }
}
