import { InputAdornment, OutlinedInputProps, TextFieldProps } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';
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
  const { name, disabled, value, label, required, placeholder, readOnly, prefix, suffix, onValueChange = noop } = props;

  const [current, setCurrent] = useState(value || initial);

  useEffect(() => {
    setCurrent(value || initial);
  }, [value, initial]);

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
    value: current,
    name,
    required,
    placeholder: placeholder,
    label,
    InputProps,
    onBlur: () => onValueChange(current),
    onInput: (e) => setCurrent(get(e.target, 'value'))
  };
}
