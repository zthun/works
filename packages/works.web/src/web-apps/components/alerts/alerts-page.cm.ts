import { IZCircusPerformer, IZCircusWait } from '@zthun/works.cirque';
import { ZStateColor } from '@zthun/works.react';

/**
 * Represents a page component model for the alerts demo.
 */
export class ZAlertsPageComponentModel {
  /**
   * Initializes a new instance of this page component model.
   *
   * @param _element
   *        The element that is the root of the page.
   */
  public constructor(
    private _element: HTMLElement,
    private _performer: IZCircusPerformer,
    private _waiter: IZCircusWait
  ) {}

  /**
   * Clicks one of the buttons to open an alert.
   *
   * @param color
   *        The button color of the alert you want to open.
   */
  public open(color: ZStateColor): Promise<void> {}
}
