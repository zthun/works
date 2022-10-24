import { ZSizeFixed } from './size-fixed';
import { ZSizeVaried } from './size-varied';
import { ZSizeVoid } from './size-void';

/**
 * A sizing object that can be one any of the valid enum sizes.
 */
export type ZSize = ZSizeFixed | ZSizeVaried | ZSizeVoid;

/**
 * Represents a chart that maps a size to more useable values.
 */
export type ZSizeChart<T> = Record<ZSize, T>;
