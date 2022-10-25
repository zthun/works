import { ZSizeFixed } from '@zthun/works.core';

import { IZComponentHeight } from '../component/component-height';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense
  extends IZComponentStyle,
    IZComponentWidth<ZSizeFixed>,
    IZComponentHeight<ZSizeFixed>,
    IZComponentLoading {}
