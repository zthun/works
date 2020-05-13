import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { flatten, values } from 'lodash';

/**
 * Factory for throwing BadRequestException objects given validation errors.
 */
export class ZExceptionFactory {
  public static messageFormat(messages: string[]) {
    if (!messages || messages.length === 0) {
      return '';
    }

    return messages.length > 1 ? messages : messages[0];
  }

  public static messageOnly(errors: ValidationError[]): BadRequestException {
    const constraints = errors.map((err) => err.constraints);
    const matrix = constraints.map((cons) => values(cons));
    const messages = flatten(matrix);
    const message = ZExceptionFactory.messageFormat(messages);
    return new BadRequestException(message);
  }
}
