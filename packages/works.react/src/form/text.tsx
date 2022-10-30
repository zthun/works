import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentValue } from '../component/component-value';

/**
 * Represents an input for free form text
 */
export interface IZText<T = string>
  extends IZComponentDisabled,
    IZComponentName,
    IZComponentValue<T>,
    IZComponentLabel,
    IZComponentAdornment,
    IZComponentStyle {
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}
