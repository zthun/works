import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get2d } from '../canvas/renderer';
import { ZPrintableColor } from './printable-color';

describe('ZPrintableColor', () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  function createTestTarget(color?: string) {
    return new ZPrintableColor(color);
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    context = get2d(canvas);
    vi.spyOn(context, 'fillRect');
  });

  it('should print color to the entire canvas.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(context);
    // Assert
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
  });

  it('should print the correct color.', () => {
    // Arrange
    const target = createTestTarget('#123456');
    // Act
    target.print(context);
    // Assert
    expect(context.fillStyle).toEqual(target.color);
  });
});
