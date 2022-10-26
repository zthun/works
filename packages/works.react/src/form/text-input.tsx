import { TextField } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { get } from 'lodash';
import React from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
import { IZText } from './text';

/**
 * Represents a free form text component that just displays an html input.
 *
 * @param props
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInput(props: IZText) {
  const { className, value, label, onValueChange } = props;
  const clasz = cssClass('ZText-root ZText-input', className);
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);

  const handleChange = (e: any) => {
    // This one is a bit weird.  Basically, we want to handle both onChange and onInput
    // so that form fillers will just automatically populate our fields for username/password
    // address, etc.  You need to handle both events, even though they're a bit redundant.
    const _val = get(e, 'target.value');
    _setValue(_val);
  };

  return (
    <TextField
      className={clasz}
      variant='outlined'
      value={_value}
      label={label}
      onChange={handleChange}
      onInput={handleChange}
    />
  );
}
