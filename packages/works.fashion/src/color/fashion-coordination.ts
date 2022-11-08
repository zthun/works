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
   * only applies to the main contrast.
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
  private _complementary: _IZFashionCoordination;

  /**
   * Initializes a new instance of this object.
   *
   * The default complementary pair is white and black
   * for the main and contrast values respectively.
   */
  public constructor() {
    this._complementary = {
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
    this._complementary.name = name;
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
    this._complementary.main = fashion;
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
    this._complementary.contrast = fashion;
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
    this._complementary.dark = fashion;
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
    this._complementary.light = fashion;
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
    this._complementary = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Builds the complementary object.
   *
   * @returns
   *        The built complementary object.
   */
  public build(): IZFashionCoordination {
    return Object.freeze(JSON.parse(JSON.stringify(this._complementary)));
  }
}
