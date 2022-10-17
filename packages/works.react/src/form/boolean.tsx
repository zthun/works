import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentValue } from '../component/component-value';

export interface IZBoolean<T> extends IZComponentDisabled, IZComponentValue<T>, IZComponentStyle, IZComponentLabel {}
