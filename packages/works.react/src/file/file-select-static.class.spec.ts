import { ZFileSelectStatic } from './file-select-static.class';

describe('ZFileSelectStatic', () => {
  let file: File;

  function createTestTarget() {
    return new ZFileSelectStatic(file);
  }

  beforeEach(() => {
    file = new File([], 'test.png');
  });

  it('returns the static file.', () => {
    // Arrange
    const target = createTestTarget();
    const expected = jest.fn();
    // Act
    target.open('image/*', expected);
    // Assert
    expect(expected).toHaveBeenCalledWith(file);
  });
});
