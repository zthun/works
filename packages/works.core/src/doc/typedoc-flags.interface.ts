/**
 * Represents flags that describe an entity's attributes.
 */
export interface IZTypedocFlags {
  /**
   * Private member.
   */
  isPrivate?: boolean;
  /**
   * Public member.
   *
   * This should be default if not private or protected.
   */
  isPublic?: boolean;
  /**
   * Protected member.
   */
  isProtected?: boolean;
  /**
   * Static member.
   */
  isStatic?: boolean;
  /**
   * Exported from module.
   */
  isExported?: boolean;
  /**
   * External to module.
   */
  isExternal?: boolean;
  /**
   * Optional parameter of a call signature.
   */
  isOptional?: boolean;
  /**
   * Multiple params.
   *
   * Used with ... operator in call signatures.
   */
  isRest?: boolean;
  /**
   * True if assignment is exported.
   */
  hasExportedAssignment?: boolean;
  /**
   * Constructor property.
   */
  isConstructorProperty?: boolean;
  /**
   * Abstract class.
   */
  isAbstract?: boolean;
  /**
   * Is immutable.
   */
  isConst?: boolean;
  /**
   * Can be changed.
   */
  isLet?: boolean;
}
