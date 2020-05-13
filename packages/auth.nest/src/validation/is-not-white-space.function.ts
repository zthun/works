import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { trim } from 'lodash';

@ValidatorConstraint({ name: 'white-space', async: false })
export class IsNotWhiteSpaceValidator implements ValidatorConstraintInterface {
  public validate(value: any) {
    return typeof value === 'string' && !!trim(value);
  }
}

export function IsNotWhiteSpace(options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsNotWhiteSpaceValidator
    });
  };
}
