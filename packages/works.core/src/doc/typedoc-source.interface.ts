/**
 * A source location for typedoc information.
 */
export interface IZTypedocSource {
  /**
   * The path of the file relative to the source repository.
   */
  fileName: string;
  /**
   * The line number where the entity is located.
   */
  line: number;
  /**
   * The character number where the entity starts on the given line.
   */
  character: number;
}
