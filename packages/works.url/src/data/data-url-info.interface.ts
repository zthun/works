/**
 * Represents information about a data url.
 */
export interface IZDataUrlInfo {
  /**
   * The content information mime type.
   */
  mimeType: string;

  /**
   * The output encoding.
   */
  encoding: 'base64' | 'utf8';

  /**
   * The raw data buffer.
   */
  buffer: Buffer;
}
