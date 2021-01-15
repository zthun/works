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
   * Used for string literals.
   */
  value?: string;

  /**
   * The type arguments if this type represents a generic type.
   */
  typeArguments?: IZTypedocType[];

  /**
   * Used for union and intersection types.
   */
  types?: IZTypedocType[];

  /**
   * Used for reflection types.
   */
  declaration?: IZTypedocEntity;

  /**
   * Used for array, rest, and optional types.
   */
  elementType?: IZTypedocType;

  /**
   * Used for conditional types.
   */
  checkType?: IZTypedocType;

  /**
   * Used for conditional types.
   */
  extendsType?: IZTypedocType;

  /**
   * Used for conditional types.
   */
  trueType?: IZTypedocType;

  /**
   * Used for conditional types.
   */
  falseType?: IZTypedocType;

  /**
   * Used for predicate types.
   */
  targetType?: IZTypedocType;

  /**
   * Used for tuples.
   */
  elements?: IZTypedocType[];

  /**
   * Used for index-access types.
   */
  indexType?: IZTypedocType;

  /**
   * Used for index-access types.
   */
  objectType?: IZTypedocType;

  /**
   * The id for reference types.
   */
  id?: number;

  /**
   * Used for mapped types.
   */
  parameter?: string;

  /**
   * Used for mapped types.
   */
  parameterType: IZTypedocType;

  /**
   * Used for mapped types.
   */
  templateType?: IZTypedocType;

  /**
   * Used for mapped types.
   */
  nameType?: IZTypedocType;

  /**
   * Used for mapped types.
   */
  readonlyModifier?: '+' | '-';

  /**
   * Used for mapped types.
   */
  optionalModifier?: '+' | '-';
}
