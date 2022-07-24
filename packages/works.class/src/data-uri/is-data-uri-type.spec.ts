/* eslint-disable require-jsdoc */
import { registerDecorator, ValidationArguments } from 'class-validator';
import { IsDataURIType, IsDataURITypeValidator } from './is-data-uri-type';

jest.mock('class-validator');

describe('IsDataURIType', () => {
  describe('Validator', () => {
    it('registers the decorator.', () => {
      // Arrange
      // Act
      IsDataURIType([])({}, 'name');
      // Assert
      expect(registerDecorator).toHaveBeenCalledWith(expect.objectContaining({ validator: IsDataURITypeValidator }));
    });
  });

  describe('Validate', () => {
    function assertValid(expected: boolean, types: string[], value: any) {
      // Arrange
      const target = new IsDataURITypeValidator();
      const args: ValidationArguments = {
        constraints: types,
        value,
        object: {},
        targetName: 'whatever',
        property: 'whatever'
      };
      // Act
      const actual = target.validate(value, args);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('returns false if value is not a string.', () => {
      assertValid(false, ['image/jpeg'], 4);
    });

    it('returns false if value is not a data uri.', () => {
      assertValid(false, ['image/png'], 'Not a data uri.');
    });

    it('returns false if the value mime type is not in the list of supported types.', () => {
      assertValid(false, ['text/plain'], 'data:text/html,text-for-uri');
    });

    it('returns true if the value mime type is in the list of supported types.', () => {
      assertValid(true, ['text/html'], 'data:text/html;charset=UTF8,text-for-uri');
    });

    it('returns true if the value mime type is falsy, and the list of supported types contains the default type.', () => {
      assertValid(true, ['text/plain'], 'data:,text-for-uri');
    });
  });
});
