import { CircularProgress } from '@mui/material';
import { createSizeChartFixedArithmetic, createSizeChartFixedCss, ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { makeStyles } from '../theme/make-styles';
import { IZSuspense } from './suspense';

const SuspenseRotateSizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');

const useSuspenseRotateStyles = makeStyles<IZSuspense>()((theme, props) => {
  const { width = ZSizeFixed.ExtraSmall } = props;
  const size = SuspenseRotateSizeChart[width];

  return {
    root: {
      height: size,
      width: size
    }
  };
});

/**
 * Renders a circular progress that can render nothing or the material ui circular progress.
 *
 * @param props The properties for the card.
 *
 * @returns The jsx for a circular loading progress.
 */
export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading = true, name } = props;
  const { classes } = useSuspenseRotateStyles(props);

  if (!loading) {
    return null;
  }

  const clasz = cssClass('ZSuspense-root ZSuspense-rotate', className, classes.root);

  return <CircularProgress className={clasz} size='inherit' color='inherit' data-name={name} />;
}
