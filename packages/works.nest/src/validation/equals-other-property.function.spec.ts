import { IZLogin, ZLoginBuilder } from '@zthun/works.core';
import { registerDecorator, ValidationArguments } from 'class-validator';
import { EqualsOtherProperty, EqualsOtherPropertyValidator } from './equals-other-property.function';

jest.mock('class-validator');

describe('EqualsOtherProperty', () => {
  describe('Validator', () => {
    it('registers the decorator.', () => {
      // Arrange
      // Act
      EqualsOtherProperty('property')({}, 'name');
      // Assert
      expect(registerDecorator).toHaveBeenCalledWith(expect.objectContaining({ validator: EqualsOtherPropertyValidator, constraints: ['property'] }));
    });
  });

  describe('Validate', () => {
    let matchedPasswords: IZLogin;
    let mismatchedPasswords: IZLogin;

    beforeEach(() => {
      matchedPasswords = new ZLoginBuilder().password('bad-password').autoConfirm().build();
      mismatchedPasswords = new ZLoginBuilder().password('password').confirm('password-c').build();
    });

    function assertValid<T>(expected: boolean, object: T, value: T[keyof T], property: keyof T, propertyToMatch: keyof T) {
      // Arrange
      const target = new EqualsOtherPropertyValidator();
      const args: ValidationArguments = {
        object,
        constraints: [propertyToMatch],
        targetName: null,
        value,
        property: String(property)
      };
      // Act
      const actual = target.validate(value, args);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('returns false if the value does not match the other property', () => {
      assertValid(false, mismatchedPasswords, mismatchedPasswords.confirm, 'confirm', 'password');
    });

    it('returns true if the value matches the other property.', () => {
      assertValid(true, matchedPasswords, matchedPasswords.confirm, 'confirm', 'password');
    });
  });
});
