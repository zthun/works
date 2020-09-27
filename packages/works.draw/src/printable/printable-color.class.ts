import { IZPrintable } from './printable.interface';

/**
 * Represents printable object that prints a color to the entire context.
 */
export class ZPrintableColor implements IZPrintable {
  /**
   * Initializes a new instance of this object.
   *
   * @param color The color to print.
   */
  public constructor(public color: string = 'transparent') {}

  /**
   * Prints the color to the drawing context.
   *
   * @param context The drawing context.
   */
  public print(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }
}
