/**
 * Represents an object that can be used to read an image.
 */
export interface IZImageReader {
  /**
   * Reads the data blob.
   *
   * @param data The data to read.  This can be a url to an image or a Blob that can convert locally to an image.
   *
   * @returns A promise that returns the loaded canvas.  If the read fails,
   *          then a canvas that is a 1x1 white pixel will be returned.
   */
  read(data: string | Blob): Promise<HTMLCanvasElement>;
}
