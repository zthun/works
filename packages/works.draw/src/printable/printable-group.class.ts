import { IZPrintable } from './printable.interface';

/**
 * Represents a collection of printable objects that can be transformed.
 */
export class ZPrintableGroup implements IZPrintable {
  /**
   * Initializes a new instance of this object.
   *
   * @param layers The current layer list.  Starts as an empty array if none are specified.
   */
  public constructor(public layers: IZPrintable[] = []) {}

  /**
   * Prints the group to the context.
   *
   * @param context The canvas context to print to.
   */
  public print(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.layers.length; ++i) {
      const layer = this.layers[i];
      layer.print(context);
    }
  }
}
