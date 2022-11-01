import { InputAdornment, OutlinedInputProps, TextFieldProps } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { get } from 'lodash';
import React, { ReactNode } from 'react';
import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentValue } from '../component/component-value';
import { useAmbassadorState } from '../state/use-ambassador-state';

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

/**
 * Constructs a TextFieldProps object based on the props for an IZText component.
 *
 * @param props
 *        The properties for the IZText component.
 * @param initial
 *        The initial value for the text field.
 *
 * @returns
 *        The JSX to render the component.
 */
export function useText<T>(props: IZText<T>, initial: T): TextFieldProps {
  const { name, disabled, value, label, required, placeholder, readOnly, prefix, suffix, onValueChange } = props;

  const [_value, _setValue] = useAmbassadorState(value, onValueChange, initial);

  const handleChange = (e: any) => {
    // This one is a bit weird.  Basically, we want to handle both onChange and onInput
    // so that form fillers will just automatically populate our fields for username/password
    // address, etc.  You need to handle both events, even though they're a bit redundant.
    const _val = get(e, 'target.value');
    _setValue(_val);
  };

  const renderAdornment = (adornment: ReactNode, position: 'start' | 'end') => {
    const clasz = cssClass('ZText-adornment', `ZText-adornment-${position}`);

    return adornment == null ? null : (
      <InputAdornment className={clasz} position={position}>
        {adornment}
      </InputAdornment>
    );
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
    name,
    required,
    placeholder: placeholder,
    label,
    InputProps,
    onChange: handleChange,
    onInput: handleChange
  };
}
