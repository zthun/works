import { IZTypedocEntity } from './typedoc-entity.interface';

/**
 * Represents a type structure in a typedoc entity.
 */
export interface IZTypedocType {
  /**
   * The type of type.
   */
  type: 'reference' | 'intrinsic' | 'union' | 'reflection';

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
   * The id for reference types.
   */
  id?: number;
}
