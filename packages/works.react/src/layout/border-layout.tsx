import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid
} from '@zthun/works.chonky-cat';
import { cssClass, firstDefined } from '@zthun/works.core';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/make-styles';
import { ZColorless, ZColorTint, ZShadeColor, ZStateColor } from '../theme/state-color';

export interface IZBorderLayout extends IZComponentWidth, IZComponentHierarchy, IZComponentStyle {
  border?: {
    size?: ZSizeFixed | ZSizeVoid;
    style?: Property.BorderStyle;
    color?: ZStateColor;
    tint?: ZColorTint;
  };
  background?: {
    color?: ZStateColor;
    tint?: ZColorTint;
  };
}

const normalizeBorderFields = (border?: {
  size?: ZSizeFixed | ZSizeVoid;
  style?: Property.BorderStyle;
  color?: ZStateColor;
  tint?: ZColorTint;
}): [ZSizeFixed | ZSizeVoid, ZStateColor, ZColorTint] => {
  return [
    firstDefined(ZSizeFixed.ExtraSmall, border?.size),
    firstDefined(ZShadeColor.Grey, border?.color),
    firstDefined(ZColorTint.T400, border?.tint)
  ];
};

const normalizeBackgroundFields = (background?: {
  color?: ZStateColor;
  tint?: ZColorTint;
}): [ZStateColor, ZColorTint] => {
  return [firstDefined(ZColorless.Transparent, background?.color), firstDefined(ZColorTint.Main, background?.tint)];
};

const BorderLayoutSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss()
};

const useBorderLayoutStyles = makeStyles<IZBorderLayout>()((theme, props) => {
  const { border, background, width = ZSizeVaried.Full } = props;
  const [_borderSize, _borderColor, _borderTint] = normalizeBorderFields(border);
  const [_backgroundColor, _backgroundTint] = normalizeBackgroundFields(background);

  const borderSize = theme.thickness(_borderSize);
  const borderColor = theme.colorify(_borderColor, _borderTint);
  const borderStyle = firstDefined('solid', border?.style);
  const _width = BorderLayoutSizeChart[width];
  const backgroundColor = theme.colorify(_backgroundColor, _backgroundTint);

  return {
    root: {
      border: `${borderSize} ${borderStyle} ${borderColor}`,
      width: _width,
      backgroundColor
    }
  };
});

/**
 * Represents a bordered box.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX for this component.
 */
export function ZBorderLayout(props: IZBorderLayout) {
  const { className, children, border, background } = props;
  const { classes } = useBorderLayoutStyles(props);
  const clasz = cssClass('ZBorderLayout-root', className, classes.root);
  const [borderSize, _borderColor, _borderTint] = normalizeBorderFields(border);
  const [_backgroundColor, _backgroundTint] = normalizeBackgroundFields(background);

  const borderStyle = firstDefined('solid', border?.style);
  const borderColor = `${_borderColor}[${_borderTint}]`;
  const backgroundColor = `${_backgroundColor}[${_backgroundTint}]`;

  return (
    <div
      data-border-color={borderColor}
      data-border-size={borderSize}
      data-border-style={borderStyle}
      data-background-color={backgroundColor}
      className={clasz}
    >
      {children}
    </div>
  );
}
