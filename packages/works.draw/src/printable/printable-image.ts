import { IZImageReader } from '../image/image-reader';
import { IZPrintable } from './printable';

/**
 * Represents an object that can load an image to print to a canvas.
 */
export class ZPrintableImage implements IZPrintable {
  private _canvas: HTMLCanvasElement;

  /**
   * Gets the width of the image.
   */
  public get width() {
    return this._canvas.width;
  }

  /**
   * Gets the height of the image.
   */
  public get height() {
    return this._canvas.height;
  }

  /**
   * Initializes a new instance of this object.
   *
   * @param reader -
   *        The reader to use to load images.
   */
  public constructor(public reader: IZImageReader) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = 1;
    this._canvas.height = 1;
    this._canvas.getContext('2d')?.clearRect(0, 0, 1, 1);
  }

  /**
   * Imports the image from or url or binary data.
   *
   * @param urlOrBinary -
   *        The url or binary date to import from.
   *
   * @returns A promise that, when resolved, has loaded the image.
   */
  public async import(urlOrBinary: string | Blob | null): Promise<void> {
    if (!urlOrBinary) {
      this._canvas = document.createElement('canvas');
      this._canvas.width = 1;
      this._canvas.height = 1;
      return Promise.resolve();
    }

    this._canvas = await this.reader.read(urlOrBinary);
  }

  public print(context: CanvasRenderingContext2D) {
    context.drawImage(this._canvas, 0, 0);
  }
}
