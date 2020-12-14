/**
 * A comment tag.
 *
 * Comment tags are prepended by the '@' symbol.
 */
export interface IZTypedocCommentTag {
  /**
   * The tag name.
   */
  tagName: string;
  /**
   * The param name for parameters.
   */
  paramName?: string;
  /**
   * The parameter comment.
   */
  text?: string;
}
