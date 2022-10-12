import { Button } from '@mui/material';
import React from 'react';

import { cssClass } from '@zthun/works.core';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { ZGridLayout } from '../layout/grid-layout';
import { ZCircularProgress } from '../loading/circular-progress';
import { ZStateColor } from '../theme/state-color';

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle {
  color?: ZStateColor;
  outline?: boolean;

  onClick?: (e: React.MouseEvent) => any;
}

/**
 * Represents a basic button component.
 *
 * @param props The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const {
    className,
    color = ZStateColor.Inherit,
    disabled,
    loading = false,
    label,
    outline,
    avatar,
    onClick = noop
  } = props;
  const buttonClass = cssClass('ZButton-root', className);
  const variant = outline ? 'outlined' : 'contained';

  return (
    <Button className={buttonClass} color={color} variant={variant} disabled={disabled} onClick={onClick}>
      <ZGridLayout alignItems='center' columns='auto 1fr auto' gap='sm'>
        {avatar}
        <div className='ZButton-content'>{label}</div>
        <ZCircularProgress className='ZButton-loading' size='sm' show={!!loading} />
      </ZGridLayout>
    </Button>
  );
}
