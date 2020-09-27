import { ZPrintableColor } from './printable-color.class';

describe('ZPrintableColor', () => {
  let canvas: HTMLCanvasElement;

  function createTestTarget(color?: string) {
    return new ZPrintableColor(color);
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    jest.spyOn(canvas.getContext('2d'), 'fillRect');
  });

  it('should print color to the entire canvas.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(canvas.getContext('2d'));
    // Assert
    expect(canvas.getContext('2d').fillRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
  });

  it('should print the correct color.', () => {
    // Arrange
    const target = createTestTarget('#123456');
    const context = canvas.getContext('2d');
    // Act
    target.print(context);
    // Assert
    expect(context.fillStyle).toEqual(target.color);
  });
});
