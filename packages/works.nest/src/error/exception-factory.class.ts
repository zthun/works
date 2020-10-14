import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { flatten, values } from 'lodash';

/**
 * Factory for throwing BadRequestException objects given validation errors.
 */
export class ZExceptionFactory {
  /**
   * Constructs a message from a collection of messages.
   *
   * @param messages The messages to format.
   *
   * @returns This method returns the empty string if messages is falsy or empty.  If messages contains
   *          only one item, then messages[0] is returned, otherwise messages is returned.
   */
  public static messageFormat(messages: string[]) {
    if (!messages || messages.length === 0) {
      return '';
    }

    return messages.length > 1 ? messages : messages[0];
  }

  /**
   * A factory method that constructs a bad request exception from a series of validation errors.
   *
   * @param errors The errors to parse.
   *
   * @returns A BadRequestException with the messages from the errors list.
   */
  public static messageOnly(errors: ValidationError[]): BadRequestException {
    const constraints = errors.map((err) => err.constraints);
    const matrix = constraints.map((cons) => values(cons));
    const messages = flatten(matrix);
    const message = ZExceptionFactory.messageFormat(messages);
    return new BadRequestException(message);
  }
}
