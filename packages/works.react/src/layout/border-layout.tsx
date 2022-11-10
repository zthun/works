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
import { IZFashion, IZFashionCoordination, ZFashionBuilder, ZFashionCoordinationBuilder } from '@zthun/works.fashion';
import { Property } from 'csstype';
import React from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { IZComponentWidth } from '../component/component-width';
import { makeStyles } from '../theme/make-styles';

type ZBorderSize = ZSizeFixed | ZSizeVoid;

interface IZFashionProps<TFashion> extends IZComponentFashion<TFashion> {
  focus?: TFashion;
  hover?: TFashion;
}

interface IZBorderProps extends IZFashionProps<IZFashion>, IZComponentWidth<ZBorderSize> {
  style?: Property.BorderStyle;
}

interface IZBackgroundProps extends IZFashionProps<IZFashionCoordination> {}

export interface IZBorderLayout extends IZComponentWidth, IZComponentHierarchy, IZComponentStyle {
  border?: IZBorderProps;
  background?: IZBackgroundProps;
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

const normalizeBackgroundFields = (background?: IZBackgroundProps): Required<IZBackgroundProps> => {
  const transparent = new ZFashionCoordinationBuilder().transparent().build();
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

  const __border = (fashion: IZFashion) =>
    `${theme.thickness(_border.width)}  ${_border.style} ${theme.colorify(fashion)}`;

  return {
    root: {
      'border': __border(_border.fashion),
      'width': BorderLayoutSizeChart[firstDefined(ZSizeVaried.Full, width)],
      'backgroundColor': theme.colorify(_background.fashion.main),
      'color': theme.colorify(_background.fashion.contrast),

      '&:focus': {
        border: __border(_border.focus),
        backgroundColor: theme.colorify(_background.focus.main),
        color: theme.colorify(_background.focus.contrast)
      },

      '&:hover': {
        border: __border(_border.hover),
        backgroundColor: theme.colorify(_background.hover.main),
        color: theme.colorify(_background.hover.contrast)
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
