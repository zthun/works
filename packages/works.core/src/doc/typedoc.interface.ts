import { IZTypedocEntity } from './typedoc-entity.interface';
import { IZTypedocGroup } from './typedoc-group.interface';

/**
 * The root structure for a typedoc.json file.
 */
export interface IZTypedoc {
  /**
   * The package name.
   */
  name: string;
  /**
   * The list of all entities that live in this
   * document.
   */
  children: IZTypedocEntity[];
  /**
   * The grouping of entities that map categories.
   */
  groups: IZTypedocGroup[];
}
