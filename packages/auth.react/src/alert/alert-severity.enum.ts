/**
 * Represents alert severity.
 */
export enum ZAlertSeverity {
  /**
   * A successful alert.
   */
  Success = 'success',
  /**
   * Alert for informational purposes only.
   */
  Info = 'info',
  /**
   * Warning.  Ignoring this type of alert can lead to errors.
   */
  Warning = 'warning',
  /**
   * Something went wrong.
   */
  Error = 'error'
}
