import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { get } from 'lodash';

@ValidatorConstraint({ name: 'requires-other-property', async: false })
/**
 * Represents a constraint that requires another property to be set as well.
 */
export class RequiresOtherPropertyValidator implements ValidatorConstraintInterface {
  /**
   * Validates that another property is set in addition to the current value.
   *
   * @param _ Ignored.
   * @param args The validation args that contains the property constraint to check.
   *
   * @returns True of args.object[args.constraints[0]] is defined.  False otherwise.
   */
  public validate(_: any, args: ValidationArguments) {
    const owner = args.object as any;
    const [property] = args.constraints;
    const other = get(owner, property);
    return other !== undefined;
  }
}

/**
 * A constraint that requires another property to be set in addition to the one this constraint belongs to.
 *
 * @param property The property to check.
 * @param options The validation options.
 *
 * @returns A decorator that applies the constraint.
 */
export function RequiresOtherProperty<T = any>(property: keyof T, options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: RequiresOtherPropertyValidator
    });
  };
}
