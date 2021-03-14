import React from 'react';
import { ZCircularProgress } from './circular-progress';
import { IZCircularProgressProps } from './circular-progress.props';

/**
 * Creates a circular progress spinner that is positioned absolutely and contains a backdrop to disable everything behind it.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx to render the component.
 */
export function ZCircularBackdrop(props: IZCircularProgressProps) {
  return props.show ? (
    <div className='ZCircularBackdrop-root'>
      <div className='ZCircularBackdrop-backdrop' />
      <ZCircularProgress {...props} />
    </div>
  ) : null;
}

ZCircularBackdrop.defaultProps = {
  className: '',
  show: true,
  size: '1em',
  color: 'inherit'
};
