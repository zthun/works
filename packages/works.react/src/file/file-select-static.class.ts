import { IZFileSelect } from './file-select.interface';

/**
 * Represents an object that always returns the same file.
 */
export class ZFileSelectStatic implements IZFileSelect {
  /**
   * Initializes a new instance of this object.
   *
   * @param _file The static file.
   */
  public constructor(private _file: File) {}

  /**
   * Always invokes cb with the static file.
   *
   * @param accept Ignored
   * @param cb The callback to invoke.
   */
  public open(accept: string, cb: (f: File) => void) {
    cb(this._file);
  }
}
