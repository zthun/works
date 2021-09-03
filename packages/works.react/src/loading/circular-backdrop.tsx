import React from 'react';
import { IZCircularProgressProps, ZCircularProgress } from './circular-progress';

/**
 * Creates a circular progress spinner that is positioned absolutely and contains a backdrop to disable everything behind it.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx to render the component.
 */
export function ZCircularBackdrop(props: IZCircularProgressProps) {
  const { show = true } = props;

  return show ? (
    <div className='ZCircularBackdrop-root'>
      <div className='ZCircularBackdrop-backdrop' />
      <ZCircularProgress {...props} />
    </div>
  ) : null;
}
