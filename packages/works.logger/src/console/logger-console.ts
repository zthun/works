import { IZLogEntry, ZLogLevel } from '../log/log-entry';
import { IZLogger } from '../log/logger';

/**
 * Represents a logger that logs to the console.
 */
export class ZLoggerConsole implements IZLogger {
  public static readonly FATAL = '!!FATAL!!';
  private _logFnMap: any;

  /**
   * Initializes a new instance of this object.
   *
   * @param _console The console to log to.
   */
  public constructor(private _console: Console) {
    this._logFnMap = {
      [ZLogLevel.CATASTROPHE]: (msg: string) => _console.error(msg),
      [ZLogLevel.ERROR]: (msg: string) => _console.error(msg),
      [ZLogLevel.WARNING]: (msg: string) => _console.warn(msg)
    };
  }

  /**
   * Logs the entry to the console.
   *
   * @param entry The entry to log.
   */
  public log(entry: IZLogEntry): void {
    const fn = this._logFnMap[entry.level] || ((msg: string) => this._console.log(msg));

    const timestamp = `[${entry.created.toLocaleString()}]`;
    const payload =
      entry.level === ZLogLevel.CATASTROPHE ? `: ${ZLoggerConsole.FATAL} - ${entry.message}` : `: ${entry.message}`;
    fn(`${timestamp}${payload}`);
  }
}
