import { IZCircusPerformer, ZCircusActBuilder } from '@zthun/works.cirque';
import { required } from '@zthun/works.core';
import { ZAlertSeverity } from '@zthun/works.message';

/**
 * Represents an alert in an alert list.
 *
 * Alerts, by default, are mortal.  Thus,
 * it is possible to create this component model
 * and then have the alert disappear afterward.
 */
export class ZAlertComponentModel {
  /**
   * Initializes a new instance of this object.
   *
   * @param _container
   *        The alert list container element.
   * @param id
   *        The id of the alert.
   * @param _performer
   *        The performer to close the alert.
   */
  public constructor(
    private readonly _container: HTMLElement,
    public readonly id: string,
    private readonly _performer: IZCircusPerformer
  ) {}

  /**
   * Gets the element for this alert.
   *
   * @returns
   *        The element for this alert.
   */
  private get _element(): HTMLElement | null {
    return this._container.querySelector(`.ZAlertList-alert[data-alert-id="${this.id}"]`);
  }

  /**
   * Gets the severity of the alert.
   *
   * @returns
   *        The severity of the alert or null
   *        if the alert has died.
   */
  public severity(): Promise<ZAlertSeverity | null> {
    return this._valueIfAlive(
      null,
      async (element: HTMLElement) => element.getAttribute('data-alert-severity') as ZAlertSeverity
    );
  }

  /**
   * Gets the header of the alert.
   *
   * @returns
   *        The alert header or null if the alert has died.  This also
   *        returns null if the alert has no header.
   */
  public header(): Promise<string | null> {
    return this._valueIfAlive(null, async (element: HTMLElement) => {
      const header = element.querySelector<HTMLElement>('.ZAlertList-alert-header');
      return header?.textContent || null;
    });
  }

  /**
   * Gets the alert message if this alert is still alive.
   *
   * @returns
   *      The current message for a live alert, or null
   *      if the alert has died.
   */
  public message(): Promise<string | null> {
    return this._valueIfAlive(null, async (element: HTMLElement) => {
      const content = await required(element.querySelector<HTMLElement>('.ZAlertList-alert-message'));
      return content.textContent;
    });
  }

  /**
   * Attempts to close the alert if it is alive.
   */
  public async close(): Promise<void> {
    const element = this._element;

    if (!element) {
      return Promise.resolve();
    }

    const closeButton = await required(element.querySelector('button[aria-label="Close"]'));
    const act = new ZCircusActBuilder().moveTo(closeButton).leftMouseClick().build();
    await this._performer.perform(act);
  }

  /**
   * Returns a given value if this alert is alive.
   *
   * @param fallback
   *        The fallback value if the alert has died.
   * @param factory
   *        The factory method that retrieves the value.
   *
   * @returns
   *        The value returned from factory if the alert is alive,
   *        or fallback if the alert is dead.
   */
  private _valueIfAlive<T>(fallback: T, factory: (element: HTMLElement) => Promise<T>): Promise<T> {
    const element = this._element;

    if (!element) {
      return Promise.resolve(fallback);
    }

    return factory(element);
  }
}
