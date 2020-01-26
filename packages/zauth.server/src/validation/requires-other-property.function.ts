import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { get } from 'lodash';

@ValidatorConstraint({ name: 'requires-other-property', async: false })
export class RequiresOtherPropertyValidator implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments) {
    const owner = args.object as any;
    const [property] = args.constraints;
    const other = get(owner, property);
    return other !== undefined;
  }
}

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
