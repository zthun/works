import { IBinaryFilter } from './binary-filter.interface';
import { ICollectionFilter } from './collection-filter.interface';
import { ILogicFilter } from './logic-filter.interface';
import { IUnaryFilter } from './unary-filter.interface';

/**
 * Represents one of the filter types.
 */
export type IFilter = IBinaryFilter | ILogicFilter | ICollectionFilter | IUnaryFilter;
