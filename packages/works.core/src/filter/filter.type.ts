import { IZBinaryFilter } from './binary-filter.interface';
import { IZCollectionFilter } from './collection-filter.interface';
import { IZLogicFilter } from './logic-filter.interface';
import { IZUnaryFilter } from './unary-filter.interface';

/**
 * Represents one of the filter types.
 */
export type IZFilter = IZBinaryFilter | IZLogicFilter | IZCollectionFilter | IZUnaryFilter;
