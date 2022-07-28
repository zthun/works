import { cssClass } from './css-class';

describe('Css Class', () => {
  it('should return the empty string if everything is falsy.', () => {
    // Arrange
    // Act
    const actual = cssClass(undefined);
    // Assert
    expect(actual).toEqual('');
  });

  it('should return the root class.', () => {
    // Arrange
    const expected = 'ZComponent-root';
    // Act
    const actual = cssClass(expected);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should return the class if a string boolean tuple has a true boolean.', () => {
    // Arrange
    const expected = 'ZYes';
    // Act
    const actual = cssClass([expected, true]);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should join all class names that are truthy', () => {
    // Arrange
    const expected = 'One Two Four Seven';
    // Act
    const actual = cssClass('One', 'Two', undefined, 'Four', null, ['Six', false], ['Seven', true]);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should skip the first item if it is falsy', () => {
    // Arrange
    const expected = 'Second';
    // Act
    const actual = cssClass(null, 'Second');
    // Assert
    expect(actual).toEqual(expected);
  });
});
