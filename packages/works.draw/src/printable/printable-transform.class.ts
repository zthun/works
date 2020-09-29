import { IZPrintable } from './printable.interface';

/**
 * Represents a printable transformation that will apply a transformation matrix to the context.
 */
export class ZPrintableTransform implements IZPrintable {
  public scaleX = 1;
  public skewY = 0;
  public skewX = 0;
  public scaleY = 1;
  public translateX = 0;
  public translateY = 0;

  /**
   * Resets the transform back to the identity.
   *
   * @returns This object.
   */
  public reset() {
    this.scaleX = 1;
    this.skewY = 0;
    this.skewX = 0;
    this.scaleY = 1;
    this.translateX = 0;
    this.translateY = 0;
    return this;
  }

  /**
   * Sets the scale on the transformation.
   *
   * @param sx The x scale.
   * @param sy The y scale.
   *
   * @returns This object.
   */
  public scale(sx: number, sy: number): this {
    this.scaleX = sx;
    this.scaleY = sy;
    return this;
  }

  /**
   * Sets the skew.
   *
   * @param sx The x skew.
   * @param sy The y skew.
   *
   * @returns This object.
   */
  public skew(sx: number, sy: number): this {
    this.skewX = sx;
    this.skewY = sy;
    return this;
  }

  /**
   * Sets the translation.
   *
   * @param mx The horizontal translation.
   * @param my The vertical translation.
   *
   * @returns This object.
   */
  public translate(mx: number, my: number): this {
    this.translateX = mx;
    this.translateY = my;
    return this;
  }

  /**
   * Applies the current transformation matrix to the canvas context.
   *
   * @param context The context to apply the transformation on.
   */
  public print(context: CanvasRenderingContext2D) {
    context.transform(this.scaleX, this.skewY, this.skewX, this.scaleY, this.translateX, this.translateY);
  }
}
