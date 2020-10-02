import { ZPrintableGroup } from './printable-group.class';
import { ZPrintableNothing } from './printable-nothing.class';
import { IZPrintable } from './printable.interface';

describe('ZPrintableGroup', () => {
  let canvas: HTMLCanvasElement;
  let top: IZPrintable;
  let middle: IZPrintable;
  let bottom: IZPrintable;
  let printed: IZPrintable[];

  function createTestTarget(layers?: IZPrintable[]) {
    return new ZPrintableGroup(layers);
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    printed = [];
    top = new ZPrintableNothing();
    middle = new ZPrintableNothing();
    bottom = new ZPrintableNothing();

    jest.spyOn(top, 'print').mockImplementation(() => printed.push(top));
    jest.spyOn(middle, 'print').mockImplementation(() => printed.push(middle));
    jest.spyOn(bottom, 'print').mockImplementation(() => printed.push(bottom));
  });

  it('should print no layers if the layers are empty.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(canvas.getContext('2d'));
    // Assert
    expect(true).toBeTruthy();
  });

  it('should print the layers.', () => {
    // Arrange
    const target = createTestTarget([bottom, middle, top]);
    // Act
    target.print(canvas.getContext('2d'));
    // Assert
    expect(printed).toEqual([bottom, middle, top]);
  });
});
