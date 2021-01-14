import { IZTypedocEntity } from './typedoc-entity.interface';
import { ZTypedocTypeKind } from './typedoc-type-kind.enum';

/**
 * Represents a type structure in a typedoc entity.
 */
export interface IZTypedocType {
  /**
   * The type of type.
   */
  type: ZTypedocTypeKind;
  /**
   * The name of the type.
   */
  name: string;

  /**
   * The type arguments if this type represents a generic type.
   */
  typeArguments?: IZTypedocType[];

  /**
   * Used for union types.
   */
  types?: IZTypedocType[];

  /**
   * Used for reflection types.
   */
  declaration?: IZTypedocEntity;

  /**
   * Used for array and optional types.
   */
  elementType?: IZTypedocType;

  /**
   * The id for reference types.
   */
  id?: number;
}
