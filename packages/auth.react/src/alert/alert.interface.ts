import { ZAlertSeverity } from './alert-severity.enum';

/**
 * Represents an alert in a @zthun/* based system.
 */
export interface IZAlert {
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
}
