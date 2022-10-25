/* istanbul ignore file */

/**
 * Note that how this works makes it very difficult to test since the method to do
 * this requires a hidden element on the dom that runs raw browser code.  It's
 * just not worth the effort to mock all of this stuff out so this is one
 * service that will not have any unit tests.
 */

import { first } from 'lodash';
import { createContext, useContext } from 'react';

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
   * @param accept The file filter.
   * @param cb The callback if the user accepts the file.
   */
  open(accept: string, cb: (file: File) => void): void;
}

/**
 * Represents a file select that is opened from an input.
 */
export class ZFileSelect implements IZFileSelect {
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
      const file = first(this._input.files);
      if (file) {
        this._cb(file);
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

/**
 * Represents the context for using a file select object.
 */
export const ZFileSelectContext = createContext<IZFileSelect>(new ZFileSelect());

/**
 * Retrieves the global file select object.
 *
 * @returns The global file select object.
 */
export function useFileSelect(): IZFileSelect {
  return useContext(ZFileSelectContext);
}
