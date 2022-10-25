import { CircularProgress } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZSuspense } from './suspense';

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading } = props;

  if (!loading) {
    return null;
  }

  const clasz = cssClass('ZLoading-root', className);
  return <CircularProgress className={clasz} />;
}
