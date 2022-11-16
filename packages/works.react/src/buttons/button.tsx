import { Button, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

import { createSizeChartVariedCss, ZSizeFixed, ZSizeVaried } from '@zthun/works.chonkify';
import { cssClass, firstDefined } from '@zthun/works.core';
import { IZFashionCoordination, ZFashionBuilder } from '@zthun/works.fashion';
import { noop } from 'lodash';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { makeStyles } from '../theme/make-styles';

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentDisabled,
    IZComponentLoading,
    IZComponentStyle,
    IZComponentName,
    IZComponentFashion<IZFashionCoordination>,
    IZComponentWidth<ZSizeVaried> {
  borderless?: boolean;
  outline?: boolean;
  tooltip?: ReactNode;

  onClick?: (e: React.MouseEvent) => any;
}

const ButtonSizeChart = createSizeChartVariedCss();

const useButtonStyles = makeStyles<IZButton>()((theme, props) => {
  const { width = ZSizeVaried.Fit, fashion = theme.fashion().dark } = props;

  const text = theme.colorify(fashion.contrast);
  const main = theme.colorify(fashion.main);
  const dark = theme.colorify(firstDefined(fashion.main, fashion.dark));
  const light = theme.colorify(firstDefined(fashion.main, fashion.light));

  const borderless = {
    border: 0,
    outline: 'none',
    boxShadow: 'none'
  };

  return {
    wrapper: {
      display: 'inline-flex',
      width: ButtonSizeChart[width]
    },

    button: {
      'display': 'inline-flex',
      'alignItems': 'center',
      'width': '100%',
      'color': text,
      'backgroundColor': main,
      'borderColor': dark,

      '&:hover': {
        outline: `${theme.thickness()} solid ${light}`,
        backgroundColor: dark
      },

      '&:disabled': {
        color: 'rgb(0, 0, 0, 0.25)'
      },

      '&.ZButton-outline': {
        'backgroundColor': theme.colorify(new ZFashionBuilder().transparent().build()),
        'color': main,
        'borderColor': main,

        '&:disabled': {
          color: 'rgb(0, 0, 0, 0.25)'
        },

        '&:hover': {
          backgroundColor: main,
          color: text
        }
      },

      '&.ZButton-borderless': {
        ...borderless,
        '&:hover': borderless,
        '&:active': borderless
      }
    },

    content: {
      display: 'flex'
    },

    loading: {
      marginLeft: theme.gap(ZSizeFixed.ExtraSmall)
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
  const { avatar, className, borderless, disabled, loading, label, name, outline, tooltip, onClick = noop } = props;

  const { classes } = useButtonStyles(props);
  const buttonClass = cssClass(
    'ZButton-root',
    ['ZButton-borderless', !!borderless],
    ['ZButton-outline', !!outline],
    className,
    classes.button
  );
  const contentClass = cssClass('ZButton-content', classes.content);
  const variant = outline ? 'outlined' : 'contained';

  return (
    <Tooltip title={tooltip}>
      <span className={classes.wrapper}>
        <Button className={buttonClass} data-name={name} variant={variant} disabled={disabled} onClick={onClick}>
          {avatar}
          <div className={contentClass}>{label}</div>
          <ZSuspenseRotate
            className={cssClass('ZButton-loading', classes.loading)}
            width={ZSizeFixed.ExtraSmall}
            loading={!!loading}
          />
        </Button>
      </span>
    </Tooltip>
  );
}
