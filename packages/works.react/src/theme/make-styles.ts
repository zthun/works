import { createMakeStyles } from 'tss-react';
import { Theme, useTheme as useMuiTheme } from '@mui/material';

/**
 * Represents the options for sizes for components.
 */
export interface ZthunworksSizeOptions {
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
 * Options for border rounding geometry.
 */
export interface ZthunworksGeometryOptions {
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
}

/**
 * The overall theme for the Zthunworks domain.
 *
 * This extends material UI's main theme and adds
 * some helpers and size options.
 */
export interface ZthunworksTheme extends Theme {
  /**
   * Rounding options.
   */
  rounding: ZthunworksGeometryOptions;
  /**
   * Sizing options.
   */
  sizing: {
    alerts: ZthunworksSizeOptions;
    avatar: ZthunworksSizeOptions;
    card: ZthunworksSizeOptions;
    drawer: ZthunworksSizeOptions;
    font: ZthunworksSizeOptions;
    gaps: ZthunworksSizeOptions;
    image: ZthunworksSizeOptions;
    thickness: ZthunworksSizeOptions;
    toolbar: ZthunworksSizeOptions;
  };
}

/**
 * Constructs the theme variables for zthunworks components.
 *
 * See https://www.npmjs.com/package/tss-react for more information.
 *
 * @returns The zthunworks theme.
 */
export function useZthunworksTheme(): ZthunworksTheme {
  const mui = useMuiTheme();

  const base = {
    rounding: {
      square: 0,
      circle: '50%'
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
        xs: '0.625em',
        sm: '0.8em',
        md: '1em',
        lg: '1.2em',
        xl: '1.5em'
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
      thickness: {
        xs: '0.0625rem',
        sm: '0.08rem',
        md: '0.1rem',
        lg: '0.12rem',
        xl: '0.15rem',
        none: 0
      },
      toolbar: {
        md: '64px'
      }
    }
  };

  return Object.assign({}, mui, base);
}

export const { makeStyles } = createMakeStyles({ useTheme: useZthunworksTheme });
