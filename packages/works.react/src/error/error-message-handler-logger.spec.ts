import { IZLogger, ZLogLevel } from '@zthun/works.logger';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZErrorMessageHandlerLogger } from './error-message-handler-logger';

describe('ZErrorMessageHandlerLogger', () => {
  let logger: Mocked<IZLogger>;

  function createTestTarget() {
    return new ZErrorMessageHandlerLogger(logger);
  }

  beforeEach(() => {
    logger = mock();
  });

  it('should log each message individually to the logger as an error.', async () => {
    // Arrange
    const messages = ['one', 'two'];
    const target = createTestTarget();
    // Act
    await target.handle(messages);
    // Assert
    expect(logger.log).toHaveBeenCalledTimes(messages.length);
    expect(logger.log).toHaveBeenCalledWith(expect.objectContaining({ level: ZLogLevel.ERROR, message: messages[0] }));
    expect(logger.log).toHaveBeenCalledWith(expect.objectContaining({ level: ZLogLevel.ERROR, message: messages[1] }));
  });
});
