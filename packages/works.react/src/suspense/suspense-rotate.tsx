import { CircularProgress } from '@mui/material';
import { createSizeChartFixedArithmetic, createSizeChartFixedCss, ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { makeStyles } from '../theme/make-styles';
import { ZColorless, ZColorTint } from '../theme/state-color';
import { IZSuspense } from './suspense';

const SuspenseRotateSizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');

const useSuspenseRotateStyles = makeStyles<IZSuspense>()((theme, props) => {
  const { color = ZColorless.Inherit, tint = ZColorTint.Main, width = ZSizeFixed.ExtraSmall } = props;
  const size = SuspenseRotateSizeChart[width];

  return {
    root: {
      color: theme.colorify(color, tint),
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
  const { className, loading = true } = props;
  const { classes } = useSuspenseRotateStyles(props);

  if (!loading) {
    return null;
  }

  const clasz = cssClass('ZSuspense-root ZSuspense-rotate', className, classes.root);

  return (
    <div className={clasz}>
      <CircularProgress size='inherit' color='inherit' />
    </div>
  );
}
