import { IZLogEntry } from './log-entry';

/**
 * Represents a service that manages log entries.
 *
 * Logging is a fire and forget operation.  If it fails,
 * you move on.  Logging should never stop the operation of the
 * app.
 */
export interface IZLogger {
  /**
   * Inserts a log entry.
   *
   * @param entry The log entry.
   */
  log(entry: IZLogEntry): void;
}
