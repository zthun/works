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
