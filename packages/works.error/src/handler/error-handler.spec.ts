/* eslint-disable require-jsdoc */
import { ZErrorHandler } from './error-handler';
import { IZErrorMessageHandler } from './error-message-handler';

describe('ErrorHandler', () => {
  let msg: jest.Mocked<IZErrorMessageHandler>;

  function createTestTarget() {
    return new ZErrorHandler(msg);
  }

  beforeEach(() => {
    msg = jest.mocked({
      handle: jest.fn()
    });
  });

  async function assertMessageHandlerReceivesMessage(expected: string | string[], err: any) {
    // Arrange
    const messages = Array.isArray(expected) ? expected : [expected];
    const target = createTestTarget();
    // Act
    await target.handle(err);
    // Assert
    expect(msg.handle).toHaveBeenCalledWith(messages, err);
  }

  describe('Primitives', () => {
    describe('String', () => {
      it('should pass the message directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('Message', 'Message');
      });
    });

    describe('Number', () => {
      it('should pass the message directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('42', 42);
      });
    });

    describe('Boolean', () => {
      it('should pass the true string directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('true', true);
      });

      it('should pass the false string directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('false', false);
      });
    });

    describe('Symbol', () => {
      it('should pass the number description directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('100', Symbol(100));
      });

      it('should pass the string description directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('msg', Symbol('msg'));
      });

      it('should return the empty string if the symbol has no description.', async () => {
        await assertMessageHandlerReceivesMessage('', Symbol());
      });
    });

    describe('BigInt', () => {
      it('should pass the number directly to the message handler.', async () => {
        await assertMessageHandlerReceivesMessage('12345678987654321', BigInt('12345678987654321'));
      });
    });
  });

  describe('No Error', () => {
    it('should not invoke the message handler with an undefined error.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.handle(undefined);
      // Assert
      expect(msg.handle).not.toHaveBeenCalled();
    });

    it('should not invoke the message handler with a null error.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.handle(undefined);
      // Assert
      expect(msg.handle).not.toHaveBeenCalled();
    });
  });

  describe('Object', () => {
    describe('Known Shape', () => {
      describe('ZError', () => {
        it('should return the english message if a code and an english property is on the object.', async () => {
          const err = { code: 237, english: 'This is the shape of a ZError found from the works.error package.' };
          await assertMessageHandlerReceivesMessage(err.english, err);
        });

        it('should return the code if the english message is not available.', async () => {
          const err = { code: 237 };
          await assertMessageHandlerReceivesMessage(`${err.code}`, err);
        });
      });

      describe('ZHttpResult', () => {
        it('should return the message information from the data object.', async () => {
          const err = { data: 'This is an error message in the shape of a ZHttpResult found in works.html.' };
          await assertMessageHandlerReceivesMessage(err.data, err);
        });
      });

      describe('Object with message', () => {
        it('should just send the message property.', async () => {
          const err = { message: 'message' };
          await assertMessageHandlerReceivesMessage(err.message, err);
        });
      });
    });

    describe('Composition', () => {
      it('should send and unwrap the lowest level message.', async () => {
        const err = {
          status: 404,
          data: {
            message: {
              code: 404,
              english: 'The underlying error message'
            }
          }
        };
        await assertMessageHandlerReceivesMessage(err.data.message.english, err);
      });
    });

    describe('Unknown Shape', () => {
      it('should send the stringified json to the message handler.', async () => {
        const obj = { one: '1', two: '2', three: { threePointOne: '3.1', threePointTwo: '3.2' } };
        const expected = JSON.stringify(obj, undefined, ZErrorHandler.Spacing);
        await assertMessageHandlerReceivesMessage(expected, obj);
      });

      it('should send the stringified json to the message handler if the final unwrapped message cannot be found.', async () => {
        const err = {
          status: 404,
          data: {
            message: {
              mystery: 'Not a message but will still show up as json.'
            }
          }
        };
        const expected = JSON.stringify(err.data.message, undefined, ZErrorHandler.Spacing);
        await assertMessageHandlerReceivesMessage(expected, err);
      });
    });
  });

  describe('Function', () => {
    it('should return the message from the function return value.', async () => {
      const expected = 'Message';
      const fn = () => expected;
      await assertMessageHandlerReceivesMessage(expected, fn);
    });
  });

  describe('Array', () => {
    it('should unwrap all entries and return each entry as a message.', async () => {
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
      await assertMessageHandlerReceivesMessage(expected, errors);
    });
  });
});
