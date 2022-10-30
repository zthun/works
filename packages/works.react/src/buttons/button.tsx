import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import { createSizeChartVariedCss, cssClass, ZSizeFixed, ZSizeVaried } from '@zthun/works.core';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { makeStyles } from '../theme/make-styles';
import { ZColorless, ZSeverityColor } from '../theme/state-color';

export type ZButtonColor = ZSeverityColor | ZColorless.Inherit;

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth<ZSizeVaried> {
  borderless?: boolean;
  color?: ZButtonColor;
  outline?: boolean;
  tooltip?: ReactNode;

  onClick?: (e: React.MouseEvent) => any;
}

const ButtonSizeChart = createSizeChartVariedCss();

const useButtonStyles = makeStyles<IZButton>()((theme, props) => {
  const { width = ZSizeVaried.Fit } = props;

  return {
    wrapper: {
      display: 'inline-flex',
      width: ButtonSizeChart[width]
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%'
    },
    content: {
      marginLeft: theme.gap(ZSizeFixed.Small),
      marginRight: theme.gap(ZSizeFixed.Small),
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
  };
});

/**
 * Represents a basic button component.
 *
 * @param props The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const {
    avatar,
    className,
    color,
    borderless,
    disabled,
    loading,
    label,
    name,
    outline,
    tooltip,
    onClick = noop
  } = props;

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
      <span className={classes.wrapper}>
        <Button
          className={buttonClass}
          data-name={name}
          color={color}
          variant={variant}
          disabled={disabled}
          onClick={onClick}
        >
          {avatar}
          <div className={contentClass}>{label}</div>
          <ZSuspenseRotate
            className='ZButton-loading'
            width={ZSizeFixed.ExtraSmall}
            color={ZColorless.Inherit}
            loading={!!loading}
          />
        </Button>
      </span>
    </Tooltip>
  );
}
