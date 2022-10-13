import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import { cssClass } from '@zthun/works.core';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { ZCircularProgress } from '../loading/circular-progress';
import { makeStyles } from '../theme/make-styles';
import { ZStateColor } from '../theme/state-color';

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle {
  color?: ZStateColor;
  outline?: boolean;
  tooltip?: ReactNode;

  onClick?: (e: React.MouseEvent) => any;
}

const useButtonStyles = makeStyles<IZButton>()((theme) => ({
  button: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  content: {
    marginLeft: theme.sizing.gaps.sm,
    marginRight: theme.sizing.gaps.sm,
    display: 'flex'
  }
}));

/**
 * Represents a basic button component.
 *
 * @param props The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const { avatar, className, color, disabled, loading, label, outline, tooltip, onClick = noop } = props;

  const { classes } = useButtonStyles(props);
  const buttonClass = cssClass('ZButton-root', className, classes.button);
  const contentClass = cssClass('ZButton-content', classes.content);
  const variant = outline ? 'outlined' : 'contained';

  return (
    <Tooltip title={tooltip}>
      <span>
        <Button className={buttonClass} color={color} variant={variant} disabled={disabled} onClick={onClick}>
          {avatar}
          <div className={contentClass}>{label}</div>
          <ZCircularProgress className='ZButton-loading' size='sm' show={!!loading} />
        </Button>
      </span>
    </Tooltip>
  );
}
