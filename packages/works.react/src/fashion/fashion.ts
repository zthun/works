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
import { ZFashionDesignBuilder, ZHue, ZPaletteBuilder } from '@zthun/works.fashion';
import { createContext, useContext } from 'react';

const _ZPalette = new ZPaletteBuilder()
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

const _ZDesign = new ZFashionDesignBuilder().palette(_ZPalette).build();

/**
 * The context for setting the fashion design for the entire site theme.
 */
export const ZFashionDesignContext = createContext(_ZDesign);

/**
 * Exports the fashion theme for zthunworks applications.
 *
 * @returns
 *        The theme for zthunworks applications.
 */
export function useFashionDesign() {
  return useContext(ZFashionDesignContext);
}
