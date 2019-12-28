import { registerDecorator, ValidationDecoratorOptions, ValidationOptions } from 'class-validator';
import { trim } from 'lodash';

export function validateIsNotWhiteSpace(value: any) {
  return typeof value === 'string' && !!trim(value);
}

export function IsNotWhiteSpace(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    const decorator: ValidationDecoratorOptions = {
      name: 'isNotWhiteSpace',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: validateIsNotWhiteSpace
      }
    };
    registerDecorator(decorator);
  };
}
