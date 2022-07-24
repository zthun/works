/* eslint-disable require-jsdoc */
import { get2d } from '../canvas/renderer';
import { IZPrintable } from '../printable/printable';
import { ZPrintableNothing } from '../printable/printable-nothing';
import { ZPrintableTransform } from '../printable/printable-transform';
import { IZTransformTranslate } from '../transform/transform-translate';
import { ZToolingPan } from './tooling-pan';

describe('ZToolingPan', () => {
  let canvas: HTMLCanvasElement;
  let transform: IZTransformTranslate;
  let drawing: IZPrintable;
  let _target: ZToolingPan;

  function createTestTarget() {
    _target = new ZToolingPan();
    _target.init(canvas, get2d(canvas), drawing, transform);
    return _target;
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    transform = new ZPrintableTransform();
    drawing = new ZPrintableNothing();

    jest.spyOn(drawing, 'print');
  });

  afterEach(() => {
    _target.destroy();
  });

  it('should move along the (x, y) axis when dragging.', () => {
    // Arrange
    createTestTarget();
    // Act
    canvas.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    const coords = [transform.translateX, transform.translateY];
    // Assert
    expect(coords).toEqual([50, -50]);
  });

  it('should move along the (x, y) axis while respecting the previous movements.', () => {
    // Arrange
    transform.translate(200, 400);
    createTestTarget();
    // Act
    canvas.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    const coords = [transform.translateX, transform.translateY];
    // Assert
    expect(coords).toEqual([250, 350]);
  });

  it('should refresh the drawing while moving.', () => {
    // Arrange
    createTestTarget();
    // Act
    canvas.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 101, screenY: 51 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    // Assert
    expect(drawing.print).toHaveBeenCalledTimes(2);
  });

  it('should not move if the user never mouses down.', () => {
    // Arrange
    createTestTarget();
    const expected = [transform.translateX, transform.translateY];
    // Act
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 101, screenY: 51 }));
    const actual = [transform.translateX, transform.translateY];
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should no longer activate once the tool is destroyed.', () => {
    // Arrange
    const expected = [transform.translateX, transform.translateY];
    const target = createTestTarget();
    // Act
    target.destroy();
    canvas.dispatchEvent(new MouseEvent('mousedown', { screenX: 50, screenY: 100 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 100, screenY: 50 }));
    document.dispatchEvent(new MouseEvent('mouseup'));
    canvas.dispatchEvent(new MouseEvent('mousemove', { screenX: 105, screenY: 57 }));
    const actual = [transform.translateX, transform.translateY];
    // Assert
    expect(actual).toEqual(expected);
  });
});
