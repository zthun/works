import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import { cssClass } from '@zthun/works.core';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.';
import { ZCircularProgress } from '../loading/circular-progress';
import { makeStyles } from '../theme/make-styles';
import { ZColorless, ZSeverityColor } from '../theme/state-color';
import { ZStateSize } from '../theme/state-size';

export type ZButtonColor = ZSeverityColor | ZColorless.Inherit;

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle {
  color?: ZButtonColor;
  borderless?: boolean;
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
    marginLeft: theme.gap(ZStateSize.Small),
    marginRight: theme.gap(ZStateSize.Small),
    display: 'flex'
  },
  borderless: {
    'border': 0,
    'boxShadow': 'none',

    '&:hover': {
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none'
    }
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
  const { avatar, className, color, borderless, disabled, loading, label, outline, tooltip, onClick = noop } = props;

  const { classes } = useButtonStyles(props);
  const buttonClass = cssClass(
    'ZButton-root',
    ['ZButton-borderless', !!borderless],
    ['ZButton-outline', !!outline],
    className,
    classes.button,
    [classes.borderless, !!borderless]
  );
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
