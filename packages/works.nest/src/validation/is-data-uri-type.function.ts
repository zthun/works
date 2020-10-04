import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'data-uri-type', async: false })
export class IsDataURITypeValidator implements ValidatorConstraintInterface {
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
