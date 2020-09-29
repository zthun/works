import { ZPrintableTransform } from './printable-transform.class';
describe('ZPrintableTransform', () => {
  let canvas: HTMLCanvasElement;

  function createTestTarget() {
    return new ZPrintableTransform();
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    jest.spyOn(canvas.getContext('2d'), 'transform');
  });

  it('should apply the identity transformation on reset.', () => {
    // Arrange
    const target = createTestTarget();
    const context = canvas.getContext('2d');
    // Act
    target.scale(2, 2).skew(4, 5).translate(2, 3).reset().print(context);
    // Assert
    expect(context.transform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  });

  it('should apply the appropriate matrix transformation.', () => {
    // Arrange
    const target = createTestTarget().scale(1, 1).skew(1, 1).translate(1, 1);
    const context = canvas.getContext('2d');
    // Act
    target.print(context);
    // Assert
    expect(context.transform).toHaveBeenCalledWith(1, 1, 1, 1, 1, 1);
  });
});
