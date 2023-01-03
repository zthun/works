/* eslint-disable require-jsdoc */

import { createMocked } from '@zthun/spellcraft-jest';
import { IZLogger, ZLogLevel } from '@zthun/works.logger';
import { ZErrorMessageHandlerLogger } from './error-message-handler-logger';

describe('ZErrorMessageHandlerLogger', () => {
  let logger: jest.Mocked<IZLogger>;

  function createTestTarget() {
    return new ZErrorMessageHandlerLogger(logger);
  }

  beforeEach(() => {
    logger = createMocked(['log']);
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
