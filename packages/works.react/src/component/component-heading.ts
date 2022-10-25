import { ReactNode } from 'react';

/**
 * A component that contains a heading.
 */
export interface IZComponentHeading {
  /**
   * The root heading.
   */
  heading?: ReactNode;

  /**
   * The sub heading that further describes the heading.
   */
  subHeading?: ReactNode;
}
