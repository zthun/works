import { IZPrintable } from './printable.interface';

/**
 * Represents an object that can load an image to print to a canvas.
 */
export class ZPrintableImage implements IZPrintable {
  private _canvas: HTMLCanvasElement = document.createElement('canvas');

  public get width() {
    return this._canvas.width;
  }

  public get height() {
    return this._canvas.height;
  }

  public load(binary: Blob) {
    const bmp = this._canvas.getContext('2d');

    if (!binary) {
      this._canvas.width = 1;
      this._canvas.height = 1;
      bmp.clearRect(0, 0, 1, 1);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(binary);
      const img = new Image();

      img.onload = () => {
        this._canvas.width = img.width;
        this._canvas.height = img.height;
        bmp.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve();
      };

      img.onerror = () => {
        this._canvas.width = img.width;
        this._canvas.height = img.height;
        URL.revokeObjectURL(url);
        reject();
      };

      img.src = url;
    });
  }

  public print(context: CanvasRenderingContext2D) {
    context.drawImage(this._canvas, 0, 0);
  }
}
