import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material';

import { cssClass, ZSizeFixed } from '@zthun/works.core';
import React from 'react';
import { ZButton } from '../buttons/button';
import { ZGridLayout } from '../layout/grid-layout';
import { useSafeState } from '../state/use-safe-state';
import { ZColorless } from '../theme/state-color';
import { IZText, useText } from './text';

/**
 * Represents a free form text component that does not display the content immediately.
 *
 * @param props
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextSensitive(props: IZText) {
  const { className, suffix, name } = props;
  const [type, setType] = useSafeState<'text' | 'password'>('password');
  const clasz = cssClass('ZText-root ZText-sensitive', className);

  const visible = type === 'text' ? <VisibilityOff /> : <VisibilityOn />;
  const _suffix = (
    <ZGridLayout columns='auto auto' alignItems='center' gap={ZSizeFixed.Small}>
      {suffix}
      <ZButton color={ZColorless.Inherit} borderless label={visible} onClick={toggleVisibility} />
    </ZGridLayout>
  );

  const _fieldProps = useText({ ...props, suffix: _suffix });

  /**
   * Toggles the visibility of the password.
   */
  function toggleVisibility() {
    const next = type === 'text' ? 'password' : 'text';
    setType(next);
  }

  return <TextField {..._fieldProps} type={type} className={clasz} data-name={name} />;
}
