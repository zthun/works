/**
 * Decodes a base64 string.
 *
 * This is the same equivalent method in most javascript libraries but it acts
 * as a polyfill on nodejs.
 *
 * @param b64 The base64 string to decode.
 * @param ns The namespace that may or may not already contain the browser atob method.
 *
 * @returns The decoded b64 binary value.
 */
export function atob(b64: string, ns: any = global): string {
  if (ns.atob) {
    // Browser
    return ns.atob(b64);
  }

  // Nodejs
  const buff = Buffer.from(b64, 'base64');
  return buff.toString('binary');
}

/**
 * Encodes to a base64 string.
 *
 * This is the same equivalent method in most javascript engines, but it acts
 * as a polyfill on nodejs.
 *
 * @param raw The raw string to encode.
 * @param ns The namespace
 *
 * @returns The encoded base64 string.
 */
export function btoa(raw: string, ns: any = global): string {
  if (ns.btoa) {
    // Browser
    return ns.btoa(raw);
  }

  // Nodejs
  const buff = Buffer.from(raw, 'binary');
  return buff.toString('base64');
}
