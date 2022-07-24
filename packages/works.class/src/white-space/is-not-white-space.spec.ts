/* eslint-disable require-jsdoc */
import { registerDecorator } from 'class-validator';
import { IsNotWhiteSpace, IsNotWhiteSpaceValidator } from './is-not-white-space';

jest.mock('class-validator');

describe('IsNotWhiteSpace', () => {
  describe('Validator', () => {
    it('registers the decorator.', () => {
      // Arrange
      // Act
      IsNotWhiteSpace()({}, 'name');
      // Assert
      expect(registerDecorator).toHaveBeenCalledWith(expect.objectContaining({ validator: IsNotWhiteSpaceValidator }));
    });
  });

  describe('Validate', () => {
    function assertValid(expected: boolean, value: any) {
      // Arrange
      const target = new IsNotWhiteSpaceValidator();
      // Act
      const actual = target.validate(value);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('returns false if the value is not a string.', () => {
      assertValid(false, 4);
    });

    it('returns false if the value is white space.', () => {
      assertValid(false, '  \r\n');
    });

    it('returns false if the value is null.', () => {
      assertValid(false, null);
    });

    it('returns false if the value is undefined.', () => {
      assertValid(false, undefined);
    });

    it('returns true if the value is a valid string with non white space characters.', () => {
      assertValid(true, 'This should be valid.');
    });
  });
});
