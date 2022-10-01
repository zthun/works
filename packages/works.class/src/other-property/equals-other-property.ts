import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { get } from 'lodash';

@ValidatorConstraint({ name: 'equals-other-property', async: false })
/**
 * Represents a constraint that forces a property on an object to equal another property on the same object.
 */
export class EqualsOtherPropertyValidator implements ValidatorConstraintInterface {
  /**
   * Validates that value equals another property defined by args.constraints.
   *
   * This validation is case sensitive if the items being checked are strings and is valid to use
   * for password confirmations.
   *
   * @param value The value to check.
   * @param args The arguments that contains the constraint property name to check against value.
   *
   * @returns True if value equals args.object[args.constraints].  False otherwise.
   */
  public validate(value: any, args: ValidationArguments) {
    const owner = args.object as any;
    const [property] = args.constraints;
    const other = get(owner, property);
    return value === other;
  }
}

/**
 * A constraint that forces a property on an object to equal another property on the same object.
 *
 * @param property The other property to map.
 * @param options The validation options.
 *
 * @returns A reflection decorator function that applies the constraint to a property.
 */
export function EqualsOtherProperty<T = any>(property: keyof T, options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: EqualsOtherPropertyValidator
    });
  };
}
