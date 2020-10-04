import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

/**
 * Represents a validator for forcing the limit of the data section of a data uri to be between a certain length.
 */
@ValidatorConstraint({ name: 'data-uri-limit', async: false })
export class IsDataURILimitValidator implements ValidatorConstraintInterface {
  /**
   * Validates that the value is a data uri and that the data section is between the minimum and maximum length.
   *
   * @param value The value to check.
   * @param args The constraints.
   *
   * @returns True if value is a string data url and the data section of the url is between args.constraints[0] and
   * args.constraints[1] inclusive.
   */
  public validate(value: any, args: ValidationArguments) {
    const [min, max] = args.constraints as number[];

    if (typeof value !== 'string' || !value.startsWith('data:')) {
      // Wrong type
      return false;
    }

    const [, data] = value.split(',');
    return data.length >= min && data.length <= max;
  }
}

/**
 * A constraint that forces a data url data section to be between a minimum and maximum length inclusive.
 *
 * @param min The minimum length.  This will be 0 most of the time.
 * @param max The maximum length.  Use Infinity if you want no max.
 * @param options The validator options.
 *
 * @returns A reflection decorator function that applies the constraint to a property.
 */
export function IsDataURILimit(min: number, max: number, options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [min, max],
      options,
      validator: IsDataURILimitValidator
    });
  };
}
