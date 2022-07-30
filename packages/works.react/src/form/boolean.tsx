import React, { ReactNode } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { IZComponentValue } from '../component/component-value';
import { usePropState } from '../state/use-prop-state';

export interface IZBoolean extends IZComponentDisabled, IZComponentValue<boolean>, IZComponentStyle {
  type?: 'checkbox' | 'radio' | 'inline-radio' | 'switch';

  truthy?: ReactNode;
  falsy?: ReactNode;
}

/**
 * Represents a basic checkbox style component.
 *
 * @param props The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZBoolean(props: IZBoolean) {
  const { className, disabled, type = 'checkbox', truthy, value, onValueChange } = props;
  const [_value, _setValue] = usePropState(value, onValueChange);
  const booleanClass = cssClass('ZBoolean-root', `ZBoolean-${type}`, className);

  /**
   * Renders the checkbox type.
   *
   * @returns The JSX for the checkbox type.
   */
  function renderBoolean() {
    return <FormControlLabel control={<Checkbox disabled={disabled} checked={_value} onChange={(_, checked) => _setValue(checked)} />} label={truthy} />;
  }

  return <div className={booleanClass}>{renderBoolean()}</div>;
}
