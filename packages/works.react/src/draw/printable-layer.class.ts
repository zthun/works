import { IZPrintable } from './printable.interface';
import { IZTransform } from './transform.interface';
import { ZTransform } from './transform.class';

/**
 * Represents a collection of printable objects that can be transformed.
 */
export class ZPrintableLayer implements IZPrintable {
  public constructor(public layers: IZPrintable[] = [], public transform: IZTransform = new ZTransform()) {}

  public print(context: CanvasRenderingContext2D) {
    this.transform.apply(context);

    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i];
      layer.print(context);
    }
  }
}
