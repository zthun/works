import { IZLogEntry } from '../log/log-entry';
import { IZLogger } from '../log/logger';

/**
 * Represents a logger that logs to multiple sources.
 */
export class ZCompositeLogger implements IZLogger {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The collection of child loggers to log to.
   */
  public constructor(private readonly _loggers: IZLogger[]) {}

  /**
   * Logs the entry into every one of the child loggers.
   *
   * @param entry The entry to log.
   */
  public log(entry: IZLogEntry): void {
    this._loggers.forEach((logger) => logger.log(entry));
  }
}
