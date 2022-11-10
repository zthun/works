import { IZFashion, ZFashionBuilder } from './fashion';

/**
 * Represents a set of fashion colors that create a coordinated fashion grouping.
 */
interface _IZFashionCoordination {
  /**
   * Optional name of the fashion coordination.
   */
  name?: string;

  /**
   * The main fashion color.
   */
  main: IZFashion;

  /**
   * The lighter color.
   *
   * Should just use main if this is falsy.
   */
  light?: IZFashion;

  /**
   * The dark color.
   *
   * Should just use main if this is falsy.
   */
  dark?: IZFashion;

  /**
   * The color that contrasts the main.
   *
   * Note that it is not a requirement for this to
   * contract the light and dark fashions.  This
   * only applies to the main fashion.
   */
  contrast: IZFashion;
}

/**
 * Represents a pair of fashion objects that represents complementary colors.
 */
export type IZFashionCoordination = Readonly<_IZFashionCoordination>;

/**
 * Represents a builder for a complementary fashion objects.
 */
export class ZFashionCoordinationBuilder {
  private _coordination: _IZFashionCoordination;

  /**
   * Initializes a new instance of this object.
   *
   * The default complementary pair is white and black
   * for the main and contrast values respectively.
   */
  public constructor() {
    this._coordination = {
      main: new ZFashionBuilder().white().build(),
      contrast: new ZFashionBuilder().black().build()
    };
  }

  /**
   * Sets the name.
   *
   * @param name
   *        The name.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._coordination.name = name;
    return this;
  }

  /**
   * Sets the main color.
   *
   * @param fashion
   *        The main fashion.
   *
   * @returns
   *        This object.
   */
  public main(fashion: IZFashion): this {
    this._coordination.main = fashion;
    return this;
  }

  /**
   * Sets the main color.
   *
   * @param fashion
   *        The main fashion.
   *
   * @returns
   *        This object.
   */
  public contrast(fashion: IZFashion): this {
    this._coordination.contrast = fashion;
    return this;
  }

  /**
   * Sets the darker version of the main color.
   *
   * @param fashion
   *        The dark fashion.
   *
   * @returns
   *        This object.
   */
  public dark(fashion: IZFashion): this {
    this._coordination.dark = fashion;
    return this;
  }

  /**
   * Sets the light version of the main color.
   *
   * @param fashion
   *        The light fashion.
   *
   * @returns
   *        This object.
   */
  public light(fashion: IZFashion): this {
    this._coordination.light = fashion;
    return this;
  }

  /**
   * Builds a coordination for transparency.
   *
   * Note that you still need to set the contrast for this
   * since now there is no way to tell whether or not
   * the contract against the background can be.
   *
   * This sets the main to transparent and removes the light
   * and dark compliments.
   *
   * @returns
   *        This object.
   */
  public transparent(): this {
    const transparent = new ZFashionBuilder().transparent().build();
    const inherit = new ZFashionBuilder().inherit().build();
    this._coordination.main = transparent;
    this._coordination.contrast = inherit;
    delete this._coordination.light;
    delete this._coordination.dark;
    return this;
  }

  /**
   * Clones another fashion complements object into this builder object.
   *
   * @param other
   *        The complements object to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZFashionCoordination): this {
    this._coordination = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Builds the complementary object.
   *
   * @returns
   *        The built complementary object.
   */
  public build(): IZFashionCoordination {
    return Object.freeze(JSON.parse(JSON.stringify(this._coordination)));
  }
}
