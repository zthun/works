/**
 * Represents types of typedoc entities.
 */
export enum ZTypedocKind {
  /**
   * The root entity.
   */
  Project = 1,
  /**
   * External module.
   */
  ExternalModule = 2,
  /**
   * Namespace.
   */
  Namespace = 4,
  /**
   * Enum type.
   */
  Enum = 8,
  /**
   * An enum member.
   */
  EnumMember = 16,
  /**
   * Exported variable.
   */
  Variable = 32,
  /**
   * Exported function.
   */
  Function = 64,
  /**
   * Exported class.
   */
  Class = 128,
  /**
   * Exported interface.
   */
  Interface = 256,
  /**
   * Class constructor.
   */
  Constructor = 512,
  /**
   * Class/Interface property.
   */
  Property = 1024,
  /**
   * Class/Interface method.
   */
  Method = 2048,
  /**
   * Method call signature.
   */
  CallSignature = 4096,
  /**
   * Index signature.
   */
  IndexSignature = 8192,
  /**
   * Constructor signature.
   */
  ConstructorSignature = 16384,
  /**
   * Method parameter.
   */
  Parameter = 32768,
  /**
   * Basic types.
   */
  TypeLiteral = 65536,
  /**
   * Templated types.
   */
  TypeParameter = 131072,
  /**
   * Get/Set accessor.
   */
  Accessor = 262144,
  /**
   * Get signature for accessor.
   */
  GetSignature = 524288,
  /**
   * Set signature for accessor.
   */
  SetSignature = 1048576,
  /**
   * Complex types.
   */
  ObjectLiteral = 2097152,
  /**
   * Type alias.
   */
  TypeAlias = 4194304,
  /**
   * Eventing.
   */
  Event = 8388608
}
