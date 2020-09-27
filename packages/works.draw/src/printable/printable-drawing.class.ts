import { IZPrintable } from './printable.interface';
import { ZPrintableColor } from './printable-color.class';
import { ZPrintableTransform } from './printable-transform.class';
import { ZPrintableNothing } from './printable-nothing.class';

/**
 * Represents a drawing that can be output to a canvas object.
 */
export class ZPrintableDrawing implements IZPrintable {
  private _canvas = document.createElement('canvas');

  public foreground: IZPrintable = new ZPrintableNothing();
  public layers: IZPrintable[] = [];
  public background: IZPrintable = new ZPrintableColor();
  public backstage: IZPrintable = new ZPrintableTransform();

  /**
   * Prints the drawing to a canvas context.
   *
   * @param context The 2d printable context to print to.
   */
  public print(context: CanvasRenderingContext2D) {
    // Double buffer this and draw to a backing bitmap.
    this._canvas.width = context.canvas.width;
    this._canvas.height = context.canvas.height;

    const buffer = this._canvas.getContext('2d');
    buffer.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this.backstage.print(buffer);
    this.background.print(buffer);

    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i];
      layer.print(buffer);
    }

    this.foreground.print(buffer);

    context.drawImage(this._canvas, 0, 0);
  }
}
