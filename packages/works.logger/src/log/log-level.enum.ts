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
