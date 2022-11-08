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
import {
  IZFashionCoordination,
  IZPalette,
  ZFashionBuilder,
  ZFashionCoordinationBuilder,
  ZHue,
  ZPaletteBuilder
} from '@zthun/works.fashion';
import { createContext, useContext } from 'react';

export interface IZthunworksFashion {
  palette: IZPalette;
  primary: IZFashionCoordination;
  secondary: IZFashionCoordination;
  success: IZFashionCoordination;
  warning: IZFashionCoordination;
  error: IZFashionCoordination;
  info: IZFashionCoordination;
  light: IZFashionCoordination;
  dark: IZFashionCoordination;
}

const _ZthunworksFashion: Readonly<IZthunworksFashion> = Object.freeze({
  palette: new ZPaletteBuilder()
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
    .build(),
  primary: new ZFashionCoordinationBuilder()
    .name('Primary')
    .main(new ZFashionBuilder().indigo(400).build())
    .light(new ZFashionBuilder().indigo(200).build())
    .dark(new ZFashionBuilder().indigo(600).build())
    .contrast(new ZFashionBuilder().white().build())
    .build(),
  secondary: new ZFashionCoordinationBuilder()
    .name('Secondary')
    .main(new ZFashionBuilder().violet(600).build())
    .light(new ZFashionBuilder().violet(400).build())
    .dark(new ZFashionBuilder().violet(800).build())
    .contrast(new ZFashionBuilder().white().build())
    .build(),
  success: new ZFashionCoordinationBuilder()
    .name('Success')
    .main(new ZFashionBuilder().green(800).build())
    .light(new ZFashionBuilder().green(600).build())
    .dark(new ZFashionBuilder().green(900).build())
    .contrast(new ZFashionBuilder().white().build())
    .build(),
  warning: new ZFashionCoordinationBuilder()
    .name('Warning')
    .main(new ZFashionBuilder().amber(400).build())
    .light(new ZFashionBuilder().amber(300).build())
    .dark(new ZFashionBuilder().amber(500).build())
    .contrast(new ZFashionBuilder().black().build())
    .build(),
  error: new ZFashionCoordinationBuilder()
    .name('Error')
    .main(new ZFashionBuilder().red(700).build())
    .light(new ZFashionBuilder().red(500).build())
    .dark(new ZFashionBuilder().red(900).build())
    .contrast(new ZFashionBuilder().white().build())
    .build(),
  info: new ZFashionCoordinationBuilder()
    .name('Info')
    .main(new ZFashionBuilder().sky(400).build())
    .light(new ZFashionBuilder().sky(200).build())
    .dark(new ZFashionBuilder().sky(600).build())
    .contrast(new ZFashionBuilder().black().build())
    .build(),
  light: new ZFashionCoordinationBuilder()
    .name('Light')
    .main(new ZFashionBuilder().grey(200).build())
    .light(new ZFashionBuilder().grey(100).build())
    .dark(new ZFashionBuilder().grey(300).build())
    .contrast(new ZFashionBuilder().black().build())
    .build(),
  dark: new ZFashionCoordinationBuilder()
    .name('Dark')
    .main(new ZFashionBuilder().grey(700).build())
    .light(new ZFashionBuilder().grey(600).build())
    .dark(new ZFashionBuilder().grey(800).build())
    .contrast(new ZFashionBuilder().white().build())
    .build()
});

export const ZthunworksFashionContext = createContext(_ZthunworksFashion);

/**
 * Exports the fashion theme for zthunworks applications.
 *
 * @returns
 *        The theme for zthunworks applications.
 */
export function useZthunworksFashion() {
  return useContext(ZthunworksFashionContext);
}

/**
 * Returns all of the supported fashion coordinations
 *
 * @returns
 *        A list of all fashion coordinations.
 */
export function useZthunworksFashionCoordinations(): IZFashionCoordination[] {
  const fashion = useZthunworksFashion();
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
