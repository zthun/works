import { IZFashion, ZFashionBuilder } from './fashion';

/**
 * Represents a pair of fashion objects that represents complementary colors.
 */
interface _IZFashionComplements {
  /**
   * The main fashion color.
   */
  main: IZFashion;
  /**
   * The color that contrasts the main.
   */
  contrast: IZFashion;
}

/**
 * Represents a pair of fashion objects that represents complementary colors.
 */
export type IZFashionComplements = Readonly<_IZFashionComplements>;

/**
 * Represents a builder for a complementary fashion objects.
 */
export class ZFashionComplementsBuilder {
  private _complementary: _IZFashionComplements;

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
   * Clones another fashion complements object into this builder object.
   *
   * @param other
   *        The complements object to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZFashionComplements): this {
    this._complementary = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Builds the complementary object.
   *
   * @returns
   *        The built complementary object.
   */
  public build(): IZFashionComplements {
    return Object.freeze(JSON.parse(JSON.stringify(this._complementary)));
  }
}
