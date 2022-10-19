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
import { firstDefined } from '@zthun/works.core';
import { createMakeStyles } from 'tss-react';
import { ZHueColor } from './state-color';
import { ZStateSize } from './state-size';

/**
 * Represents the options for sizes for components.
 */
export interface IZSizeOptions {
  /**
   * Smallest possible size.
   */
  xs?: number | string;
  /**
   * Small T-Shirt.
   */
  sm?: number | string;
  /**
   * Medium T-Shirt.
   *
   * This should be the default in most cases.
   */
  md?: number | string;
  /**
   * Large T-Shirt.
   */
  lg?: number | string;
  /**
   * Extra large T-Shirt.
   */
  xl?: number | string;
  /**
   * Maximum size.
   *
   * This will usually be 100%.
   */
  max?: number | string;
  /**
   * Empty.
   *
   * Mostly a helper as this will usually be 0.
   */
  none?: number | string;
}

/**
 * Options for a color wheel.
 */
export type IZColor = Color;

/**
 * The overall theme for the Zthunworks domain.
 *
 * This extends material main theme and adds
 * some helpers and size options.
 */
export interface IZTheme extends Theme {
  /**
   * Sizing options.
   */
  sizing: {
    card: IZSizeOptions;
    image: IZSizeOptions;
  };
  /**
   * Color table
   */
  hues: Record<ZHueColor, IZColor>;

  /**
   * Converts a ZStateSize enum to a spacing value.
   *
   * This is the same as calling sizing() with a direct
   * conversion table of size to spacing multiplier:
   *
   * auto/none: 0
   * xs: 0.5
   * sm: 1,
   * md: 2,
   * lg: 3,
   * xl: 4,
   * max: 6
   *
   * @param size
   *        The size to space out.
   *
   * @returns
   *        A CSS Compatible size option.
   */
  gap(size: ZStateSize): string;

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
  thickness(size: ZStateSize): string;
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
    sizing: {
      card: {
        xs: '18rem',
        sm: '18rem',
        md: '30rem',
        lg: '50rem',
        xl: '64rem',
        max: '100%'
      },
      image: {
        xs: '3em',
        sm: '5em',
        md: '8em',
        lg: '10em',
        xl: '15em'
      }
    },
    hues: {
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
    },

    gap: (size: ZStateSize): string => {
      const chart: Record<ZStateSize, number> = {
        [ZStateSize.None]: 0,
        [ZStateSize.Auto]: 0,
        [ZStateSize.ExtraSmall]: 0.5,
        [ZStateSize.Small]: 1,
        [ZStateSize.Medium]: 2,
        [ZStateSize.Large]: 3,
        [ZStateSize.ExtraLarge]: 4,
        [ZStateSize.Max]: 6
      };

      return mui.spacing(chart[size]);
    },

    thickness: (size: ZStateSize): string => {
      const chart: Record<ZStateSize, string> = {
        [ZStateSize.None]: '0',
        [ZStateSize.Auto]: '0',
        [ZStateSize.ExtraSmall]: '0.0625rem',
        [ZStateSize.Small]: '0.08rem',
        [ZStateSize.Medium]: '0.1rem',
        [ZStateSize.Large]: '0.12rem',
        [ZStateSize.ExtraLarge]: '0.15rem',
        [ZStateSize.Max]: '0.2rem'
      };

      return chart[size];
    }
  };

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

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);

  mui.components.MuiTypography = {
    styleOverrides: {
      gutterBottom: {
        marginBottom: mui.spacing(2)
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
        paddingTop: mui.spacing(),
        paddingBottom: mui.spacing()
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
