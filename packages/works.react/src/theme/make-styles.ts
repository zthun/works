import { Palette, Theme, useTheme as useMuiTheme } from '@mui/material';
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
 * An extension of the standard palette with additional colors.
 */
export interface IZExtendedPalette extends Palette {
  doc: {
    enumeration: string;
    accessor: string;
    class: string;
    interface: string;
    alias: string;
    constructor: string;
    property: string;
    function: string;
    variable: string;
    namespace: string;
    subEntity: string;

    flags: {
      general: string;
      abstract: string;
      static: string;
      readonly: string;
      const: string;
      protected: string;
      private: string;
      rest: string;
    };
  };
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
   * Palette options.
   */
  palette: IZExtendedPalette & Palette;
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
      fixed: "'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'"
    },
    rounding: {
      square: 0,
      circle: '50%',
      chip: '1em'
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
        md: '4em'
      }
    }
  };

  const palette: IZExtendedPalette = Object.assign({}, mui.palette, {
    doc: {
      enumeration: '#937210',
      accessor: '#f5a429',
      class: '#0672de',
      interface: '#647f1b',
      alias: '#9600ff',
      constructor: '#14a219',
      property: '#cc1e1e',
      function: '#5a5a5a',
      variable: '#6200a9',
      namespace: '#9600ff',
      subEntity: '#e9ebec',

      flags: {
        general: mui.palette.grey[500],
        abstract: mui.palette.error.main,
        static: mui.palette.info.main,
        readonly: '#7a00d1',
        const: mui.palette.success.main,
        protected: mui.palette.warning.main,
        private: mui.palette.common.black,
        rest: mui.palette.primary.main
      }
    }
  });

  // Fonts
  const family = ['Roboto', 'Arial', 'sans-serif'].join(',');
  mui.typography.fontFamily = family;
  mui.typography.body1.fontFamily = family;
  mui.typography.h1.fontFamily = family;
  mui.typography.h2.fontFamily = family;
  mui.typography.h3.fontFamily = family;

  mui.typography.h1.fontSize = base.sizing.font.xl;
  mui.typography.h2.fontSize = base.sizing.font.lg;
  mui.typography.h3.fontSize = base.sizing.font.md;

  mui.components = firstDefined({}, mui.components);

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

  return Object.assign({}, mui, base, { palette });
}

export const { makeStyles } = createMakeStyles({ useTheme: useZthunworksTheme });
