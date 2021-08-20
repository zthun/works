/**
 * Represents an app in the zthunworks domain.
 */
export interface IZWebApp {
  /**
   * The app identifier.
   */
  _id: string;

  /**
   * The application name.
   */
  name: string;

  /**
   * The domain uri of the application.
   */
  domain: string;

  /**
   * The data url of the app icon.
   */
  icon: string;

  /**
   * The url for the source code if open sourced.
   */
  source?: string;
}

/**
 * Represents a builder for a single app.
 */
export class ZWebAppBuilder {
  private _app: IZWebApp;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._app = {
      _id: null,
      name: null,
      domain: null,
      icon: null
    };
  }

  /**
   * Sets the app id.
   *
   * @param id The app id.
   *
   * @returns This object.
   */
  public id(id: string): this {
    this._app._id = id;
    return this;
  }

  /**
   * Sets the app name.
   *
   * @param name The name of the app.
   *
   * @returns This object.
   */
  public name(name: string): this {
    this._app.name = name;
    return this;
  }

  /**
   * Sets the domain.
   *
   * @param domain The value to set.
   *
   * @returns This object.
   */
  public domain(domain: string): this {
    this._app.domain = domain;
    return this;
  }

  /**
   * Sets the icon.
   *
   * @param icon The app icon.
   *
   * @returns This object.
   */
  public icon(icon: string): this {
    this._app.icon = icon;
    return this;
  }

  /**
   * Sets the source code url.
   *
   * This will normally be for github or bitbucket.
   *
   * @param source The value to set.
   *
   * @returns This object.
   */
  public source(source: string): this {
    this._app.source = source;
    return this;
  }

  /**
   * Returns a copy of the built application.
   *
   * @returns A copy of the app that has currently been built.
   */
  public build(): IZWebApp {
    return { ...this._app };
  }
}