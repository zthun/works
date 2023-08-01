import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get2d } from '../canvas/renderer';
import { IZPrintable } from './printable';
import { ZPrintableGroup } from './printable-group';
import { ZPrintableNothing } from './printable-nothing';

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

    vi.spyOn(top, 'print').mockImplementation(() => printed.push(top));
    vi.spyOn(middle, 'print').mockImplementation(() => printed.push(middle));
    vi.spyOn(bottom, 'print').mockImplementation(() => printed.push(bottom));
  });

  it('should print no layers if the layers are empty.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print(get2d(canvas));
    // Assert
    expect(true).toBeTruthy();
  });

  it('should print the layers.', () => {
    // Arrange
    const target = createTestTarget([bottom, middle, top]);
    // Act
    target.print(get2d(canvas));
    // Assert
    expect(printed).toEqual([bottom, middle, top]);
  });
});
