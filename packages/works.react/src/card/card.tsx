import { Card, CardActions, CardContent, CardHeader, Paper } from '@mui/material';
import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeFixed,
  ZSizeVaried
} from '@zthun/works.chonkify';
import { cssClass } from '@zthun/works.core';
import React, { ReactNode } from 'react';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentHeading } from '../component/component-heading';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/make-styles';
import { ZCaption, ZH2 } from '../typography/typography';

export interface IZCard
  extends IZComponentHeading,
    IZComponentAvatar,
    IZComponentHierarchy,
    IZComponentLoading,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth {
  footer?: ReactNode;
}

const ChartWidth = createSizeChartFixedGeometric(1.4, 18);
const ChartFixed = createSizeChartFixedCss(ChartWidth, 'rem');
const ChartVaried = createSizeChartVariedCss();
const ChartVoid = createSizeChartVoidCss();
const CardSizeChart = { ...ChartFixed, ...ChartVaried, ...ChartVoid };

const useCardStyles = makeStyles<IZCard>()((_, props) => {
  const { width = ZSizeVaried.Fit } = props;

  return {
    root: {
      position: 'relative',
      maxWidth: CardSizeChart[width],
      minWidth: ChartFixed[ZSizeFixed.ExtraSmall]
    }
  };
});

/**
 * Represents a basic card component.
 *
 * @param props
 *        The properties to the card.
 *
 * @returns
 *        The JSX to render the card.
 */
export function ZCard(props: IZCard) {
  const { avatar, className, children, footer, heading, subHeading, name } = props;
  const { classes } = useCardStyles(props);
  const clasz = cssClass('ZCard-root', className, classes.root);

  const renderFooter = () => {
    return footer ? <CardActions className='ZCard-footer'>{footer}</CardActions> : null;
  };

  return (
    <Paper className={clasz} elevation={5} data-name={name}>
      <Card>
        <CardHeader
          className='ZCard-header'
          avatar={avatar}
          title={
            <ZH2 className='ZCard-header-heading' compact>
              {heading}
            </ZH2>
          }
          subheader={
            <ZCaption className='ZCard-header-subheading' compact>
              {subHeading}
            </ZCaption>
          }
        />
        <CardContent className='ZCard-content'>{children}</CardContent>
        {renderFooter()}
      </Card>
    </Paper>
  );
}
