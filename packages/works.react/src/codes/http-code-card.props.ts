import { ZHttpCode } from '@zthun/works.core';

/**
 * Represents a status summary card for an http error code.
 */
export interface IZHttpErrorCodeCardProps {
  /**
   * One of the available http codes.
   */
  code: ZHttpCode;
}
