import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentRange } from '../component/component-range';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';

/**
 * Represents a component that lets the user enter or select a number.
 */
export interface IZNumber<T = number>
  extends IZComponentValue<T>,
    IZComponentDisabled,
    IZComponentRange<number>,
    IZComponentName,
    IZComponentLabel,
    IZComponentStyle {
  step?: number;
}
