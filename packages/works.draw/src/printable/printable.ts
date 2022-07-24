/**
 * Represents an object that can be used to print data to a 2d canvas context.
 */
export interface IZPrintable {
  /**
   * Prints this object to the canvas 2d rendering context.
   *
   * @param context The context to print to.
   */
  print(context: CanvasRenderingContext2D): void;
}
