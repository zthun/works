/* eslint-disable require-jsdoc */
import { get2d } from '../canvas/renderer';
import { IZPrintable } from './printable';
import { ZPrintableDrawing } from './printable-drawing';
import { ZPrintableGroup } from './printable-group';
import { ZPrintableNothing } from './printable-nothing';

describe('ZPrintableDrawing', () => {
  let canvas: HTMLCanvasElement;
  let background: IZPrintable;
  let top: IZPrintable;
  let middle: IZPrintable;
  let bottom: IZPrintable;
  let foreground: IZPrintable;
  let printed: IZPrintable[];

  function createTestTarget() {
    const target = new ZPrintableDrawing();
    target.background = background;
    target.midground = new ZPrintableGroup([bottom, middle, top]);
    target.foreground = foreground;
    return target;
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    printed = [];
    background = new ZPrintableNothing();
    top = new ZPrintableNothing();
    middle = new ZPrintableNothing();
    bottom = new ZPrintableNothing();
    foreground = new ZPrintableNothing();

    jest.spyOn(background, 'print').mockImplementation(() => printed.push(background));
    jest.spyOn(top, 'print').mockImplementation(() => printed.push(top));
    jest.spyOn(middle, 'print').mockImplementation(() => printed.push(middle));
    jest.spyOn(bottom, 'print').mockImplementation(() => printed.push(bottom));
    jest.spyOn(foreground, 'print').mockImplementation(() => printed.push(foreground));
  });

  it('should draw the scene in the correct order.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(get2d(canvas));
    // Assert
    expect(printed).toEqual([background, bottom, middle, top, foreground]);
  });
});
