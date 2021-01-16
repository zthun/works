/**
 * Represents the type of typedoc type.
 */
export enum ZTypedocTypeKind {
  Array = 'array',
  Conditional = 'conditional',
  IndexedAccess = 'indexedAccess',
  Inferred = 'inferred',
  Intersection = 'intersection',
  Intrinsic = 'intrinsic',
  Literal = 'literal',
  Mapped = 'mapped',
  Optional = 'optional',
  Predicate = 'predicate',
  Query = 'query',
  Reference = 'reference',
  Reflection = 'reflection',
  Rest = 'rest',
  Tuple = 'tuple',
  TypeOperator = 'type-operator',
  TypeParameter = 'type-parameter',
  Union = 'union',
  Unknown = 'unknown'
}
