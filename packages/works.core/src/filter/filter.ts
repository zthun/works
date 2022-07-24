import { IZBinaryFilter } from './binary-filter';
import { IZCollectionFilter } from './collection-filter';
import { IZLogicFilter } from './logic-filter';
import { IZUnaryFilter } from './unary-filter';

/**
 * Represents one of the filter types.
 */
export type IZFilter = IZBinaryFilter | IZLogicFilter | IZCollectionFilter | IZUnaryFilter;
