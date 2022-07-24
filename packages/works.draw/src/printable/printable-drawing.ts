import { get2d } from '../canvas/renderer';
import { IZPrintable } from './printable';
import { ZPrintableColor } from './printable-color';
import { ZPrintableNothing } from './printable-nothing';

/**
 * Represents a drawing that can be output to a canvas object.
 */
export class ZPrintableDrawing implements IZPrintable {
  private _canvas = document.createElement('canvas');

  /**
   * The foreground layer.
   *
   * This is the last layer that gets printed and is not affected by the midground
   * transforms.
   *
   * You will normally use this layer for clippings such as highlights to certain
   * areas of your drawings.
   */
  public foreground: IZPrintable = new ZPrintableNothing();

  /**
   * The middle ground.
   *
   * This is printed second and is not affected by the background transforms.
   */
  public midground: IZPrintable = new ZPrintableNothing();

  /**
   * The background layer.
   *
   * This gets printed before anything else.
   *
   * Normally, you want this to be something that fills your canvas with
   * no transformations.
   */
  public background: IZPrintable = new ZPrintableColor();

  /**
   * Prints the drawing to a canvas context.
   *
   * @param context The 2d printable context to print to.
   */
  public print(context: CanvasRenderingContext2D) {
    // Double buffer this and draw to a backing bitmap.
    this._canvas.width = context.canvas.width;
    this._canvas.height = context.canvas.height;

    const buffer = get2d(this._canvas);
    buffer.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this.background.print(buffer);
    buffer.resetTransform();
    this.midground.print(buffer);
    buffer.resetTransform();
    this.foreground.print(buffer);
    buffer.resetTransform();
    context.drawImage(this._canvas, 0, 0);
  }
}
