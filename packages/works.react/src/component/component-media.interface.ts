/**
 * Represents a component that has image media.
 */
export interface IZComponentMedia {
  /**
   * The url of the image.
   */
  imageUrl?: string;

  /**
   * The image width.
   */
  imageWidth?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * The image height.
   */
  imageHeight?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
