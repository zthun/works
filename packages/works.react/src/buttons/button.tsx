import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import {
  createSizeChartFixedCss,
  createSizeChartFixedLinear,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  cssClass,
  ZSizeChart,
  ZSizeFixed,
  ZSizeVaried
} from '@zthun/works.core';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { ZCircularProgress } from '../loading/circular-progress';
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
    IZComponentWidth,
    IZComponentHeight {
  borderless?: boolean;
  color?: ZButtonColor;
  outline?: boolean;
  tooltip?: ReactNode;

  onClick?: (e: React.MouseEvent) => any;
}

const ChartFixed = createSizeChartFixedCss(createSizeChartFixedLinear(2, 2), 'rem');
const ChartVaried = createSizeChartVariedCss();
const ChartVoid = createSizeChartVoidCss();
const ButtonSizeChart: ZSizeChart<string> = { ...ChartFixed, ...ChartVaried, ...ChartVoid };

const useButtonStyles = makeStyles<IZButton>()((theme, props) => {
  const { width = ZSizeVaried.Fit, height = ZSizeVaried.Fit } = props;

  return {
    wrapper: {
      display: 'inline-flex',
      width: ButtonSizeChart[width],
      height: ButtonSizeChart[height]
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
          <ZCircularProgress className='ZButton-loading' size='sm' show={!!loading} />
        </Button>
      </span>
    </Tooltip>
  );
}
