import { IZImageReader } from './image-reader.interface';

/**
 * An image reader that always returns the same image, regardless of the requested blob.
 */
export class ZImageReaderStatic implements IZImageReader {
  /**
   * Initializes a new instance of this object.
   *
   * @param _image The static image to return.
   */
  public constructor(private _image: HTMLCanvasElement) {}

  /**
   * Returns the static image.
   *
   * @returns A promise that resolves to a copy of the static image.
   */
  read(): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.height = this._image.height;
    canvas.width = this._image.width;
    canvas.getContext('2d').drawImage(this._image, 0, 0);
    return Promise.resolve(canvas);
  }
}
