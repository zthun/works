import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZLogEntryBuilder } from '../log/log-entry';
import { IZLogger } from '../log/logger';
import { ZLoggerComposite } from './logger-composite';

describe('ZLoggerComposite', () => {
  let loggerA: Mocked<IZLogger>;
  let loggerB: Mocked<IZLogger>;
  let loggerC: Mocked<IZLogger>;

  function createTestTarget() {
    return new ZLoggerComposite([loggerA, loggerB, loggerC]);
  }

  beforeEach(() => {
    loggerA = mock<IZLogger>();
    loggerB = mock<IZLogger>();
    loggerC = mock<IZLogger>();
  });

  it('should log to every child logger.', () => {
    // Arrange
    const target = createTestTarget();
    const expected = new ZLogEntryBuilder().message('log-it').warning().build();
    // Act
    target.log(expected);
    // Asset
    expect(loggerA.log).toHaveBeenCalledWith(expected);
    expect(loggerB.log).toHaveBeenCalledWith(expected);
    expect(loggerC.log).toHaveBeenCalledWith(expected);
  });
});
