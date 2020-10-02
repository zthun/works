import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IZPrintable } from '../printable/printable.interface';
import { IZTransformTranslate } from '../transform/transform-translate.interface';
import { IZTooling } from './tooling.interface';

/**
 * Represents a pan tool.
 */
export class ZToolingPan implements IZTooling {
  private _destroy = new Subject();
  private _startMouseX = 0;
  private _startMouseY = 0;
  private _startTransformX = 0;
  private _startTransformY = 0;
  private _dragging = false;

  public init(target: HTMLElement, context: CanvasRenderingContext2D, drawing: IZPrintable, transform: IZTransformTranslate) {
    this.destroy();

    this._destroy = new Subject();

    fromEvent<MouseEvent>(target, 'mousedown')
      .pipe(takeUntil(this._destroy))
      .subscribe((ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        this._startMouseX = ev.screenX;
        this._startMouseY = ev.screenY;
        this._startTransformX = transform.translateX;
        this._startTransformY = transform.translateY;
        this._dragging = true;
      });

    fromEvent<MouseEvent>(target, 'mousemove')
      .pipe(
        takeUntil(this._destroy),
        filter(() => this._dragging)
      )
      .subscribe((ev: MouseEvent) => {
        const diffX = ev.screenX - this._startMouseX;
        const diffY = ev.screenY - this._startMouseY;
        transform.translate(this._startTransformX + diffX, this._startTransformY + diffY);
        drawing.print(context);
      });

    fromEvent<MouseEvent>(document, 'mouseup')
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this._dragging = false;
        this._startMouseX = 0;
        this._startMouseY = 0;
        this._startTransformX = 0;
        this._startTransformY = 0;
      });
  }

  public destroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
