import { Color, Theme, useTheme as useMuiTheme } from '@mui/material';
import {
  amber,
  blue,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
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
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedFibonacci,
  createSizeChartVoidCss,
  createSizeChartVoidZero,
  ZSizeFixed,
  ZSizeVoid
} from '@zthun/works.chonky-cat';
import { firstDefined } from '@zthun/works.core';
import {
  IZFashion,
  IZFashionComplements,
  ZFashionBuilder,
  ZFashionComplementsBuilder,
  ZHue,
  ZPaletteBuilder
} from '@zthun/works.fashion';
import { createMakeStyles } from 'tss-react';

export type IZColor = Color;

const GapChart = {
  ...createSizeChartFixedFibonacci(0.5, 1),
  ...createSizeChartVoidZero()
};

const ThicknessChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(0.0625, 0.0625), 'rem'),
  ...createSizeChartVoidCss()
};

const FashionPrimary = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().indigo(400).build())
  .contrast(new ZFashionBuilder().white().build())
  .build();

const FashionSecondary = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().violet(600).build())
  .contrast(new ZFashionBuilder().white().build())
  .build();

const FashionSuccess = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().green(800).build())
  .contrast(new ZFashionBuilder().white().build())
  .build();

const FashionWarning = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().yellow(600).build())
  .contrast(new ZFashionBuilder().black().build())
  .build();

const FashionError = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().red(700).build())
  .contrast(new ZFashionBuilder().white().build())
  .build();

const FashionInfo = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().sky(200).build())
  .contrast(new ZFashionBuilder().white().build())
  .build();

const FashionSimple = new ZFashionComplementsBuilder()
  .main(new ZFashionBuilder().grey(300).build())
  .contrast(new ZFashionBuilder().black().build())
  .build();

const FashionMaterialHue = new ZPaletteBuilder()
  .luminance(ZHue.Red, red)
  .luminance(ZHue.Pink, pink)
  .luminance(ZHue.Purple, purple)
  .luminance(ZHue.Violet, deepPurple)
  .luminance(ZHue.Indigo, indigo)
  .luminance(ZHue.Blue, blue)
  .luminance(ZHue.Sky, lightBlue)
  .luminance(ZHue.Cyan, cyan)
  .luminance(ZHue.Teal, teal)
  .luminance(ZHue.Green, green)
  .luminance(ZHue.Olive, lightGreen)
  .luminance(ZHue.Lime, lime)
  .luminance(ZHue.Yellow, yellow)
  .luminance(ZHue.Amber, amber)
  .luminance(ZHue.Orange, orange)
  .luminance(ZHue.Persimmon, deepOrange)
  .luminance(ZHue.Brown, brown)
  .luminance(ZHue.Grey, grey)
  .build();

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
   * Primary color.
   *
   * @returns
   *        The fashion for the primary color palette.
   */
  primary(): IZFashionComplements;

  /**
   * Secondary color.
   *
   * @returns
   *        The fashion for the secondary color.
   */
  secondary(): IZFashionComplements;

  /**
   * Success color.
   *
   * @returns
   *        The fashion for the success color.
   */
  success(): IZFashionComplements;

  /**
   * Warning color.
   *
   * @returns
   *        The fashion for the warning color.
   */
  warning(): IZFashionComplements;

  /**
   * Error color.
   *
   * @returns
   *        The fashion for the error color.
   */
  error(): IZFashionComplements;

  /**
   * Info color.
   *
   * @returns
   *        The fashion for the info color.
   */
  info(): IZFashionComplements;

  /**
   * Represents a grey color contrast for default fashion.
   *
   * @returns
   *        The basic fashion colors.
   */
  simple(): IZFashionComplements;

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

  const palette = new ZPaletteBuilder()
    .copy(FashionMaterialHue)
    .crayon(ZHue.Black, mui.palette.common.black)
    .crayon(ZHue.White, mui.palette.common.white)
    .build();

  const base = {
    colorify(fashion: IZFashion): string {
      if (fashion.hue === null) {
        return 'rgb(0, 0, 0, 0)';
      }

      return palette[fashion.hue][fashion.shade];
    },

    primary: () => FashionPrimary,
    secondary: () => FashionSecondary,
    success: () => FashionSuccess,
    warning: () => FashionWarning,
    error: () => FashionError,
    info: () => FashionInfo,
    simple: () => FashionSimple,

    gap(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.Medium): string {
      return mui.spacing(GapChart[size]);
    },

    thickness(size: ZSizeFixed | ZSizeVoid = ZSizeFixed.ExtraSmall): string {
      return ThicknessChart[size];
    }
  };

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);
  mui.components = firstDefined({}, mui.components);

  // Palette
  mui.palette.primary.main = base.colorify(base.primary().main);
  mui.palette.primary.contrastText = base.colorify(base.primary().contrast);
  mui.palette.secondary.main = base.colorify(base.secondary().main);
  mui.palette.secondary.contrastText = base.colorify(base.secondary().contrast);
  mui.palette.success.main = base.colorify(base.success().main);
  mui.palette.success.contrastText = base.colorify(base.success().main);
  mui.palette.warning.main = base.colorify(base.warning().main);
  mui.palette.warning.contrastText = base.colorify(base.warning().contrast);
  mui.palette.error.main = base.colorify(base.error().main);
  mui.palette.error.contrastText = base.colorify(base.error().contrast);
  mui.palette.info.main = base.colorify(base.info().main);
  mui.palette.info.contrastText = base.colorify(base.info().contrast);

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
