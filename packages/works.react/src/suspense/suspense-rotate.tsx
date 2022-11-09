import { CircularProgress } from '@mui/material';
import { createSizeChartFixedArithmetic, createSizeChartFixedCss, ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZSuspense } from './suspense';

const SuspenseRotateSizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading = true, name, width = ZSizeFixed.ExtraSmall } = props;
  const size = SuspenseRotateSizeChart[width];

  if (!loading) {
    return null;
  }

  const clasz = cssClass('ZSuspense-root ZSuspense-rotate', className);
  return <CircularProgress className={clasz} size={size} color='inherit' data-name={name} />;
}
