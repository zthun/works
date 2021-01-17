/**
 * Represents a component that can be sized.
 */
export interface IZComponentSizeable {
  /**
   * The (maximum) width for the component.
   *
   * @default auto
   */
  size?: 'auto' | 'max' | 'xl' | 'lg' | 'md' | 'sm';
}
