import { ZHttpCodeInformationalResponse, ZHttpCodeRedirection, ZHttpCodeServer, ZHttpCodeSuccess, ZHttpCodeClient } from '@zthun/works.core';

/**
 * Represents a status summary card for an http error code.
 */
export interface IZHttpErrorCodeCardProps {
  /**
   * One of the available http codes.
   */
  code: ZHttpCodeClient | ZHttpCodeInformationalResponse | ZHttpCodeRedirection | ZHttpCodeServer | ZHttpCodeSuccess;
}
