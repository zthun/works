/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/works.jest';
import { ZErrorHandler } from './error-handler';
import { IZMessageHandler } from './message-handler';

describe('ErrorHandler', () => {
  let msg: IZMessageHandler;

  function createTestTarget() {
    return new ZErrorHandler(msg);
  }

  beforeEach(() => {
    msg = createMocked<IZMessageHandler>(['handle']);
  });

  function assertMessageHandlerReceivesMessage(expected: string | string[], err: any) {
    // Arrange
    const messages = Array.isArray(expected) ? expected : [expected];
    const target = createTestTarget();
    // Act
    target.handle(err);
    // Assert
    expect(msg.handle).toHaveBeenCalledWith(messages, err);
  }

  describe('Primitives', () => {
    describe('String', () => {
      it('should pass the message directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('Message', 'Message');
      });
    });

    describe('Number', () => {
      it('should pass the message directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('42', 42);
      });
    });

    describe('Boolean', () => {
      it('should pass the true string directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('true', true);
      });

      it('should pass the false string directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('false', false);
      });
    });

    describe('Symbol', () => {
      it('should pass the number description directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('100', Symbol(100));
      });

      it('should pass the string description directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('msg', Symbol('msg'));
      });
    });

    describe('BigInt', () => {
      it('should pass the number directly to the message handler.', () => {
        assertMessageHandlerReceivesMessage('12345678987654321', BigInt('12345678987654321'));
      });
    });
  });

  describe('No Error', () => {
    it('should not invoke the message handler with an undefined error.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.handle(undefined);
      // Assert
      expect(msg.handle).not.toHaveBeenCalled();
    });

    it('should not invoke the message handler with a null error.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      target.handle(undefined);
      // Assert
      expect(msg.handle).not.toHaveBeenCalled();
    });
  });

  describe('Object', () => {
    describe('Known Shape', () => {
      describe('ZError', () => {
        it('should return the english message if a code and an english property is on the object.', () => {
          const err = { code: 237, english: 'This is the shape of a ZError found from the works.error package.' };
          assertMessageHandlerReceivesMessage(err.english, err);
        });

        it('should return the code if the english message is not available.', () => {
          const err = { code: 237 };
          assertMessageHandlerReceivesMessage(`${err.code}`, err);
        });
      });

      describe('ZHttpResult', () => {
        it('should return the message information from the data object.', () => {
          const err = { data: 'This is an error message in the shape of a ZHttpResult found in works.html.' };
          assertMessageHandlerReceivesMessage(err.data, err);
        });
      });

      describe('Object with message', () => {
        it('should just send the message property.', () => {
          const err = { message: 'message' };
          assertMessageHandlerReceivesMessage(err.message, err);
        });
      });
    });

    describe('Composition', () => {
      it('should send and unwrap the lowest level message.', () => {
        const err = {
          status: 404,
          data: {
            message: {
              code: 404,
              english: 'The underlying error message'
            }
          }
        };
        assertMessageHandlerReceivesMessage(err.data.message.english, err);
      });
    });

    describe('Unknown Shape', () => {
      it('should send the stringified json to the message handler.', () => {
        const obj = { one: '1', two: '2', three: { threePointOne: '3.1', threePointTwo: '3.2' } };
        const expected = JSON.stringify(obj, undefined, ZErrorHandler.Spacing);
        assertMessageHandlerReceivesMessage(expected, obj);
      });

      it('should send the stringified json to the message handler if the final unwrapped message cannot be found.', () => {
        const err = {
          status: 404,
          data: {
            message: {
              mystery: 'Not a message but will still show up as json.'
            }
          }
        };
        const expected = JSON.stringify(err.data.message, undefined, ZErrorHandler.Spacing);
        assertMessageHandlerReceivesMessage(expected, err);
      });
    });
  });

  describe('Function', () => {
    it('should return the message from the function return value.', () => {
      const expected = 'Message';
      const fn = () => expected;
      assertMessageHandlerReceivesMessage(expected, fn);
    });
  });

  describe('Array', () => {
    it('should unwrap all entries and return each entry as a message.', () => {
      const errors = [
        'Something happened',
        42,
        {
          message: 'Message object'
        },
        {
          data: {
            code: 404,
            english: 'Not found'
          }
        },
        ['Inner Array', 'Of Messages']
      ];
      const expected = ['Something happened', '42', 'Message object', 'Not found', 'Inner Array', 'Of Messages'];
      assertMessageHandlerReceivesMessage(expected, errors);
    });
  });
});
