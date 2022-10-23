import { FormControlLabel, Switch } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { useAmbassadorState } from '../state/use-ambassador-state';
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
export function ZBooleanSwitch(props: IZBoolean<boolean>) {
  const { className, disabled, label, value, onValueChange } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange);
  const switchClass = cssClass('ZBoolean-root', 'ZBoolean-switch', className);
  const checked = !!_value;

  return (
    <FormControlLabel
      className={switchClass}
      control={<Switch disabled={disabled} checked={checked} onChange={(_, checked) => _setValue(checked)} />}
      label={label}
    />
  );
}
