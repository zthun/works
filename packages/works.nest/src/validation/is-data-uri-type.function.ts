import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'data-uri-type', async: false })
/**
 * Represents a constraint that a string property is a data uri with a given mime type.
 */
export class IsDataURITypeValidator implements ValidatorConstraintInterface {
  /**
   * Validates the value is a data uri string with a given mime type.
   *
   * @param value The value to check.
   * @param args The arguments that contain the mime type constraints.
   *
   * @returns True if the mime type detected in value exists within arguments.constraints.  False otherwise.
   */
  public validate(value: any, args: ValidationArguments) {
    const supported = args.constraints as string[];

    if (typeof value !== 'string' || !value.startsWith('data:')) {
      // Wrong type
      return false;
    }

    const [header] = value.split(',');
    const [type] = header.replace('data:', '').replace(';base64', '').split(';');
    const mime = type || 'text/plain';
    return supported.indexOf(mime.trim()) >= 0;
  }
}

/**
 * A constraint that validates that a data uri string has a given mime type.
 *
 * @param mimeTypes The supported mime types.
 * @param options The validator options.
 *
 * @returns A decorator function that applies the constraint.
 */
export function IsDataURIType(mimeTypes: string[], options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: mimeTypes,
      options,
      validator: IsDataURITypeValidator
    });
  };
}
