import { setFirstOrDefault } from './set-first-or-default';

describe('SetFirstOrDefault', () => {
  let setValue: jest.Mock;

  beforeEach(() => {
    setValue = jest.fn();
  });

  it('should set the first value from an array.', () => {
    // Arrange
    const expected = 1;
    // Act
    setFirstOrDefault(setValue, 0, [expected, 2, 3, 4]);
    // Assert
    expect(setValue).toHaveBeenCalledWith(expected);
  });

  it('should set the fallback value for an empty array.', () => {
    // Arrange
    const expected = 0;
    // Act
    setFirstOrDefault(setValue, 0, []);
    // Assert
    expect(setValue).toHaveBeenCalledWith(expected);
  });

  it('should set the fallback value for a null array.', () => {
    // Arrange
    const expected = 0;
    // Act
    setFirstOrDefault(setValue, 0, null);
    // Assert
    expect(setValue).toHaveBeenCalledWith(expected);
  });

  it('should set the fallback value for an undefined array.', () => {
    // Arrange
    const expected = 0;
    // Act
    setFirstOrDefault(setValue, 0, undefined);
    // Assert
    expect(setValue).toHaveBeenCalledWith(expected);
  });
});
