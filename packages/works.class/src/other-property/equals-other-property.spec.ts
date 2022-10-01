/* eslint-disable require-jsdoc */
import { registerDecorator, ValidationArguments } from 'class-validator';
import { EqualsOtherProperty, EqualsOtherPropertyValidator } from './equals-other-property';

jest.mock('class-validator');

describe('EqualsOtherProperty', () => {
  describe('Validator', () => {
    it('registers the decorator.', () => {
      // Arrange
      // Act
      EqualsOtherProperty('property')({}, 'name');
      // Assert
      expect(registerDecorator).toHaveBeenCalledWith(
        expect.objectContaining({ validator: EqualsOtherPropertyValidator, constraints: ['property'] })
      );
    });
  });

  describe('Validate', () => {
    let matchedPasswords: { password: string; confirm: string };
    let mismatchedPasswords: { password: string; confirm: string };

    beforeEach(() => {
      matchedPasswords = { password: 'bad-password', confirm: 'bad-password' };
      mismatchedPasswords = { password: 'bad-password', confirm: 'bad-password-c' };
    });

    function assertValid<T extends object>(
      expected: boolean,
      object: T,
      value: T[keyof T],
      property: keyof T,
      propertyToMatch: keyof T
    ) {
      // Arrange
      const target = new EqualsOtherPropertyValidator();
      const args: ValidationArguments = {
        object,
        constraints: [propertyToMatch],
        targetName: '',
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
