import { Checkbox, FormControlLabel } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { usePropState } from '../state/use-prop-state';
import { IZBoolean } from './boolean';

/**
 * A boolean component that can be checked, unchecked, or indeterminate
 *
 * @param props
 *        The properties for this boolean component.
 *
 * @returns
 *        The JSX to render the checkbox
 */
export function ZBooleanCheckbox(props: IZBoolean<boolean | null>) {
  const { className, disabled, label, value, onValueChange } = props;
  const [_value, _setValue] = usePropState(value, onValueChange);
  const booleanClass = cssClass('ZBoolean-root', 'ZBoolean-checkbox', className);
  const checked = _value == null ? false : _value;
  const indeterminate = _value === null;

  return (
    <FormControlLabel
      className={booleanClass}
      control={
        <Checkbox
          disabled={disabled}
          checked={checked}
          indeterminate={indeterminate}
          onChange={(_, checked) => _setValue(checked)}
        />
      }
      label={label}
    />
  );
}
