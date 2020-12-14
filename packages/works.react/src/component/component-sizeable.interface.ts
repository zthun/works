/**
 * Represents a component that can be sized.
 */
export interface IZComponentSizeable {
  /**
   * The (maximum) size for the component.
   *
   * @default auto
   */
  size?: 'auto' | 'max' | 'lg' | 'md' | 'sm';
}
