import { ValidationError } from 'class-validator';
import { ZExceptionFactory } from './exception-factory.class';

describe('ZExceptionFactory', () => {
  let badA: ValidationError;
  let badB: ValidationError;

  beforeEach(() => {
    badA = new ValidationError();
    badA.children = [];
    badA.property = 'foo';
    badA.constraints = {
      equals: 'Bad A'
    };

    badB = new ValidationError();
    badB.children = [];
    badB.property = 'name';
    badB.constraints = {
      'equals': 'Bad C',
      'white-space': 'Bad B'
    };
  });

  describe('Message Format', () => {
    function assertFormat(expected: string | string[], messages: string[]) {
      // Arrange
      // Act
      const actual = ZExceptionFactory.messageFormat(messages);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('returns the empty string for falsy.', () => {
      assertFormat('', null);
    });

    it('returns the empty string for an empty array.', () => {
      assertFormat('', []);
    });

    it('returns the first string if there is only one message.', () => {
      const msg = 'message';
      assertFormat(msg, [msg]);
    });

    it('returns the messages array if there is more than one message.', () => {
      const msgs = ['a', 'b'];
      assertFormat(msgs, msgs);
    });
  });

  describe('Message Only', () => {
    it('formats the constrains as a list of messages.', () => {
      // Arrange
      // Act
      const error = ZExceptionFactory.messageOnly([badA, badB]);
      const actual = error.message.message as string[];
      // Assert
      expect(actual.sort()).toEqual(['Bad A', 'Bad B', 'Bad C']);
    });

    it('returns just a string if there is only one message.', () => {
      // Arrange
      // Act
      const error = ZExceptionFactory.messageOnly([badA]);
      const actual = error.message.message;
      // Assert
      expect(actual).toEqual('Bad A');
    });
  });
});
