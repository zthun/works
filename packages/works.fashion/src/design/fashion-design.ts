import { ZFashionBuilder } from '../color/fashion';
import { IZFashionCoordination, ZFashionCoordinationBuilder } from '../color/fashion-coordination';
import { IZPalette, ZPaletteBuilder } from '../color/palette';

/**
 * Represents the minimal fashion design that includes only the palette.
 */
export interface IZFashionDesignScheme {
  /**
   * The pallette for the fashion design.
   */
  readonly palette: IZPalette;
}

/**
 * Represents a fashion design scheme that contains a primary and secondary priority.
 */
export interface IZFashionDesignPriority extends IZFashionDesignScheme {
  /**
   * The fashion for the primary priority.
   */
  readonly primary: IZFashionCoordination;
  /**
   * The fashion for the secondary priority.
   */
  readonly secondary: IZFashionCoordination;
}

/**
 * Represents a fashion design scheme that contains the severity fashions.
 */
export interface IZFashionDesignSeverity extends IZFashionDesignScheme {
  /**
   * The fashion for the success severity.
   */
  readonly success: IZFashionCoordination;
  /**
   * The fashion for the warning severity.
   */
  readonly warning: IZFashionCoordination;
  /**
   * The fashion for the error severity.
   */
  readonly error: IZFashionCoordination;
  /**
   * The fashion for the info severity.
   */
  readonly info: IZFashionCoordination;
}

/**
 * Represents a fashion design scheme for dark and light.
 */
export interface IZFashionDesignSpectrum {
  /**
   * The fashion for dark mode.
   */
  readonly dark: IZFashionCoordination;
  /**
   * The fashion for light mode.
   */
  readonly light: IZFashionCoordination;
}

/**
 * Represents a general fashion design that includes the common types.
 */
export interface IZFashionDesign extends IZFashionDesignPriority, IZFashionDesignSeverity, IZFashionDesignSpectrum {}

/**
 * Represents a builder for a fashion design.
 *
 * This builder will give you a baseline for a fashion
 * design with the default palette and the most basic of colors.
 *
 * If all you do with this is override the palette, then you
 * should have a generally good scheme for your fashion needs.
 */
export class ZFashionDesignBuilder {
  private _design: { -readonly [P in keyof IZFashionDesign]: IZFashionDesign[P] };

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._design = {
      palette: new ZPaletteBuilder().build(),
      primary: new ZFashionCoordinationBuilder()
        .name('Primary')
        .main(new ZFashionBuilder().indigo(400).build())
        .light(new ZFashionBuilder().indigo(200).build())
        .dark(new ZFashionBuilder().indigo(600).build())
        .contrast(new ZFashionBuilder().white().build())
        .build(),
      secondary: new ZFashionCoordinationBuilder()
        .name('Secondary')
        .main(new ZFashionBuilder().violet(600).build())
        .light(new ZFashionBuilder().violet(400).build())
        .dark(new ZFashionBuilder().violet(800).build())
        .contrast(new ZFashionBuilder().white().build())
        .build(),
      success: new ZFashionCoordinationBuilder()
        .name('Success')
        .main(new ZFashionBuilder().green(800).build())
        .light(new ZFashionBuilder().green(600).build())
        .dark(new ZFashionBuilder().green(900).build())
        .contrast(new ZFashionBuilder().white().build())
        .build(),
      warning: new ZFashionCoordinationBuilder()
        .name('Warning')
        .main(new ZFashionBuilder().amber(400).build())
        .light(new ZFashionBuilder().amber(300).build())
        .dark(new ZFashionBuilder().amber(500).build())
        .contrast(new ZFashionBuilder().black().build())
        .build(),
      error: new ZFashionCoordinationBuilder()
        .name('Error')
        .main(new ZFashionBuilder().red(700).build())
        .light(new ZFashionBuilder().red(500).build())
        .dark(new ZFashionBuilder().red(900).build())
        .contrast(new ZFashionBuilder().white().build())
        .build(),
      info: new ZFashionCoordinationBuilder()
        .name('Info')
        .main(new ZFashionBuilder().sky(400).build())
        .light(new ZFashionBuilder().sky(200).build())
        .dark(new ZFashionBuilder().sky(600).build())
        .contrast(new ZFashionBuilder().black().build())
        .build(),
      light: new ZFashionCoordinationBuilder()
        .name('Light')
        .main(new ZFashionBuilder().grey(200).build())
        .light(new ZFashionBuilder().grey(100).build())
        .dark(new ZFashionBuilder().grey(300).build())
        .contrast(new ZFashionBuilder().black().build())
        .build(),
      dark: new ZFashionCoordinationBuilder()
        .name('Dark')
        .main(new ZFashionBuilder().grey(700).build())
        .light(new ZFashionBuilder().grey(600).build())
        .dark(new ZFashionBuilder().grey(800).build())
        .contrast(new ZFashionBuilder().white().build())
        .build()
    };
  }

  /**
   * Sets the pallette for this fashion object.
   *
   * @param palette
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public palette(palette: IZPalette): this {
    this._design.palette = palette;
    return this;
  }

  /**
   * Sets the primary coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public primary(fashion: IZFashionCoordination): this {
    this._design.primary = fashion;
    return this;
  }

  /**
   * Sets the secondary coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public secondary(fashion: IZFashionCoordination): this {
    this._design.secondary = fashion;
    return this;
  }

  /**
   * Sets the success coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public success(fashion: IZFashionCoordination): this {
    this._design.success = fashion;
    return this;
  }

  /**
   * Sets the warning coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public warning(fashion: IZFashionCoordination): this {
    this._design.warning = fashion;
    return this;
  }

  /**
   * Sets the error coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public error(fashion: IZFashionCoordination): this {
    this._design.error = fashion;
    return this;
  }

  /**
   * Sets the info coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public info(fashion: IZFashionCoordination): this {
    this._design.info = fashion;
    return this;
  }

  /**
   * Sets the light coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public light(fashion: IZFashionCoordination): this {
    this._design.light = fashion;
    return this;
  }

  /**
   * Sets the dark coordination
   *
   * @param fashion
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public dark(fashion: IZFashionCoordination): this {
    this._design.dark = fashion;
    return this;
  }

  /**
   * Copies another design into this design.
   *
   * @param other
   *        The fashion design to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZFashionDesign): this {
    this._design = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the built copy of the fashion design.
   *
   * @returns
   *        A deep copy of the built design.
   */
  public build(): IZFashionDesign {
    return Object.freeze(JSON.parse(JSON.stringify(this._design)));
  }
}
