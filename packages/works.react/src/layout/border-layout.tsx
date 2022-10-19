import { cssClass, firstDefined } from '@zthun/works.core';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { colorify } from '../theme/colorify';
import { makeStyles } from '../theme/make-styles';
import { ZColorless, ZColorTint, ZShadeColor, ZStateColor } from '../theme/state-color';
import { ZStateSize } from '../theme/state-size';

export interface IZBorderLayout extends IZComponentWidth, IZComponentHierarchy, IZComponentStyle {
  border?: {
    size?: Exclude<ZStateSize, ZStateSize.Auto | ZStateSize.Max>;
    style?: Property.BorderStyle;
    color?: ZStateColor;
    tint?: ZColorTint;
  };
  background?: {
    color?: ZStateColor;
    tint?: ZColorTint;
  };
}

const useBorderLayoutStyles = makeStyles<IZBorderLayout>()((theme, props) => {
  const { border, background } = props;
  const _borderSize = firstDefined(ZStateSize.ExtraSmall, border?.size);
  const _borderColor = firstDefined(ZShadeColor.Grey, border?.color);
  const _borderTint = firstDefined(ZColorTint.T400, border?.tint);

  const _backgroundColor = firstDefined(ZColorless.Transparent, background?.color);
  const _backgroundTint = background?.tint;

  const borderSize = theme.sizing.thickness[_borderSize];
  const borderColor = colorify(theme, _borderColor, _borderTint);
  const borderStyle = firstDefined('solid', border?.style);

  const width = theme.sizing.card[firstDefined(ZStateSize.Max, props.width)];
  const backgroundColor = colorify(theme, _backgroundColor, _backgroundTint);

  return {
    root: {
      border: `${borderSize} ${borderStyle} ${borderColor}`,
      width,
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
  const { className, children } = props;
  const { classes } = useBorderLayoutStyles(props);
  const clasz = cssClass('ZBorderLayout-root', className, classes.root);

  return <div className={clasz}>{children}</div>;
}
