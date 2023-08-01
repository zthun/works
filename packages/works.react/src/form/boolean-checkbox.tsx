import { Checkbox, FormControlLabel } from '@mui/material';
import { useAmbassadorState } from '@zthun/helpful-react';
import { cssClass } from '@zthun/works.core';
import React from 'react';
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
  const { className, disabled, label, value, onValueChange, name } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
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
          name={name}
        />
      }
      name={name}
      data-name={name}
      label={label}
    />
  );
}
