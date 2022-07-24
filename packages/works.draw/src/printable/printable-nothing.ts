import { noop } from 'lodash';
import { IZPrintable } from './printable';

/**
 * A printable object that does nothing.
 */
export class ZPrintableNothing implements IZPrintable {
  /**
   * Does nothing.
   */
  public print = noop;
}
