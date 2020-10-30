/**
 * Represents properties for the markdown viewer.
 */
export interface IZMarkdownViewerProps {
  /**
   * The header text.
   */
  headerText: string;

  /**
   * The subheader text.
   */
  subHeaderText?: string;

  /**
   * The url to fetch.
   */
  url: string;

  /**
   * The avatar for the card.
   */
  avatar?: React.ReactNode;
}
