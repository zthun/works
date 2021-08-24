import { ZLogLevel } from './log-level.enum';

/**
 * Represents a log entry.
 */
export interface IZLogEntry {
  /**
   * The log level.
   */
  level: ZLogLevel;

  /**
   * The log scope.
   *
   * This is just a description of the module that the log occurred in.
   */
  scope: string;

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
      created: new Date().toJSON(),
      scope: null
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
   * Sets the scope.
   *
   * @param scope The scope to set.
   *
   * @returns This object.
   */
  public scope(scope: string): this {
    this._entry.scope = scope;
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
