import { ZAlertSeverity } from './alert-severity.enum';

/**
 * Represents an alert in a @zthun/* based system.
 */
export interface IZAlert {
  /**
   * A generated id of the alert.
   *
   * This must be unique across all alerts.
   */
  readonly _id: string;
  /**
   * The severity of the alert.
   */
  severity: ZAlertSeverity;
  /**
   * The alert message.  This can also be html.
   */
  message: string;
  /**
   * The alert header (title).
   */
  header: string;
  /**
   * The time that the alert can live before being automatically dismissed.
   */
  timeToLive: number;
}
