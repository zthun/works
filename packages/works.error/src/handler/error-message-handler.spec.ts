/* eslint-disable require-jsdoc */
import { IZErrorMessageHandler, ZErrorMessageHandlerComposite } from './error-message-handler';

describe('ZMessageHandler', () => {
  let alerter: jest.Mocked<IZErrorMessageHandler>;
  let logger: jest.Mocked<IZErrorMessageHandler>;

  function createTestTarget() {
    return new ZErrorMessageHandlerComposite([alerter, logger]);
  }

  beforeEach(() => {
    alerter = jest.mocked({
      handle: jest.fn()
    });

    logger = jest.mocked({
      handle: jest.fn()
    });
  });

  it('should forward the messages to the child handlers.', async () => {
    // Arrange
    const target = createTestTarget();
    const error = { message: ['Error One', 'Error Two'] };
    const messages = ['Error One', 'Error Two'];
    // Act
    await target.handle(messages, error);
    // Assert
    expect(alerter.handle).toHaveBeenCalledWith(messages, error);
    expect(logger.handle).toHaveBeenCalledWith(messages, error);
  });
});
