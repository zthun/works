import { Color, Theme, useTheme as useMuiTheme } from '@mui/material';
import {
  amber,
  blue,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
} from '@mui/material/colors';
import { createSpacing } from '@mui/system';
import {
  createSizeChartFixedCss,
  createSizeChartFixedFibonacci,
  createSizeChartFixedLinear,
  createSizeChartVoidCss,
  createSizeChartVoidZero,
  firstDefined,
  ZSizeFixed,
  ZSizeVoid
} from '@zthun/works.core';
import { values } from 'lodash';
import { createMakeStyles } from 'tss-react';
import { ZColorTint, ZHueColor, ZSeverityColor, ZShadeColor, ZStateColor } from './state-color';

export type IZColor = Color;

const Severity = values<string>(ZSeverityColor);
const Hues = values<string>(ZHueColor);

const TintLight = ZColorTint.T100;
const TintMain = ZColorTint.T500;
const TintDark = ZColorTint.T900;

const GapChart = {
  ...createSizeChartFixedFibonacci(0.5, 1),
  ...createSizeChartVoidZero()
};

const ThicknessChart = {
  ...createSizeChartFixedCss(createSizeChartFixedLinear(0.0625, 0), 'rem'),
  ...createSizeChartVoidCss()
};

/**
 * Options for a color wheel.
 */
const HueMap: Record<ZHueColor, IZColor> = {
  [ZHueColor.Red]: red,
  [ZHueColor.Pink]: pink,
  [ZHueColor.Purple]: purple,
  [ZHueColor.Violet]: deepPurple,
  [ZHueColor.Indigo]: indigo,
  [ZHueColor.Blue]: blue,
  [ZHueColor.Sky]: lightBlue,
  [ZHueColor.Cyan]: cyan,
  [ZHueColor.Teal]: teal,
  [ZHueColor.Green]: green,
  [ZHueColor.Olive]: lightGreen,
  [ZHueColor.Lime]: lime,
  [ZHueColor.Yellow]: yellow,
  [ZHueColor.Amber]: amber,
  [ZHueColor.Orange]: orange,
  [ZHueColor.Persimmon]: deepOrange,
  [ZHueColor.Brown]: brown
};

/**
 * The overall theme for the Zthunworks domain.
 *
 * This extends material main theme and adds
 * some helpers and size options.
 */
export interface IZTheme extends Theme {
  /**
   * Converts from a color and tint to a hex color.
   *
   * @param color
   *        The color to convert.
   * @param tint
   *        The color tint.
   *
   * @returns
   *        A CSS compatible color option.
   */
  hexify(color: IZColor, tint: ZColorTint): string;

  /**
   * Converts from a color and tint to a hex color.
   *
   * @param color
   *        The color to convert.
   * @param tint
   *        The color tint.  The default is main.
   *
   * @returns
   *        A CSS compatible color option.
   */
  colorify(color: ZStateColor, tint?: ZColorTint): string;

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

  const base = {
    hexify(color: IZColor, tint: ZColorTint): string {
      if (color[tint]) {
        // Severity colors will allow Main, Light, and Dark.
        return color[tint];
      }

      const _tintWithoutSeverity =
        tint === ZColorTint.Main
          ? TintMain
          : tint === ZColorTint.Light
          ? TintLight
          : tint === ZColorTint.Dark
          ? TintDark
          : tint;

      if (color[_tintWithoutSeverity]) {
        return color[_tintWithoutSeverity];
      }

      // We have a severity but we've requested something like T600 or A200.
      // For this, we will use the range of 50-300 = light, 400-500 = main,
      // and 600-900 = dark.

      const _tint = +tint;
      if (!isNaN(_tint)) {
        if (_tint < 400) {
          return color[ZColorTint.Light];
        }

        if (_tint < 600) {
          return color[ZColorTint.Main];
        }

        return color[ZColorTint.Dark];
      }

      if (tint === ZColorTint.A100) {
        return color[ZColorTint.Light];
      }

      if (tint === ZColorTint.A700) {
        return color[ZColorTint.Dark];
      }

      return color[ZColorTint.Main];
    },

    colorify(color: ZStateColor, tint?: ZColorTint): string {
      if (color === ZShadeColor.Black) {
        return mui.palette.common.black;
      }

      if (color === ZShadeColor.White) {
        return mui.palette.common.white;
      }

      if (color === ZShadeColor.Grey) {
        return this.hexify(mui.palette.grey, tint);
      }

      if (Hues.indexOf(color) >= 0) {
        return this.hexify(HueMap[color], tint);
      }

      if (Severity.indexOf(color) >= 0) {
        return this.hexify(mui.palette[color], tint);
      }

      return String(color);
    },

    gap(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.Medium): string {
      return mui.spacing(GapChart[size]);
    },

    thickness(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.ExtraSmall): string {
      return ThicknessChart[size];
    }
  };

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);
  mui.components = firstDefined({}, mui.components);

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
