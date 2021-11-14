/* eslint-disable require-jsdoc */
import { registerDecorator, ValidationArguments } from 'class-validator';
import { RequiresOtherProperty, RequiresOtherPropertyValidator } from './requires-other-property.function';

jest.mock('class-validator');

describe('RequiresOtherProperty', () => {
  describe('Validator', () => {
    it('registers the decorator.', () => {
      // Arrange
      // Act
      RequiresOtherProperty('property')({}, 'name');
      // Assert
      expect(registerDecorator).toHaveBeenCalledWith(expect.objectContaining({ validator: RequiresOtherPropertyValidator, constraints: ['property'] }));
    });
  });

  describe('Validate', () => {
    let passwordConfirm: { password: string; confirm: string };

    beforeEach(() => {
      passwordConfirm = { password: 'bad-password', confirm: 'bad-password' };
    });

    function assertValid<T extends object>(expected: boolean, object: T, property: keyof T, propertyToCheck: keyof T) {
      // Arrange
      const target = new RequiresOtherPropertyValidator();
      const args: ValidationArguments = {
        object,
        constraints: [propertyToCheck],
        targetName: null,
        value: 'whatever',
        property: String(property)
      };
      // Act
      const actual = target.validate(args.value, args);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('returns false if the other property is missing.', () => {
      delete passwordConfirm.confirm;
      assertValid(false, passwordConfirm, 'password', 'confirm');
    });

    it('returns true if the other property is set.', () => {
      assertValid(true, passwordConfirm, 'password', 'confirm');
    });
  });
});
