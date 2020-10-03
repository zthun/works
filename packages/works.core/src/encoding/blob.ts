import { atob } from './base64';

/**
 * Converts from a string to a blob.
 *
 * This method is cross platform and works on both nodejs and browsers.
 *
 * @param str The binary string to encode.
 * @param options The blob options.
 *
 * @returns A blob object that was converted from the string.
 */
export function blobFromString(str: string, options?: BlobPropertyBag): Blob {
  const bytes = new Uint8Array(str.length);

  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  return new Blob([bytes], options);
}

/**
 * Converts from a base64 string to a blob.
 *
 * This method is cross platform and works on both nodejs and browsers.
 *
 * @param b64 The base64 string to convert.
 * @param options The options for the blob.
 *
 * @returns The blob that was converted from the base64 string.
 */
export function blobFromBase64(b64: string, options?: BlobPropertyBag): Blob {
  const str = atob(b64);
  return blobFromString(str, options);
}

/**
 * Converts from a data url to a blob.
 *
 * This method is cross platform and works on both nodejs and browsers.
 * The mime type will be set from the url.
 *
 * @param url The data url to convert.
 * @param endings Optional blob endings.
 *
 * @returns The blob that was converted from the url.
 */
export function blobFromDataUrl(url: string, endings?: EndingType): Blob {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs for how this splits out.
  const [header, data] = url.split(',');
  const encoded = header.indexOf('base64') > 0;
  const media = header.replace('data:', '').replace(';base64', '').trim();
  const type = media || 'text/plain;charset=us-ascii';
  const options = { type, endings };
  return encoded ? blobFromBase64(data, options) : blobFromString(data, options);
}
