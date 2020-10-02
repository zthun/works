/**
 * A service that allows the user to open a file.
 *
 * Because of the limitations of how files get opened,
 * we have to use callbacks instead of promises in the case that the
 * user cancels.  If the user cancels, then we don't want to wind up
 * with a memory leak with the promise.
 */
export interface IZFileSelect {
  /**
   * Opens the file select dialog.
   *
   * @param filter The file filter.
   * @param cb The callback if the user accepts the file.
   */
  open(accept: string, cb: (file: File) => void): void;
}
