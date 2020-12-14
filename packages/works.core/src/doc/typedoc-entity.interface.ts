import { IZTypedocComment } from './typedoc-comment.interface';
import { IZTypedocFlags } from './typedoc-flags.interface';
import { IZTypedocGroup } from './typedoc-group.interface';
import { ZTypedocKind } from './typedoc-kind.enum';
import { IZTypedocSource } from './typedoc-source.interface';

/**
 * Represents an entity in a typedoc file.
 */
export interface IZTypedocEntity {
  /**
   * The entity id.
   */
  id: number;
  /**
   * The name of the entity.
   */
  name: string;
  /**
   * The kind of entity.
   *
   * @see ZTypedocKind for more information.
   */
  kind: ZTypedocKind;
  /**
   * The string representation of the kind in english.
   */
  kindString?: string;
  /**
   * Flags that further describe the entity.
   */
  flags?: IZTypedocFlags;
  /**
   * The entity comment.
   */
  comment?: IZTypedocComment;
  /**
   * The child entities.
   */
  children?: IZTypedocEntity[];
  /**
   * The child groups of the entity.
   */
  groups?: IZTypedocGroup[];
  /**
   * The source information files for this entity.
   */
  sources?: IZTypedocSource[];
  /**
   * The entity default value.
   */
  defaultValue?: string;
}
