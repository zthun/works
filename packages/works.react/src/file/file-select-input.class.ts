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
    this._input.onchange = () => this._cb(this._input.files[0]);
    container.appendChild(this._input);
  }

  public open(accept: string, cb: (file: File) => void) {
    this._input.accept = accept;
    this._cb = cb;
    this._input.click();
  }
}
