import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense
  extends IZComponentStyle,
    IZComponentWidth<ZSizeFixed>,
    IZComponentLoading,
    IZComponentName {}
