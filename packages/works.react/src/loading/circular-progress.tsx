import { CircularProgress } from '@mui/material';
import React from 'react';
import { IZComponentStyle } from '../component/component-style.interface';

/**
 * Represents properties for the circular progress component.
 */
export interface IZCircularProgressProps extends IZComponentStyle {
  /**
   * An html size string that represents the size.
   *
   * @example 2em
   *
   * @default '1em';
   */
  size?: string;

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
export function ZCircularProgress(props: IZCircularProgressProps): JSX.Element {
  const { className = '', show = true, size = '1em', color = 'inherit' } = props;

  return show ? <CircularProgress className={`${className} ZCircularProgress-root`} data-testid={props['data-testid']} size={size} color={color} /> : null;
}
