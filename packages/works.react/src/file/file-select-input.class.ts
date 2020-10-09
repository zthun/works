/* istanbul ignore file */

/*
 * This is really untestable easily due to the nature of how this works.
 * We can ignore this from out code coverage.
 */

import { IZFileSelect } from './file-select.interface';

/**
 * Represents a file select that is opened from an this._input.
 */
export class ZFileSelectInput implements IZFileSelect {
  private _input: HTMLInputElement;
  private _cb: (file: File) => void;

  /**
   * Initializes a new instance of this object.
   *
   * @param doc The root document that can be used to create the file dialog.
   * @param container The container to house the input element.
   */
  public constructor(doc: Document = document, container: HTMLElement = document.body) {
    this._input = doc.createElement('input');
    this._input.type = 'file';
    this._input.style.position = 'absolute';
    this._input.style.visibility = 'hidden';
    this._input.style.width = '1px';
    this._input.style.height = '1px';
    this._input.style.left = '0';
    this._input.style.top = '0';
    this._input.style.zIndex = '-1';
    this._input.onchange = () => {
      if (this._input.files[0]) {
        this._cb(this._input.files[0]);
      }
    };
    container.appendChild(this._input);
  }

  /**
   * Opens the file dialog.
   *
   * Note that this uses the older node callback style rather than returning a promise.
   * This is intentional due to how this object opens a file select.  Since there is no
   * way to determine if the user canceled the dialog, returning a promise would actually
   * potentially result in a memory leak since it would never get resolved.  Therefore,
   * the class callback style has to be used here.
   *
   * @param accept The file mime types to accept.
   * @param cb The callback for when the user selects a file.
   */
  public open(accept: string, cb: (file: File) => void) {
    this._input.accept = accept;
    this._cb = cb;
    this._input.click();
  }
}
