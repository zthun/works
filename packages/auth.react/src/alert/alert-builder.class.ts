import { v4 } from 'uuid';
import { ZAlertSeverity } from './alert-severity.enum';
import { IZAlert } from './alert.interface';

/**
 * Represents a builder for an alert.
 */
export class ZAlertBuilder {
  private _alert: IZAlert;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._alert = {
      _id: null,
      severity: ZAlertSeverity.Success,
      message: '',
      header: null,
      timeToLive: 6000
    };
  }

  /**
   * Sets the severity to success.
   *
   * Sets the header if it is not already set.
   *
   * @returns This object.
   */
  public success(): this {
    this._alert.severity = ZAlertSeverity.Success;
    return this;
  }

  /**
   * Sets the severity to info.
   *
   * Sets the header if it is not already set.
   *
   * @returns This object.
   */
  public info(): this {
    this._alert.severity = ZAlertSeverity.Info;
    return this;
  }

  /**
   * Sets the severity to warning.
   *
   * Sets the header if it is not already set.
   *
   * @returns This object.
   */
  public warning(): this {
    this._alert.severity = ZAlertSeverity.Warning;
    return this;
  }

  /**
   * Sets the severity to error.
   *
   * Sets the header if it is not already set.
   *
   * @returns This object.
   */
  public error(): this {
    this._alert.severity = ZAlertSeverity.Error;
    return this;
  }

  /**
   * Sets the message.
   *
   * @param message The message to set.
   *
   * @returns This object.
   */
  public message(message: string): this {
    this._alert.message = message;
    return this;
  }

  /**
   * Sets the header.
   *
   * @param header The header to set.
   *
   * @returns This object.
   */
  public header(header: string): this {
    this._alert.header = header;
    return this;
  }

  /**
   * Sets the time to live.
   *
   * @param ms The total number of milliseconds before the alert should be auto dismissed.
   *
   * @returns This object.
   */
  public time(ms: number): this {
    this._alert.timeToLive = ms;
    return this;
  }

  /**
   * Sets the time to live to forever.
   *
   * @returns This object.
   */
  public immortal(): this {
    this._alert.timeToLive = Infinity;
    return this;
  }

  /**
   * Assigns all the properties in other to the current alert.
   *
   * The id will still remain uninque.
   *
   * @param other The other partial object to copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZAlert>): this {
    this._alert = Object.assign(this._alert, other);
    return this;
  }

  /**
   * Assigns all properties in other to the current alert.
   *
   * The id will still remain unique.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZAlert): this {
    this._alert = Object.assign({}, other);
    return this;
  }

  /**
   * Builds the alert.
   *
   * The alert will be assigned a brand new _id.
   *
   * @returns The built alert with a new id.
   */
  public build(): IZAlert {
    return Object.assign({}, this._alert, { _id: v4() });
  }
}
