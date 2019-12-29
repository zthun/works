import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { flatten, values } from 'lodash';

/**
 * Factory for throwing BadRequestException objects given validation errors.
 */
export class ZExceptionFactory {
  public static messageOnly(errors: ValidationError[]): BadRequestException {
    const constraints = errors.map((err) => err.constraints);
    const matrix = constraints.map((cons) => values(cons));
    const messages = flatten(matrix);
    const message = messages.length === 1 ? messages[0] : messages;
    return new BadRequestException(message);
  }
}
