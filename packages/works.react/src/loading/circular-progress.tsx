import { CircularProgress } from '@mui/material';
import React from 'react';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentStyle } from '../component/component-style.';

/**
 * Represents properties for the circular progress component.
 */
export interface IZCircularProgressProps extends IZComponentStyle, IZComponentSizeable {
  /**
   * The spinner color.
   *
   * @default 'inherit'
   */
  color?: 'primary' | 'secondary' | 'inherit';

  /**
   * True to show the spinner, false to hide it.
   *
   * @default true
   */
  show?: boolean;
}

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZCircularProgress(props: IZCircularProgressProps) {
  const { className = '', show = true, size = 'auto', color = 'inherit' } = props;

  // Note: Max and auto will result in the default
  const sizeMap = {
    sm: '1rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem'
  };

  return show ? (
    <CircularProgress
      className={`${className} ZCircularProgress-root`}
      data-testid={props['data-testid']}
      size={sizeMap[size]}
      color={color}
    />
  ) : null;
}
