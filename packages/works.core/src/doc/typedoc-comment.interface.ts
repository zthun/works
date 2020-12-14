import { IZTypedocCommentTag } from './typedoc-comment-tag.interface';

/**
 * Represents a comment.
 */
export interface IZTypedocComment {
  /**
   * The first line of a comment literal.
   */
  shortText: string;
  /**
   * The remarks section or everything after the first line.
   */
  text?: string;
  /**
   * The text of the returns block.
   */
  returns?: string;
  /**
   * The tag information for multi part comments.
   */
  tags?: IZTypedocCommentTag[];
}
