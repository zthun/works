/**
 * Represents an app in the zthunworks domain.
 */
export interface IZApplication {
  /**
   * The app identifier.
   */
  _id: string;

  /**
   * The application name.
   */
  name?: string;

  /**
   * A short subtitle for the application.
   */
  short?: string;

  /**
   * The application description.
   */
  description?: string;

  /**
   * The domain uri of the application.
   */
  domain?: string;

  /**
   * The data url of the app icon.
   */
  icon?: string;

  /**
   * The url for the source code if open sourced.
   */
  source?: string;
}

/**
 * Represents a builder for a single app.
 */
export class ZApplicationBuilder {
  private _app: IZApplication;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._app = { _id: '' };
  }

  /**
   * Sets the app id.
   *
   * @param id -
   *        The app id.
   *
   * @returns
   *        This object.
   */
  public id(id: string): this {
    this._app._id = id;
    return this;
  }

  /**
   * Sets the app name.
   *
   * @param name -
   *        The name of the app.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._app.name = name;
    return this;
  }

  /**
   * Sets the short subtitle for the app.
   *
   * @param short -
   *        The app subtitle.
   *
   * @returns
   *        This object.
   */
  public short(short: string): this {
    this._app.short = short;
    return this;
  }

  /**
   * Sets the full description for the app.
   *
   * @param description -
   *        The app description.
   *
   * @returns
   *        This object.
   */
  public description(description: string): this {
    this._app.description = description;
    return this;
  }

  /**
   * Sets the domain.
   *
   * @param domain -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public domain(domain: string): this {
    this._app.domain = domain;
    return this;
  }

  /**
   * Sets the icon.
   *
   * @param icon -
   *        The app icon.
   *
   * @returns
   *        This object.
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
   * @param source -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public source(source: string): this {
    this._app.source = source;
    return this;
  }

  /**
   * Copies another application to this builder.
   *
   * @param other -
   *        The application to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZApplication): this {
    this._app = { ...this._app, ...other };
    return this;
  }

  /**
   * Returns a copy of the built application.
   *
   * @returns A copy of the app that has currently been built.
   */
  public build(): IZApplication {
    return { ...this._app };
  }
}
