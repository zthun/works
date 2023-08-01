import { Mocked, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { get2d } from '../canvas/renderer';
import { IZImageReader } from '../image/image-reader';
import { ZPrintableImage } from './printable-image';

describe('ZPrintableImage', () => {
  let image: HTMLCanvasElement;
  let canvas: HTMLCanvasElement;
  let reader: Mocked<IZImageReader>;

  function createTestTarget() {
    return new ZPrintableImage(reader);
  }

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;

    vi.spyOn(get2d(canvas), 'drawImage');

    image = document.createElement('canvas');
    image.width = 15;
    image.height = 20;

    reader = mock<IZImageReader>();
    reader.read.mockResolvedValue(image);
  });

  describe('Import', () => {
    it('should load the image.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.import(new Blob());
      // Assert
      expect(target.width).toEqual(image.width);
      expect(target.height).toEqual(image.height);
    });

    it('should clear the image on a null import.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.import(null);
      // Assert
      expect(target.width).toEqual(1);
      expect(target.height).toEqual(1);
    });
  });

  describe('Print', () => {
    it('should stamp the image onto the canvas.', async () => {
      // Arrange
      const target = createTestTarget();
      await target.import(new Blob());
      // Act
      target.print(get2d(canvas));
      // Assert
      expect(get2d(canvas).drawImage).toHaveBeenCalledWith(image, 0, 0);
    });
  });
});
