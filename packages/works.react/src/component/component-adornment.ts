import { ReactNode } from 'react';

/**
 * A component that contains optional adornments in addition to the main content.
 */
export interface IZComponentAdornment {
  /**
   * The start adornment.
   */
  prefix?: ReactNode;
  /**
   * The end adornment.
   */
  suffix?: ReactNode;
}
