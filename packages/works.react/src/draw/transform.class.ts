import { IZTransform } from './transform.interface';

export class ZTransform implements IZTransform {
  private _context = document.createElement('canvas').getContext('2d');

  public reset() {
    this._context.resetTransform();
    return this;
  }

  public scale(x: number, y: number) {
    this._context.scale(x, y);
    return this;
  }

  public rotateDegrees(amount: number) {
    return this.rotateRadians(amount * (Math.PI / 180));
  }

  public rotateRadians(amount: number) {
    this._context.rotate(amount);
    return this;
  }

  public apply(context: CanvasRenderingContext2D) {
    context.setTransform(this._context.getTransform());
  }
}
