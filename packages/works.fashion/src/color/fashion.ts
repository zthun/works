import { ZHue } from './hue';
import { ZShade } from './shade';

/**
 * Represents a color fashion.
 */
export interface IZFashion {
  /**
   * The base color.
   *
   * If this is null, then the hue should be considered transparent.
   */
  readonly hue: ZHue | null;

  /**
   * The shade of color.
   *
   * Shade is the process of adding black to a hue baseline.
   */
  readonly shade: ZShade;
}

/**
 * Represents a builder for a fashion object.
 */
export class ZFashionBuilder {
  private _fashion: { -readonly [P in keyof IZFashion]: IZFashion[P] };

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._fashion = {
      hue: null,
      shade: 400
    };
  }

  /**
   * Sets the color of the fashion object.
   *
   * @param color
   *        The fashion color.
   *
   * @returns
   *        This object.
   */
  public hue(color: ZHue | null): this {
    this._fashion.hue = color;
    return this;
  }

  /**
   * Sets the shade.
   *
   * @param shade
   *        The amount of black to add.
   *
   * @returns
   *        This object.
   */
  public shade(shade: ZShade): this {
    this._fashion.shade = shade;
    return this;
  }

  /**
   * Sets the color and shade.
   *
   * @param color
   *        The color to set.
   * @param shade
   *        The optional shade to set.  If this is
   *        falsy, then the shade is left alone.
   *
   * @returns
   *        This object.
   */
  private _color(color: ZHue | null, shade?: ZShade): this {
    this.hue(color);

    if (shade != null) {
      this.shade(shade);
    }

    return this;
  }

  public transparent = this.hue.bind(this, null);
  public white = this.hue.bind(this, ZHue.White);
  public red = this._color.bind(this, ZHue.Red);
  public pink = this._color.bind(this, ZHue.Pink);
  public purple = this._color.bind(this, ZHue.Purple);
  public violet = this._color.bind(this, ZHue.Violet);
  public indigo = this._color.bind(this, ZHue.Indigo);
  public blue = this._color.bind(this, ZHue.Blue);
  public sky = this._color.bind(this, ZHue.Sky);
  public cyan = this._color.bind(this, ZHue.Cyan);
  public teal = this._color.bind(this, ZHue.Teal);
  public green = this._color.bind(this, ZHue.Green);
  public olive = this._color.bind(this, ZHue.Olive);
  public lime = this._color.bind(this, ZHue.Lime);
  public yellow = this._color.bind(this, ZHue.Yellow);
  public amber = this._color.bind(this, ZHue.Amber);
  public orange = this._color.bind(this, ZHue.Orange);
  public persimmon = this._color.bind(this, ZHue.Persimmon);
  public brown = this._color.bind(this, ZHue.Brown);
  public grey = this._color.bind(this, ZHue.Grey);
  public black = this.hue.bind(this, ZHue.Black);

  /**
   * Copies another fashion object into this object.
   *
   * @param fashion
   *        The fashion object to copy.
   *
   * @returns
   *        This object.
   */
  public copy(fashion: IZFashion): this {
    this._fashion = JSON.parse(JSON.stringify(fashion));
    return this;
  }

  /**
   * Builds the color fashion object.
   *
   * @returns
   *        A copy of the built color fashion.
   */
  public build(): IZFashion {
    return Object.freeze(JSON.parse(JSON.stringify(this._fashion)));
  }
}
