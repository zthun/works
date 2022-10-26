import { ReactNode } from 'react';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentValue } from '../component/component-value';
import { IZComponentWidth } from '../component/component-width';

/**
 * Represents an input for free form text
 */
export interface IZText
  extends IZComponentDisabled,
    IZComponentWidth,
    IZComponentName,
    IZComponentValue<string>,
    IZComponentLabel,
    IZComponentStyle {
  required?: boolean;
  placeholder?: string;
  sensitive?: boolean;
  multiline?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}
