import { Color, PaletteColor, Theme, useTheme as useMuiTheme } from '@mui/material';

import { createSpacing } from '@mui/system';
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedFibonacci,
  createSizeChartVoidCss,
  createSizeChartVoidZero,
  ZSizeFixed,
  ZSizeVoid
} from '@zthun/works.chonky-cat';
import { firstDefined } from '@zthun/works.core';
import { IZFashion, IZFashionCoordination } from '@zthun/works.fashion';
import { createMakeStyles } from 'tss-react';
import { IZthunworksFashion, useZthunworksFashion } from './fashion';

export type IZColor = Color;

const GapChart = {
  ...createSizeChartFixedFibonacci(0.5, 1),
  ...createSizeChartVoidZero()
};

const ThicknessChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(0.0625, 0.0625), 'rem'),
  ...createSizeChartVoidCss()
};

/**
 * The overall theme for the Zthunworks domain.
 *
 * This extends material main theme and adds
 * some helpers and size options.
 */
export interface IZTheme extends Theme {
  /**
   * Converts from a fashion object to a css color.
   *
   * @param fashion
   *        The fashion to convert.
   *
   * @returns
   *        A CSS compatible color option.
   */
  colorify(fashion: IZFashion): string;

  /**
   * Gets the current fashion design and coordination for colors.
   *
   @returns
          The current fashion design.
   */
  fashion(): Readonly<IZthunworksFashion>;

  /**
   * Converts a size enum to a spacing value.
   *
   * This is the same as calling spacing() with a direct
   * conversion table of size to spacing multiplier.  This mostly a
   * allows you to use spacing that is a little more reader friendly such as
   * gap(ZSizeFixed.Medium) instead of spacing(2).
   *
   * This is mostly appropriate for margin and padding.
   *
   * @param size
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  gap(size?: ZSizeFixed | ZSizeVoid): string;

  /**
   * Similar to gap, but uses a smaller multiplier and a smaller
   * base conversion.
   *
   * This is mostly appropriate for border widths and outlines.
   *
   * @param size
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  thickness(size?: ZSizeFixed | ZSizeVoid): string;
}

/**
 * Constructs the theme variables for zthunworks components.
 *
 * See https://www.npmjs.com/package/tss-react for more information.
 *
 * @returns The zthunworks theme.
 */
export function useZthunworksTheme(): IZTheme {
  const mui = useMuiTheme();
  const fashionTheme = useZthunworksFashion();

  const base = {
    colorify(fashion: IZFashion): string {
      if (fashion.hue === null) {
        return 'rgb(0, 0, 0, 0)';
      }

      return fashionTheme.palette[fashion.hue][fashion.shade];
    },

    fashion: () => fashionTheme,

    gap(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.Medium): string {
      return mui.spacing(GapChart[size]);
    },

    thickness(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.ExtraSmall): string {
      return ThicknessChart[size];
    }
  };

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);
  mui.components = firstDefined({}, mui.components);

  const setCoordination = (mui: PaletteColor, fashion: IZFashionCoordination) => {
    mui.main = base.colorify(fashion.main);
    mui.contrastText = base.colorify(fashion.contrast);
    mui.dark = base.colorify(firstDefined(fashion.main, fashion.dark));
    mui.light = base.colorify(firstDefined(fashion.main, fashion.light));
  };

  // Palette
  setCoordination(mui.palette.primary, base.fashion().primary);
  setCoordination(mui.palette.secondary, base.fashion().secondary);
  setCoordination(mui.palette.success, base.fashion().success);
  setCoordination(mui.palette.warning, base.fashion().warning);
  setCoordination(mui.palette.error, base.fashion().error);
  setCoordination(mui.palette.info, base.fashion().info);

  // Typography
  const fonts = "'Roboto', 'Arial', 'sans-serif'";
  mui.typography.fontFamily = fonts;
  mui.typography.body1.fontFamily = fonts;

  const createTypography = () => ({
    fontFamily: fonts
  });

  const createHeaderTypography = (fontSize: string) => ({
    ...createTypography(),
    fontSize: `calc(${fontSize} * 0.80)`,
    [mui.breakpoints.up('sm')]: {
      fontSize: `calc(${fontSize} * 0.85)`
    },
    [mui.breakpoints.up('md')]: {
      fontSize: `calc(${fontSize} * 0.90)`
    },
    [mui.breakpoints.up('lg')]: {
      fontSize: `calc(${fontSize} * 0.95)`
    },
    [mui.breakpoints.up('xl')]: {
      fontSize
    }
  });

  const createTextTypography = (fontSize: string) => ({
    ...createTypography(),
    fontSize: `calc(${fontSize} * 0.95)`,
    [mui.breakpoints.up('md')]: {
      fontSize
    }
  });

  mui.typography.h1 = createHeaderTypography('3rem');
  mui.typography.h2 = createHeaderTypography('2.5rem');
  mui.typography.h3 = createHeaderTypography('2rem');
  mui.typography.h4 = createHeaderTypography('1.5rem');
  mui.typography.h5 = createHeaderTypography('1.35rem');
  mui.typography.h6 = createHeaderTypography('1.15rem');

  mui.typography.body1 = createTextTypography('1rem');
  mui.typography.body2 = createTextTypography('1rem');
  mui.typography.subtitle1 = createTextTypography('1rem');
  mui.typography.subtitle2 = createTextTypography('1rem');
  mui.typography.caption = createTextTypography('0.9rem');
  mui.typography.overline = createTextTypography('0.9rem');

  mui.typography.button = createTextTypography('1rem');

  mui.components.MuiTypography = {
    styleOverrides: {
      gutterBottom: {
        marginBottom: base.gap()
      }
    }
  };

  // Autocomplete
  mui.components.MuiAutocomplete = {
    styleOverrides: {
      clearIndicator: {
        fontSize: '1.2rem',
        visibility: 'visible'
      }
    }
  };

  // Card
  mui.components.MuiCardHeader = {
    styleOverrides: {
      avatar: {
        fontSize: '3rem'
      }
    }
  };
  mui.components.MuiCardMedia = {
    styleOverrides: {
      root: {
        objectFit: 'fill'
      }
    }
  };

  // Checkbox
  mui.components.MuiCheckbox = {
    styleOverrides: {
      root: {
        paddingTop: base.gap(ZSizeFixed.Small),
        paddingBottom: base.gap(ZSizeFixed.Small)
      }
    }
  };

  // Label
  mui.components.MuiFormLabel = {
    styleOverrides: {
      asterisk: {
        color: mui.palette.error.dark
      }
    }
  };

  // Inputs
  mui.components.MuiInputBase = {
    styleOverrides: {
      root: {
        minHeight: '3.5rem'
      }
    }
  };

  // Toolbar
  mui.components.MuiToolbar = {
    styleOverrides: {
      regular: {
        minHeight: '6em'
      }
    }
  };

  return Object.assign({}, mui, base);
}

export const { makeStyles } = createMakeStyles({ useTheme: useZthunworksTheme });
