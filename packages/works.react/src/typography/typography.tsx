import { Typography } from '@mui/material';
import React, { ElementType } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';

export interface IZTypographyProps extends IZComponentHierarchy, IZComponentStyle {
  compact?: boolean;
}

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline';

const render = (variant: Variant, component: ElementType, props: IZTypographyProps) => {
  const { className, children, compact } = props;
  return (
    <Typography className={className} component={component} variant={variant} gutterBottom={!compact}>
      {children}
    </Typography>
  );
};

export const ZH1 = (props: IZTypographyProps) => render('h1', 'h1', props);
export const ZH2 = (props: IZTypographyProps) => render('h2', 'h2', props);
export const ZH3 = (props: IZTypographyProps) => render('h3', 'h3', props);
export const ZH4 = (props: IZTypographyProps) => render('h4', 'h4', props);
export const ZH5 = (props: IZTypographyProps) => render('h5', 'h5', props);
export const ZH6 = (props: IZTypographyProps) => render('h6', 'h6', props);

export const ZParagraph = (props: IZTypographyProps) => render('body1', 'p', props);
export const ZSubtitle = (props: IZTypographyProps) => render('subtitle1', 'p', props);
export const ZCaption = (props: IZTypographyProps) => render('caption', 'p', props);
export const ZOverline = (props: IZTypographyProps) => render('overline', 'p', props);
