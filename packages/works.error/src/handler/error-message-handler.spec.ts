import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IZErrorMessageHandler, ZErrorMessageHandlerComposite } from './error-message-handler';

describe('ZMessageHandler', () => {
  let alerter: Mocked<IZErrorMessageHandler>;
  let logger: Mocked<IZErrorMessageHandler>;

  function createTestTarget() {
    return new ZErrorMessageHandlerComposite([alerter, logger]);
  }

  beforeEach(() => {
    alerter = mock<IZErrorMessageHandler>();
    logger = mock<IZErrorMessageHandler>();
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
