import { InputAdornment, OutlinedInputProps, TextFieldProps } from '@mui/material';
import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { cssClass } from '@zthun/works.core';
import { get, noop } from 'lodash';
import React, { KeyboardEvent, ReactNode, useEffect, useState } from 'react';
import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
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
export function useText<T extends string>(props: IZText<T>, initial: T): TextFieldProps {
  const { name, disabled, value, label, required, placeholder, readOnly, prefix, suffix, onValueChange = noop } = props;

  const [current, setCurrent] = useState(value || initial);

  useEffect(() => {
    setCurrent(value || initial);
  }, [value, initial]);

  const getValue = (e: any): T => {
    return get(e, 'value');
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
    value: current,
    name,
    required,
    placeholder: placeholder,
    label,
    InputProps,
    onBlur: () => onValueChange(current),
    onInput: (e) => setCurrent(getValue(e.target))
  };
}

/**
 * Constructs a keyboard handler that commits the  value when the enter key is pressed.
 *
 * @param props
 *        The text properties.
 * @param onKeyDown
 *        A different key down handler that
 *
 * @returns
 *        A new function that handles the event key in addition to the
 *        other key handler.
 *
 */
export function withEnterCommit<T>(props: IZText<T>, onKeyDown: (e: KeyboardEvent<HTMLElement>) => any = noop) {
  const { onValueChange = noop } = props;

  return (e: KeyboardEvent<HTMLElement>) => {
    if (e.code === ZCircusKeyboardQwerty.enter.code) {
      const current = get(e.target, 'value', '');
      onValueChange(current);
    }

    onKeyDown(e);
  };
}
