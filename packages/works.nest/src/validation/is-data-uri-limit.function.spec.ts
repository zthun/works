import { registerDecorator, ValidationArguments } from 'class-validator';
import { IsDataURILimit, IsDataURILimitValidator } from './is-data-uri-limit.function';

jest.mock('class-validator');

describe('IsDataURILimit', () => {
  describe('Validator', () => {
    it('registers the decorator.', () => {
      // Arrange
      // Act
      IsDataURILimit(0, 1000)({}, 'name');
      // Assert
      expect(registerDecorator).toHaveBeenCalledWith(expect.objectContaining({ validator: IsDataURILimitValidator }));
    });
  });

  describe('Validate', () => {
    let text: string;
    let uri: string;

    function assertValid(expected: boolean, min: number, max: number, value: any) {
      // Arrange
      const target = new IsDataURILimitValidator();
      const args: ValidationArguments = {
        constraints: [min, max],
        value,
        object: null,
        targetName: 'whatever',
        property: 'whatever'
      };
      // Act
      const actual = target.validate(value, args);
      // Assert
      expect(actual).toEqual(expected);
    }

    beforeEach(() => {
      text = 'data-for-uri';
      uri = `data:text/plain;charset=us-ascii,${text}`;
    });

    it('returns false if value is not a string.', () => {
      assertValid(false, -Infinity, Infinity, 4);
    });

    it('returns false if value is not a data uri.', () => {
      assertValid(false, -Infinity, Infinity, 'Not a data uri.');
    });

    it('returns false if the data section does not meet the minimum length.', () => {
      assertValid(false, text.length + 1, Infinity, uri);
    });

    it('returns false if the data section is too big.', () => {
      assertValid(false, -Infinity, text.length - 1, uri);
    });

    it('returns true if the value data length is between the minimum and maximum length.', () => {
      assertValid(true, text.length - 1, text.length + 1, uri);
    });

    it('returns true the value is exactly the right length.', () => {
      assertValid(true, text.length, text.length, uri);
    });
  });
});
