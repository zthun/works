import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { IZCircularProgressProps } from './circular-progress.props';

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZCircularProgress(props: IZCircularProgressProps): JSX.Element {
  return props.show ? <CircularProgress className={`${props.className} ZCircularProgress-root`} data-testid={props['data-testid']} size={props.size} color={props.color} /> : null;
}

ZCircularProgress.defaultProps = {
  className: '',
  show: true,
  size: '1em',
  color: 'inherit'
};
