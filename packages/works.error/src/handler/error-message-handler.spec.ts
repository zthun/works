/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/works.jest';
import { IZErrorMessageHandler, ZErrorMessageHandlerComposite } from './error-message-handler';

describe('ZMessageHandler', () => {
  let alerter: jest.Mocked<IZErrorMessageHandler>;
  let logger: jest.Mocked<IZErrorMessageHandler>;

  function createTestTarget() {
    return new ZErrorMessageHandlerComposite([alerter, logger]);
  }

  beforeEach(() => {
    alerter = createMocked(['handle']);
    logger = createMocked(['handle']);
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
