import { ZImageReaderStatic } from './image-reader-static.class';

describe('ZImageReaderStatic', () => {
  let image: HTMLCanvasElement;

  function createTestTarget() {
    return new ZImageReaderStatic(image);
  }

  beforeEach(() => {
    image = document.createElement('canvas');
    image.width = 100;
    image.height = 101;
  });

  it('should return a copy of the image.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.read();
    // Assert
    expect(actual.width).toEqual(image.width);
    expect(actual.height).toEqual(image.height);
  });
});
