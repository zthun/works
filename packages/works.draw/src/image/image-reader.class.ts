/* istanbul ignore file */

/*
 * The methods in this module are untestable in the jest framework.
 *
 * It's honestly not worth the effort to mock all this crap out.
 *
 * https://github.com/jsdom/jsdom/issues/1721
 */

import { IZImageReader } from './image-reader.interface';

/**
 * Represents the standard implementation of the image reader object.
 */
export class ZImageReader implements IZImageReader {
  /**
   * Reads the data blob.
   *
   * @param data The data to read.  This can be a url to an image or a Blob that can convert locally to an image.
   *
   * @returns A promise that returns the loaded canvas.  If the read fails,
   *          then a canvas that is a 1x1 white pixel will be returned.
   */
  public read(urlOrBlob: Blob): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const bmp = canvas.getContext('2d');

    return new Promise<HTMLCanvasElement>((resolve) => {
      const url = typeof urlOrBlob === 'string' ? urlOrBlob : URL.createObjectURL(urlOrBlob);
      const img = new Image();

      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        bmp.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.src = url;
    });
  }
}
