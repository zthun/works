/**
 * Represents a component that contains a header and subheader.
 */
export interface IZComponentHeader {
  /**
   * The header text.
   */
  headerText: string;

  /**
   * The subheader text.
   */
  subHeaderText?: string;

  /**
   * The avatar icon for the heading component.
   *
   * @default null
   */
  avatar?: React.ReactNode;

  /**
   * The action element for the heading component.
   *
   * @default null
   */
  action?: React.ReactNode;
}
