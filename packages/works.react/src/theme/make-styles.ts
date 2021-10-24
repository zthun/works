import { createMakeStyles } from 'tss-react';
import { Theme, useTheme as useMuiTheme } from '@mui/material';

export interface ZthunworksSizeOptions {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
  max?: number | string;
  none?: number | string;
}

export interface ZthunworksGeometryOptions {
  square?: number | string;
  circle?: number | string;
}

export interface ZthunworksTheme extends Theme {
  rounding: ZthunworksGeometryOptions;
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
