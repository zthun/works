/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/works.jest';
import { ZLogEntryBuilder } from '../log/log-entry';
import { IZLogger } from '../log/logger';
import { ZCompositeLogger } from './composite-logger';

describe('ZCompositeLogger', () => {
  let loggerA: jest.Mocked<IZLogger>;
  let loggerB: jest.Mocked<IZLogger>;
  let loggerC: jest.Mocked<IZLogger>;

  function createTestTarget() {
    return new ZCompositeLogger([loggerA, loggerB, loggerC]);
  }

  beforeEach(() => {
    loggerA = createMocked(['log']);
    loggerB = createMocked(['log']);
    loggerC = createMocked(['log']);
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
