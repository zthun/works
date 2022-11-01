import { ZSizeFixed } from './fixed/size-fixed';
import { ZSizeVaried } from './varied/size-varied';
import { ZSizeVoid } from './void/size-void';

/**
 * A sizing object that can be one any of the valid enum sizes.
 */
export type ZSize = ZSizeFixed | ZSizeVaried | ZSizeVoid;

/**
 * Represents a chart that maps a size to more useable values.
 */
export type ZSizeChart<T> = Record<ZSize, T>;
