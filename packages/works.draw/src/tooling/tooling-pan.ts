import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IZPrintable } from '../printable/printable';
import { IZTransformTranslate } from '../transform/transform-translate';
import { IZTooling } from './tooling';

/**
 * Represents a tool to pan a transform across a canvas.
 */
export class ZToolingPan implements IZTooling {
  private _destroy = new Subject();
  private _startMouseX = 0;
  private _startMouseY = 0;
  private _startTransformX = 0;
  private _startTransformY = 0;
  private _dragging = false;

  /**
   * Initializes this tool.
   *
   * This will also destroy the current tool if a tool has already been initialized.
   *
   * @param target The target element that contains the bounding rect for dragging.
   * @param context The drawing context to update while panning.
   * @param drawing The drawing responsible for printing updates.
   * @param transform The transform to update.
   */
  public init(
    target: HTMLElement,
    context: CanvasRenderingContext2D,
    drawing: IZPrintable,
    transform: IZTransformTranslate
  ) {
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

  /**
   * Destroys this tool.
   *
   * After this is called, this object will no longer do any drag and drop operations until
   * init is called again.
   */
  public destroy() {
    this._destroy.next(undefined);
    this._destroy.complete();
  }
}
