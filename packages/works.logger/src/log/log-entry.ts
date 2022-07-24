/**
 * The log level.
 */
export enum ZLogLevel {
  /**
   * A fatal error.
   *
   * Someone's pager is going off at 2:00AM in the
   * morning because the nuclear codes have gone off
   * and missiles have been launched.
   */
  CATASTROPHE = 0,

  /**
   * A normal error that cause usually be recovered from.
   *
   * May require a fire being put out or some immediate
   * response, but it is not world ending.
   */
  ERROR = 1,

  /**
   * Nothing is really totally wrong.
   *
   * Should probably not be ignored and
   * action should be taken, but it's not
   * serious enough to call the fire
   * department.
   */
  WARNING = 2,

  /**
   * Some information that's good to know.
   *
   * Analytic logs are in this zone and general
   * information goes in this zone.
   *
   * It is normally best to avoid this log level
   * unless it's really important to display.
   */
  INFO = 3
}

/**
 * Represents a log entry.
 */
export interface IZLogEntry {
  /**
   * The log level.
   */
  level: ZLogLevel;

  /**
   * The creation of this entry.
   */
  created: Date | string;

  /**
   * The log message.
   */
  message: any;
}

/**
 * Represents a builder for a log entry
 */
export class ZLogEntryBuilder {
  private _entry: IZLogEntry;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._entry = {
      level: ZLogLevel.ERROR,
      message: null,
      created: new Date().toJSON()
    };
  }

  /**
   * Sets the log level to catastrophe.
   *
   * @returns This object.
   */
  public catastrophe(): this {
    this._entry.level = ZLogLevel.CATASTROPHE;
    return this;
  }

  /**
   * Sets the log level to error.
   *
   * @returns This object.
   */
  public error(): this {
    this._entry.level = ZLogLevel.ERROR;
    return this;
  }

  /**
   * Sets the log level to warning.
   *
   * @returns This object.
   */
  public warning(): this {
    this._entry.level = ZLogLevel.WARNING;
    return this;
  }

  /**
   * Sets the log level to info.
   *
   * @returns This object.
   */
  public info(): this {
    this._entry.level = ZLogLevel.INFO;
    return this;
  }

  /**
   * Sets the message.
   *
   * @param msg The message to log.
   *
   * @returns This object.
   */
  public message(msg: string): this {
    this._entry.message = msg;
    return this;
  }

  /**
   * Returns a copy of the built log entry.
   *
   * Note that the message is not deep copied,
   * so you must be careful if the actual message
   * to this entry can mutate.
   *
   * @returns The built log entry.
   */
  public build(): IZLogEntry {
    return { ...this._entry };
  }
}
