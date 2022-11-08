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
import { IZFashion, ZFashionBuilder } from '@zthun/works.fashion';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/make-styles';

type ZBorderSize = ZSizeFixed | ZSizeVoid;

interface IZFashionProps extends IZComponentFashion {
  focus?: IZFashion;
  hover?: IZFashion;
}

interface IZBorderProps extends IZFashionProps, IZComponentWidth<ZBorderSize> {
  style?: Property.BorderStyle;
}

export interface IZBorderLayout extends IZComponentWidth, IZComponentHierarchy, IZComponentStyle {
  border?: IZBorderProps;
  background?: IZFashionProps;
}

const normalizeBorderFields = (border?: IZBorderProps): Required<IZBorderProps> => {
  const transparent = new ZFashionBuilder().transparent().build();

  return {
    width: firstDefined(ZSizeFixed.ExtraSmall, border?.width),
    style: firstDefined('solid', border?.style),
    fashion: firstDefined(transparent, border?.fashion),
    focus: firstDefined(transparent, border?.focus, border?.fashion),
    hover: firstDefined(transparent, border?.hover, border?.fashion)
  };
};

const normalizeBackgroundFields = (background?: IZFashionProps): Required<IZFashionProps> => {
  const transparent = new ZFashionBuilder().transparent().build();
  return {
    fashion: firstDefined(transparent, background?.fashion),
    focus: firstDefined(transparent, background?.focus, background?.fashion),
    hover: firstDefined(transparent, background?.hover, background?.fashion)
  };
};

const BorderLayoutSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss()
};

const useBorderLayoutStyles = makeStyles<IZBorderLayout>()((theme, props) => {
  const { border, background, width } = props;
  const _border = normalizeBorderFields(border);
  const _background = normalizeBackgroundFields(background);

  return {
    root: {
      'border': `${_border.width} ${_border.style} ${theme.colorify(_border.fashion)}`,
      'width': BorderLayoutSizeChart[firstDefined(ZSizeVaried.Full, width)],
      'backgroundColor': theme.colorify(_background.fashion),

      '&:focus': {
        border: `${_border.width} ${_border.style} ${theme.colorify(_border.focus)}`,
        backgroundColor: theme.colorify(_background.focus)
      },

      '&:hover': {
        border: `${_border.width} ${_border.style} ${theme.colorify(_border.hover)}`,
        backgroundColor: theme.colorify(_background.hover)
      }
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
