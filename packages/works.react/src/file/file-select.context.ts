import { createContext, useContext } from 'react';
import { ZFileSelectInput } from './file-select-input.class';
import { IZFileSelect } from './file-select.interface';

/**
 * Represents the context for using a file select object.
 */
export const ZFileSelectContext = createContext<IZFileSelect>(new ZFileSelectInput());

/**
 * Retrieves the global file select object.
 *
 * @return The global file select object.
 */
export function useFileSelect(): IZFileSelect {
  return useContext(ZFileSelectContext);
}
