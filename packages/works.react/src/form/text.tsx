import { InputAdornment, OutlinedInputProps, TextFieldProps } from '@mui/material';
import { get } from 'lodash';
import React, { ReactNode } from 'react';
import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentValue } from '../component/component-value';
import { IZComponentWidth } from '../component/component-width';
import { useAmbassadorState } from '../state/use-ambassador-state';

/**
 * Represents an input for free form text
 */
export interface IZText
  extends IZComponentDisabled,
    IZComponentWidth,
    IZComponentName,
    IZComponentValue<string>,
    IZComponentLabel,
    IZComponentAdornment,
    IZComponentStyle {
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

/**
 * Constructs common props a text field.
 *
 * @param props
 *        The props for a text component.
 *
 * @returns
 *        The field props that can be passed to a MUI TextField component.
 */
export function useText(props: IZText): TextFieldProps {
  const { disabled, value, label, required, placeholder, readOnly, prefix, suffix, onValueChange } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, '');

  const handleChange = (e: any) => {
    // This one is a bit weird.  Basically, we want to handle both onChange and onInput
    // so that form fillers will just automatically populate our fields for username/password
    // address, etc.  You need to handle both events, even though they're a bit redundant.
    const _val = get(e, 'target.value');
    _setValue(_val);
  };

  const renderAdornment = (adornment: ReactNode, position: 'start' | 'end') => {
    return adornment == null ? null : <InputAdornment position={position}>{adornment}</InputAdornment>;
  };

  const InputProps: Partial<OutlinedInputProps> = {
    readOnly,
    startAdornment: renderAdornment(prefix, 'start'),
    endAdornment: renderAdornment(suffix, 'end')
  };

  return {
    disabled,
    variant: 'outlined',
    value: _value,
    required,
    placeholder,
    label,
    InputProps,
    onChange: handleChange,
    onInput: handleChange
  };
}
