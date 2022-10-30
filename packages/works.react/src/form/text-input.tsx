import { InputAdornment, OutlinedInputProps, TextField } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { get } from 'lodash';
import React, { ReactNode } from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
import { IZText } from './text';

/**
 * Represents the type of text.
 */
export enum ZTextType {
  /**
   * Regular text that is not hidden
   *
   * This is the default.
   */
  Text = 'text',

  /**
   * Password text where the value is never displayed.
   */
  Password = 'password'
}

/**
 * Represents props for the text input.
 */
export interface IZTextInput extends IZText<string> {
  /**
   * The optional type of text.
   *
   * @default ZTextType.Text
   */
  type?: ZTextType;
}

/**
 * Represents a free form text component that just displays an html input.
 *
 * @param props
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInput(props: IZTextInput) {
  const {
    className,
    name,
    disabled,
    value,
    label,
    required,
    placeholder,
    readOnly,
    prefix,
    suffix,
    type = ZTextType.Text,
    onValueChange
  } = props;

  const [_value, _setValue] = useAmbassadorState(value, onValueChange, '');
  const clasz = cssClass('ZText-root ZText-input', className);

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

  return (
    <TextField
      className={clasz}
      disabled={disabled}
      variant='outlined'
      value={_value}
      name={name}
      required={required}
      placeholder={placeholder}
      label={label}
      type={type}
      InputProps={InputProps}
      onChange={handleChange}
      onInput={handleChange}
      data-name={name}
    />
  );
}
