import { createMakeStyles } from 'tss-react';

/**
 * Constructs the theme variables for zthunworks components.
 *
 * @returns The zthunworks theme.
 */
function useTheme() {
  return {
    colors: {
      monochrome: {
        black: '#000',
        blackVsCode: '#1e1e1e',
        darkGray: '#404040',
        gray: '#808080',
        grayX11: '#bebebe',
        silver: 'c0c0c0',
        lightGray: '#d3d3d3',
        gainsboro: '#dcdcdc',
        whiteSmoke: '#f5f5f5',
        white: '#fff'
      },
      status: {
        primary: '#3f51b5',
        secondary: '#dc004d',
        success: '#4caf50',
        danger: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
      }
    },
    rounding: {
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
        xl: '64rem'
      },
      drawer: {
        md: '15rem'
      },
      image: {
        xs: '3em',
        sm: '5em',
        md: '8em',
        lg: '10em',
        xl: '15em'
      },
      toolbar: {
        md: '64px'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      none: 0
    },
    thickness: {
      xs: '0.0625rem',
      sm: '0.08rem',
      md: '0.1rem',
      lg: '0.12rem',
      xl: '0.15rem',
      none: 0
    }
  };
}

export const { makeStyles } = createMakeStyles({ useTheme });
