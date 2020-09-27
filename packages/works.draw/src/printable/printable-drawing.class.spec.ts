import { ZPrintableDrawing } from './printable-drawing.class';
import { ZPrintableNothing } from './printable-nothing.class';
import { IZPrintable } from './printable.interface';

describe('ZPrintableDrawing', () => {
  let canvas: HTMLCanvasElement;
  let backstage: IZPrintable;
  let background: IZPrintable;
  let top: IZPrintable;
  let middle: IZPrintable;
  let bottom: IZPrintable;
  let foreground: IZPrintable;
  let printed: IZPrintable[];

  function createTestTarget() {
    const target = new ZPrintableDrawing();
    target.background = background;
    target.backstage = backstage;
    target.layers = [top, middle, bottom];
    target.foreground = foreground;
    return target;
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    printed = [];
    backstage = new ZPrintableNothing();
    background = new ZPrintableNothing();
    top = new ZPrintableNothing();
    middle = new ZPrintableNothing();
    bottom = new ZPrintableNothing();
    foreground = new ZPrintableNothing();

    jest.spyOn(backstage, 'print').mockImplementation(() => printed.push(backstage));
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
    target.print(canvas.getContext('2d'));
    // Assert
    expect(printed).toEqual([backstage, background, bottom, middle, top, foreground]);
  });
});
