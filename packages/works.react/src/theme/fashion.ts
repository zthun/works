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
import { IZFashionCoordination, ZFashionDesignBuilder, ZHue, ZPaletteBuilder } from '@zthun/works.fashion';
import { createContext, useContext } from 'react';

const _ZthunworksPalette = new ZPaletteBuilder()
  .gradient(ZHue.Red, red)
  .gradient(ZHue.Pink, pink)
  .gradient(ZHue.Purple, purple)
  .gradient(ZHue.Violet, deepPurple)
  .gradient(ZHue.Indigo, indigo)
  .gradient(ZHue.Blue, blue)
  .gradient(ZHue.Sky, lightBlue)
  .gradient(ZHue.Cyan, cyan)
  .gradient(ZHue.Teal, teal)
  .gradient(ZHue.Green, green)
  .gradient(ZHue.Olive, lightGreen)
  .gradient(ZHue.Lime, lime)
  .gradient(ZHue.Yellow, yellow)
  .gradient(ZHue.Amber, amber)
  .gradient(ZHue.Orange, orange)
  .gradient(ZHue.Persimmon, deepOrange)
  .gradient(ZHue.Brown, brown)
  .gradient(ZHue.Grey, grey)
  .build();

const _ZthunworksDesign = new ZFashionDesignBuilder().palette(_ZthunworksPalette).build();

/**
 * The context for setting the fashion design for the entire site theme.
 */
export const ZthunworksFashionContext = createContext(_ZthunworksDesign);

/**
 * Exports the fashion theme for zthunworks applications.
 *
 * @returns
 *        The theme for zthunworks applications.
 */
export function useZthunworksFashionDesign() {
  return useContext(ZthunworksFashionContext);
}

/**
 * Returns all of the supported fashion coordinations
 *
 * @returns
 *        A list of all fashion coordinations.
 */
export function useZthunworksFashionDesigns(): IZFashionCoordination[] {
  const fashion = useZthunworksFashionDesign();
  return [
    fashion.light,
    fashion.dark,
    fashion.primary,
    fashion.secondary,
    fashion.success,
    fashion.warning,
    fashion.error,
    fashion.info
  ];
}
