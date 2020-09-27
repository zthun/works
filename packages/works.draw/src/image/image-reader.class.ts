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
  public read(blob: Blob): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const bmp = canvas.getContext('2d');

    return new Promise<HTMLCanvasElement>((resolve) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();

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
