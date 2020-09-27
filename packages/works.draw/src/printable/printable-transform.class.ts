import { IZPrintable } from './printable.interface';

/**
 * Represents a printable transformation that will apply a transformation matrix to the context.
 */
export class ZPrintableTransform implements IZPrintable {
  private _aScaleX = 1;
  private _bSkewY = 0;
  private _cSkewX = 0;
  private _dScaleY = 1;
  private _eTranslateX = 0;
  private _fTranslateY = 0;

  /**
   * Sets the scale on the transformation.
   *
   * @param sx The x scale.
   * @param sy The y scale.
   */
  public scale(sx: number, sy: number): this {
    this._aScaleX = sx;
    this._dScaleY = sy;
    return this;
  }

  /**
   * Sets the skew.
   *
   * @param sx The x skew.
   * @param sy The y skew.
   */
  public skew(sx: number, sy: number): this {
    this._cSkewX = sx;
    this._bSkewY = sy;
    return this;
  }

  /**
   * Sets the translation.
   *
   * @param mx The horizontal translation.
   * @param my The vertical translation.
   */
  public translate(mx: number, my: number): this {
    this._eTranslateX = mx;
    this._fTranslateY = my;
    return this;
  }

  /**
   * Applies the current transformation matrix to the canvas context.
   *
   * @param context The context to apply the transformation on.
   */
  public print(context: CanvasRenderingContext2D) {
    context.transform(this._aScaleX, this._bSkewY, this._cSkewX, this._dScaleY, this._eTranslateX, this._fTranslateY);
  }
}
