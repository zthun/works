import { IZPrintable } from './printable.interface';
import { ZPrintableColor } from './printable-color.class';

/**
 * Represents a drawing that can be output to a canvas object.
 */
export class ZDrawing implements IZPrintable {
  private _canvas = document.createElement('canvas');

  public layers: IZPrintable[] = [];
  public background: IZPrintable = new ZPrintableColor();

  public async print(context: CanvasRenderingContext2D) {
    // Double buffer this and draw to a backing bitmap.
    this._canvas.width = context.canvas.width;
    this._canvas.height = context.canvas.height;

    const buffer = this._canvas.getContext('2d');

    buffer.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this.background.print(buffer);

    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i];
      layer.print(buffer);
    }

    context.drawImage(this._canvas, 0, 0);
  }
}
