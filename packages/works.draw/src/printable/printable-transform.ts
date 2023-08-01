import { IZTransformScale } from '../transform/transform-scale';
import { IZTransformSkew } from '../transform/transform-skew';
import { IZTransformTranslate } from '../transform/transform-translate';
import { IZPrintable } from './printable';

/**
 * Represents a printable object that will apply a transformation matrix to the context.
 */
export class ZPrintableTransform implements IZPrintable, IZTransformScale, IZTransformSkew, IZTransformTranslate {
  /**
   * The x scale (a).
   */
  public scaleX = 1;

  /**
   * The y scale (d).
   */
  public scaleY = 1;

  /**
   * The x skew (c).
   */
  public skewX = 0;

  /**
   * The y skew (b)
   */
  public skewY = 0;

  /**
   * The x translation (e).
   */
  public translateX = 0;

  /**
   * The y translation (f).
   */
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
   * @param sx -
   *        The x scale.
   * @param sy -
   *        The y scale.
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
   * @param sx -
   *        The x skew.
   * @param sy -
   *        The y skew.
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
   * @param mx -
   *        The horizontal translation.
   * @param my -
   *        The vertical translation.
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
   * @param context -
   *        The context to apply the transformation on.
   */
  public print(context: CanvasRenderingContext2D) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform for transformation information.

    /*
     * The transformation matrix is described by:
     * [ a c e ]
     * [ b d f ]
     * [ 0 0 1 ]
     *
     * Where the following is true.
     *
     * a = scale (x)
     * b = skew (y)
     * c = skew (x)
     * d = scale (y)
     * e = translate (x)
     * f = translate (y)
     */
    context.transform(this.scaleX, this.skewY, this.skewX, this.scaleY, this.translateX, this.translateY);
  }
}
