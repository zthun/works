import { Theme, useTheme as useMuiTheme } from '@mui/material';
import { firstDefined } from '@zthun/works.core';
import { createMakeStyles } from 'tss-react';

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
 * Represents options for supported font families.
 */
export interface IZFontFamilies {
  fixed: string;
  document: string;
}

/**
 * Options for border rounding geometry.
 */
export interface IZGeometryOptions {
  /**
   * Square rounding.
   *
   * Basically hard edges.
   */
  square?: number | string;

  /**
   * Circle rounding.
   *
   * Basically 50%.
   */
  circle?: number | string;

  /**
   * Chip rounding.
   *
   * This is usually half of the current font.
   */
  chip?: number | string;
}

/**
 * The overall theme for the Zthunworks domain.
 *
 * This extends material main theme and adds
 * some helpers and size options.
 */
export interface IZTheme extends Theme {
  fonts: IZFontFamilies;
  /**
   * Rounding options.
   */
  rounding: IZGeometryOptions;
  /**
   * Sizing options.
   */
  sizing: {
    alerts: IZSizeOptions;
    avatar: IZSizeOptions;
    card: IZSizeOptions;
    drawer: IZSizeOptions;
    font: IZSizeOptions;
    gaps: IZSizeOptions;
    image: IZSizeOptions;
    icon: IZSizeOptions;
    thickness: IZSizeOptions;
    toolbar: IZSizeOptions;
  };
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
    fonts: {
      /* cspell:disable-next-line */
      fixed: "'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'",
      document: "'Roboto', 'Arial', 'sans-serif'"
    },
    rounding: {
      square: 0,
      circle: '50%',
      chip: '1rem'
    },
    sizing: {
      alerts: {
        md: '20rem'
      },
      avatar: {
        xs: '32px',
        sm: '48px',
        md: '80px',
        lg: '128px',
        xl: '256px'
      },
      card: {
        xs: '18rem',
        sm: '18rem',
        md: '30rem',
        lg: '50rem',
        xl: '64rem',
        max: '100%'
      },
      drawer: {
        md: '15rem'
      },
      font: {
        xs: '0.8rem',
        sm: '0.9rem',
        md: '1rem',
        lg: '1.2rem',
        xl: '1.5rem'
      },
      headers: {
        xs: '1.15rem',
        sm: '1.35rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        max: '3rem'
      },
      gaps: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        none: 0
      },
      image: {
        xs: '3em',
        sm: '5em',
        md: '8em',
        lg: '10em',
        xl: '15em'
      },
      icon: {
        xs: '0.50em',
        sm: '0.75em',
        md: '1em',
        lg: '1.25em',
        xl: '1.5em'
      },
      thickness: {
        xs: '0.0625rem',
        sm: '0.08rem',
        md: '0.1rem',
        lg: '0.12rem',
        xl: '0.15rem',
        none: 0
      },
      toolbar: {
        md: '6.5rem'
      }
    }
  };

  mui.components = firstDefined({}, mui.components);

  // Typography
  mui.typography.fontFamily = base.fonts.document;
  mui.typography.body1.fontFamily = base.fonts.document;

  const createTypography = () => ({
    fontFamily: base.fonts.document
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

  mui.typography.h1 = createHeaderTypography(base.sizing.headers.max);
  mui.typography.h2 = createHeaderTypography(base.sizing.headers.xl);
  mui.typography.h3 = createHeaderTypography(base.sizing.headers.lg);
  mui.typography.h4 = createHeaderTypography(base.sizing.headers.md);
  mui.typography.h5 = createHeaderTypography(base.sizing.headers.sm);
  mui.typography.h6 = createHeaderTypography(base.sizing.headers.xs);

  mui.typography.body1 = createTextTypography(base.sizing.font.md);
  mui.typography.body2 = createTextTypography(base.sizing.font.md);
  mui.typography.subtitle1 = createTextTypography(base.sizing.font.md);
  mui.typography.subtitle2 = createTextTypography(base.sizing.font.md);
  mui.typography.caption = createTextTypography(base.sizing.font.sm);
  mui.typography.overline = createTextTypography(base.sizing.font.sm);

  mui.typography.button = createTextTypography(base.sizing.font.md);

  mui.components.MuiTypography = {
    styleOverrides: {
      gutterBottom: {
        marginBottom: base.sizing.gaps.md
      }
    }
  };

  // Autocomplete
  mui.components.MuiAutocomplete = {
    styleOverrides: {
      clearIndicator: {
        fontSize: base.sizing.font.lg,
        visibility: 'visible'
      }
    }
  };

  // Card
  mui.components.MuiCardHeader = {
    styleOverrides: {
      avatar: {
        fontSize: base.sizing.headers.max
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
        paddingTop: base.sizing.gaps.xs,
        paddingBottom: base.sizing.gaps.xs
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
