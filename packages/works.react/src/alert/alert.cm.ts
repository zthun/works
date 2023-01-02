import { IZCircusDriver, ZCircusActBuilder } from '@zthun/works.cirque';
import { ZAlertSeverity } from '@zthun/works.message';
import { first } from 'lodash';

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
   * @param _alertListDriver
   *        The driver for the parent alert list.
   * @param id
   *        The id of the alert
   */
  public constructor(private readonly _alertListDriver: IZCircusDriver, public readonly id: string) {}

  /**
   * Gets the element for this alert.
   *
   * @returns
   *        The element for this alert.
   */
  private async _driver(): Promise<IZCircusDriver | undefined> {
    const query = `.ZAlertList-alert[data-alert-id="${this.id}"]`;
    const found = await this._alertListDriver.query(query);
    return Promise.resolve(first(found));
  }

  /**
   * Gets the severity of the alert.
   *
   * @returns
   *        The severity of the alert or null
   *        if the alert has died.
   */
  public severity(): Promise<ZAlertSeverity | null> {
    return this._valueIfAlive(null, (d) => d.attribute<ZAlertSeverity>('data-alert-severity'));
  }

  /**
   * Gets the header of the alert.
   *
   * @returns
   *        The alert header or them empty string if the alert has died.
   *        This also returns the empty string if no header exists.
   */
  public header(): Promise<string> {
    return this._valueIfAlive('', async (driver: IZCircusDriver) => {
      const [header] = await driver.query('.ZAlertList-alert-header');
      return header?.text() || Promise.resolve('');
    });
  }

  /**
   * Gets the alert message if this alert is still alive.
   *
   * @returns
   *      The current message for a live alert, or the empty string
   *      if the alert has died.
   */
  public message(): Promise<string> {
    return this._valueIfAlive('', async (driver: IZCircusDriver) => {
      const content = await driver.select('.ZAlertList-alert-message');
      return content.text();
    });
  }

  /**
   * Attempts to close the alert if it is alive.
   */
  public async close(): Promise<void> {
    const driver = await this._driver();

    if (!driver) {
      return Promise.resolve();
    }

    const closeButton = await driver.select('button[aria-label="Close"]');
    const act = new ZCircusActBuilder().click().build();
    await closeButton.perform(act);
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
  private async _valueIfAlive<T>(fallback: T, factory: (driver: IZCircusDriver) => Promise<T>): Promise<T> {
    const element = await this._driver();

    if (!element) {
      return Promise.resolve(fallback);
    }

    return factory(element);
  }
}
