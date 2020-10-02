import { IZImageReader, ZImageReader } from '@zthun/works.draw';
import { createContext, useContext } from 'react';

/**
 * A reader service that can read images.
 */
export const ZImageReaderContext = createContext<IZImageReader>(new ZImageReader());

/**
 * Returns the image reader to be used.
 */
export function useImageReader() {
  return useContext(ZImageReaderContext);
}
